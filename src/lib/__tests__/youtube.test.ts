import { describe, it, expect } from "vitest";
import { parseYouTubeInput } from "../youtube";

describe("parseYouTubeInput helper", () => {
  it("returns null for empty or whitespace-only input", () => {
    expect(parseYouTubeInput("")).toBeNull();
    expect(parseYouTubeInput("   ")).toBeNull();
  });

  it("handles standard 11-char bare video ID", () => {
    const id = "Ljbgj3GFMlA";
    const result = parseYouTubeInput(id);
    expect(result).toEqual({
      videoId: id,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    });
  });

  it("parses standard watch URL (youtube.com/watch?v=...)", () => {
    const url = "https://www.youtube.com/watch?v=NsSiv6OOc6A";
    const result = parseYouTubeInput(url);
    expect(result?.videoId).toBe("NsSiv6OOc6A");
    expect(result?.embedUrl).toBe("https://www.youtube.com/embed/NsSiv6OOc6A");
  });

  it("parses shortened youtu.be URL", () => {
    const url = "https://youtu.be/cRAsOrxNc08?si=trackingParam";
    const result = parseYouTubeInput(url);
    expect(result?.videoId).toBe("cRAsOrxNc08");
    expect(result?.embedUrl).toBe("https://www.youtube.com/embed/cRAsOrxNc08");
  });

  it("parses YouTube Shorts URL", () => {
    const url = "https://www.youtube.com/shorts/8PMmjj9_ocI";
    const result = parseYouTubeInput(url);
    expect(result?.videoId).toBe("8PMmjj9_ocI");
    expect(result?.embedUrl).toBe("https://www.youtube.com/embed/8PMmjj9_ocI");
  });

  it("parses YouTube Embed URL", () => {
    const url = "https://www.youtube.com/embed/ou00nS5Qhcs";
    const result = parseYouTubeInput(url);
    expect(result?.videoId).toBe("ou00nS5Qhcs");
    expect(result?.embedUrl).toBe("https://www.youtube.com/embed/ou00nS5Qhcs");
  });

  it("returns null for invalid or non-YouTube URL", () => {
    expect(parseYouTubeInput("https://vimeo.com/123456789")).toBeNull();
    expect(parseYouTubeInput("invalid-format-string")).toBeNull();
  });
});

