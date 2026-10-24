import { describe, it, expect, beforeEach } from "vitest";
import {
  createSessionToken,
  verifySessionToken,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
} from "../adminSession";

describe("adminSession JWT authentication", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret-key-32-characters-long-minimum!";
  });

  it("exports correct cookie name and max age", () => {
    expect(ADMIN_SESSION_COOKIE).toBe("admin_session");
    expect(ADMIN_SESSION_MAX_AGE).toBe(28800); // 8 hours in seconds
  });

  it("creates and verifies a valid session token", async () => {
    const username = "royal-editor";
    const token = await createSessionToken(username);

    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3); // Standard JWT format: header.payload.signature

    const payload = await verifySessionToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.username).toBe(username);
  });

  it("fails verification for tampered token", async () => {
    const token = await createSessionToken("admin");
    const tampered = token.slice(0, -6) + "abcdef";

    const result = await verifySessionToken(tampered);
    expect(result).toBeNull();
  });

  it("fails verification for completely invalid string", async () => {
    const result = await verifySessionToken("not-a-valid-jwt-token");
    expect(result).toBeNull();
  });
});

