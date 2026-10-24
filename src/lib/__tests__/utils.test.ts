import { describe, it, expect } from "vitest";
import { cn, formatDate } from "../utils";

describe("utils utility functions", () => {
  it("cn merges class names properly with tailwind override resolution", () => {
    const result = cn("p-4 text-red-500", "p-8", { "bg-black": true, "hidden": false });
    expect(result).toContain("p-8");
    expect(result).not.toContain("p-4"); // Overridden by p-8
    expect(result).toContain("bg-black");
    expect(result).not.toContain("hidden");
  });

  it("formatDate converts string to uppercase format", () => {
    expect(formatDate("october 2026")).toBe("OCTOBER 2026");
  });
});

