// ============================================================================
// Prime Success — k6 Performance & Load Test Suite
// ============================================================================
//
// Usage:
//   k6 run -e PROFILE=smoke loadtest/k6-loadtest.js
//   k6 run -e PROFILE=full -e BASE_URL=http://localhost:3000 loadtest/k6-loadtest.js
//   k6 run -e PROFILE=stress loadtest/k6-loadtest.js
//
// Or via helper script:
//   ./loadtest/run.sh smoke
//   ./loadtest/run.sh full
//   ./loadtest/run.sh stress
// ============================================================================

import http from "k6/http";
import { check, group, sleep } from "k6";

const BASE = __ENV.BASE_URL || "http://localhost:3000";

// ----------------------------------------------------------------------------
// Execution Scenarios
// ----------------------------------------------------------------------------
const SCENARIOS = {
  // Smoke: 5 users for 30s — fast sanity check to verify endpoints are responding
  smoke: {
    executor: "constant-vus",
    vus: 5,
    duration: "30s",
  },

  // Full: Step-by-step ramp up to 100 concurrent users mimicking real visitor spikes
  full: {
    executor: "ramping-vus",
    startVUs: 0,
    stages: [
      { duration: "30s", target: 10 },
      { duration: "1m",  target: 25 },
      { duration: "2m",  target: 50 },
      { duration: "2m",  target: 100 },
      { duration: "1m",  target: 50 },
      { duration: "30s", target: 0 },
    ],
  },

  // Stress: Push past 200 concurrent users to test server breaking point & resource limits
  stress: {
    executor: "ramping-vus",
    startVUs: 0,
    stages: [
      { duration: "30s", target: 50 },
      { duration: "1m",  target: 100 },
      { duration: "2m",  target: 200 },
      { duration: "1m",  target: 250 },
      { duration: "30s", target: 0 },
    ],
  },

  // Soak: Steady 25 users over 10m to detect memory leaks & resource exhaustion
  soak: {
    executor: "constant-vus",
    vus: 25,
    duration: "10m",
  },
};

const PROFILE = __ENV.PROFILE || "smoke";
if (!SCENARIOS[PROFILE]) {
  throw new Error(`Unknown PROFILE "${PROFILE}". Valid options: smoke, full, stress, soak`);
}

// ----------------------------------------------------------------------------
// Metric Thresholds
// ----------------------------------------------------------------------------
export const options = {
  scenarios: {
    prime_success_load: SCENARIOS[PROFILE],
  },
  thresholds: {
    // Under 1% failures allowed
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: false }],
    // 95% of all requests must complete within 800ms
    http_req_duration: [{ threshold: "p(95)<800", abortOnFail: false }],
    // 99% of requests within 1.5s
    "http_req_duration{expected_response:true}": ["p(99)<1500"],
    // Specific critical endpoints
    "http_req_duration{name:home}": ["p(95)<600"],
    "http_req_duration{name:api_news}": ["p(95)<400"],
    "http_req_duration{name:api_interviews}": ["p(95)<400"],
    "http_req_duration{name:magazine}": ["p(95)<600"],
  },
};

const HEADERS_JSON = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// ----------------------------------------------------------------------------
// Test Iteration
// ----------------------------------------------------------------------------
export default function defaultLoadScenario() {
  const roll = Math.random();

  // 1. 40% Traffic: Homepage & News Ticker
  if (roll < 0.4) {
    group("Homepage Flow", () => {
      const res = http.get(`${BASE}/`, { tags: { name: "home" } });
      check(res, {
        "home status 200": (r) => r.status === 200,
        "home body contains Prime": (r) => r.body && r.body.includes("Prime"),
      });

      const newsRes = http.get(`${BASE}/api/news`, {
        ...HEADERS_JSON,
        tags: { name: "api_news" },
      });
      check(newsRes, {
        "news api status 200": (r) => r.status === 200,
      });
    });
  }
  // 2. 25% Traffic: Magazine & Editorial Articles
  else if (roll < 0.65) {
    group("Magazine Flow", () => {
      const magRes = http.get(`${BASE}/magazine`, { tags: { name: "magazine" } });
      check(magRes, {
        "magazine page 200": (r) => r.status === 200,
      });

      const articleRes = http.get(`${BASE}/magazine/the-architects-of-tomorrow`, {
        tags: { name: "article_detail" },
      });
      check(articleRes, {
        "article page 200": (r) => r.status === 200,
      });
    });
  }
  // 3. 15% Traffic: Public Surveys & Sentiment Voting Hub
  else if (roll < 0.8) {
    group("Surveys Hub", () => {
      const surveyRes = http.get(`${BASE}/surveys`, { tags: { name: "surveys" } });
      check(surveyRes, {
        "surveys page 200": (r) => r.status === 200,
      });
    });
  }
  // 4. 10% Traffic: Video Interviews Feed
  else if (roll < 0.9) {
    group("Interviews Hub", () => {
      const interviewsRes = http.get(`${BASE}/interviews`, {
        tags: { name: "interviews" },
      });
      check(interviewsRes, {
        "interviews page 200": (r) => r.status === 200,
      });

      const apiIntRes = http.get(`${BASE}/api/interviews`, {
        ...HEADERS_JSON,
        tags: { name: "api_interviews" },
      });
      check(apiIntRes, {
        "api interviews status 200": (r) => r.status === 200,
      });
    });
  }
  // 5. 10% Traffic: Winners Hall of Honour & Auth Check
  else {
    group("Honours & Auth Flow", () => {
      const winnersRes = http.get(`${BASE}/winners`, { tags: { name: "winners" } });
      check(winnersRes, {
        "winners page 200": (r) => r.status === 200,
      });

      // Admin login security check (should return 401 for dummy credentials)
      const loginPayload = JSON.stringify({
        username: "security-auditor-probe",
        password: "invalid-test-password",
      });
      const loginRes = http.post(`${BASE}/api/admin/login`, loginPayload, {
        ...HEADERS_JSON,
        tags: { name: "admin_login_probe" },
      });
      check(loginRes, {
        "auth rejects invalid login": (r) => r.status === 401 || r.status === 400,
      });
    });
  }

  // Realistic human thinking time between page clicks (1–2 seconds)
  sleep(1 + Math.random());
}
