# Prime Success — k6 Load Testing Guide

Automated load and performance testing suite using [k6](https://k6.io/).

---

## 1. Quick Start

### Step 1: Install k6
- **macOS (Homebrew)**:
  ```bash
  brew install k6
  ```
- **Debian / Ubuntu / VPS**:
  ```bash
  sudo gpg -k
  sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
  echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
  sudo apt-get update && sudo apt-get install k6
  ```
- **Via Docker (Zero installation)**:
  ```bash
  docker run --rm -i --net="host" -v "$(pwd)/loadtest:/loadtest" grafana/k6 run -e BASE_URL=http://localhost:3000 /loadtest/k6-loadtest.js
  ```

---

## 2. Running Load Tests

Start your application first:
```bash
npm run build && npm run start   # or: docker compose up -d
```

Then run any profile:

| Profile | Command | Users | Duration | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **smoke** | `./loadtest/run.sh smoke` | 5 VUs | 30 seconds | Quick sanity check to verify endpoints are responding |
| **full** | `./loadtest/run.sh full` | 0 → 100 VUs | ~7 minutes | Production ramp-up simulation for realistic user spikes |
| **stress** | `./loadtest/run.sh stress` | 0 → 250 VUs | ~5 minutes | Push server to its maximum limits to find breaking points |
| **soak** | `./loadtest/run.sh soak` | 25 steady VUs | 10 minutes | Check for memory leaks and resource degradation |

### Testing against a remote VPS:
```bash
BASE_URL="http://your-vps-ip:8087" ./loadtest/run.sh smoke
```

---

## 3. Real-World Traffic Distribution
The script simulates realistic multi-user navigation:
- **40% Traffic**: Homepage (`/`) and dynamic News ticker (`/api/news`)
- **25% Traffic**: Digital Magazine (`/magazine`) and Editorial Articles
- **15% Traffic**: Public Surveys and live voting hub (`/surveys`)
- **10% Traffic**: Video Interviews feed (`/interviews` & `/api/interviews`)
- **10% Traffic**: Hall of Honour winners (`/winners`) and security probe (`/api/admin/login`)

---

## 4. Key Performance Thresholds
The test automatically validates strict SLA targets:
- **Error Rate (`http_req_failed`)**: Must be `< 1%`.
- **Latency (p95)**: 95% of all requests must respond in `< 800ms`.
- **API Latency (p95)**: News and Interviews APIs must respond in `< 400ms`.
- **Homepage Latency (p95)**: `< 600ms`.

All test results are automatically logged and timestamped inside `loadtest/results/`.

