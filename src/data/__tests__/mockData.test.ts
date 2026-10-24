import { describe, it, expect } from "vitest";
import {
  winnersData,
  articlesData,
  awardsData,
  interviewsData,
  surveysData,
  magazinesData,
} from "../mockData";

describe("core mock data structure and integrity", () => {
  it("winners data has valid non-empty items with required fields", () => {
    expect(winnersData.length).toBeGreaterThan(0);
    winnersData.forEach((winner) => {
      expect(winner.id).toBeTruthy();
      expect(winner.name).toBeTruthy();
      expect(winner.slug).toBeTruthy();
      expect(winner.award).toBeTruthy();
    });
  });

  it("articles data has valid slugs and non-empty content", () => {
    expect(articlesData.length).toBeGreaterThan(0);
    articlesData.forEach((article) => {
      expect(article.id).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.slug).toBeTruthy();
      expect(article.content).toBeTruthy();
    });
  });

  it("awards categories contain icon and title metadata", () => {
    expect(awardsData.length).toBeGreaterThan(0);
    awardsData.forEach((award) => {
      expect(award.id).toBeTruthy();
      expect(award.name).toBeTruthy();
      expect(award.criteria).toBeInstanceOf(Array);
    });
  });

  it("interviews data contains guest details and valid video URLs", () => {
    expect(interviewsData.length).toBeGreaterThan(0);
    interviewsData.forEach((interview) => {
      expect(interview.id).toBeTruthy();
      expect(interview.title).toBeTruthy();
      expect(interview.guestName).toBeTruthy();
      expect(interview.videoUrl).toBeTruthy();
    });
  });

  it("surveys data contains options and total vote counts", () => {
    expect(surveysData.length).toBeGreaterThan(0);
    surveysData.forEach((poll) => {
      expect(poll.id).toBeTruthy();
      expect(poll.title).toBeTruthy();
      expect(poll.options.length).toBeGreaterThanOrEqual(2);
      expect(typeof poll.totalVotes).toBe("number");
    });
  });

  it("magazines data contains issues with cover image and monthYear", () => {
    expect(magazinesData.length).toBeGreaterThan(0);
    magazinesData.forEach((mag) => {
      expect(mag.id).toBeTruthy();
      expect(mag.title).toBeTruthy();
      expect(mag.monthYear).toBeTruthy();
      expect(mag.coverImage).toBeTruthy();
    });
  });
});
