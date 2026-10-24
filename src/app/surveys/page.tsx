"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GoldDivider from "@/components/ui/GoldDivider";
import { surveysData } from "@/data/mockData";
import { SurveyPoll } from "@/types";
import { CheckCircle2, Crown, Radio, Lock, CheckCircle } from "lucide-react";

type PollStatus = "upcoming" | "live" | "closed";

function getStatus(poll: SurveyPoll): PollStatus {
  return poll.status ?? "live";
}

// Deterministic (not random) so the same poll always shows the same countdown, avoiding hydration mismatches
function getOpensInDays(pollId: string): number {
  const hash = pollId.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return 3 + (hash % 8); // 3–10 days
}

const SECTIONS: { status: PollStatus; label: string; icon: typeof Radio; hint: string }[] = [
  { status: "upcoming", label: "Upcoming Polls", icon: Lock, hint: "Opens soon — voting not live yet" },
  { status: "live", label: "Live Polls", icon: Radio, hint: "Open now — cast your vote" },
  { status: "closed", label: "Closed Polls", icon: CheckCircle, hint: "Polling ended — results published" },
];

export default function SurveysPage() {
  const [polls, setPolls] = useState<SurveyPoll[]>(surveysData);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [votedPolls, setVotedPolls] = useState<Record<string, boolean>>({});

  const totalCategories = new Set(polls.map((poll) => poll.category)).size;
  const liveCount = polls.filter((p) => getStatus(p) === "live").length;

  const handleOptionSelect = (pollId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [pollId]: optionId }));
  };

  const handleVote = (pollId: string) => {
    const chosenOptionId = selectedOptions[pollId];
    if (!chosenOptionId || votedPolls[pollId]) return;

    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          totalVotes: poll.totalVotes + 1,
          options: poll.options.map((opt) =>
            opt.id === chosenOptionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      })
    );

    setVotedPolls((prev) => ({ ...prev, [pollId]: true }));
  };

  return (
    <div className="pt-32 pb-20 bg-luxury-black text-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Eyebrow & Hero Title */}
        <SectionHeading
          number="PRIME SUCCESS · SURVEYS"
          eyebrow="YOUR VOICE · PUBLIC OPINION & POLLS"
          title="PRIME SUCCESS COUNTS YOUR VOICE"
          subtitle="Every poll below is open to any reader, tallied live and published on the record. Pick a category and make your ballot count."
        />

        {/* Live Stats Counter Banner */}
        <div className="my-12 p-8 bg-luxury-card border border-royal-gold/30 flex flex-wrap items-center justify-around gap-8 text-center shadow-xl">
          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-md">
              {liveCount}
            </span>
            <span className="text-xs font-sans text-cream/80 uppercase font-semibold tracking-wider mt-1">
              Live Polls
            </span>
          </div>

          <div className="h-10 w-[1px] bg-royal-gold/20 hidden sm:block" />

          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-md">
              {totalCategories}
            </span>
            <span className="text-xs font-sans text-cream/80 uppercase font-semibold tracking-wider mt-1">
              Categories
            </span>
          </div>

          <div className="h-10 w-[1px] bg-royal-gold/20 hidden sm:block" />

          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient drop-shadow-md">
              50K+
            </span>
            <span className="text-xs font-sans text-cream/80 uppercase font-semibold tracking-wider mt-1">
              Monthly Voters
            </span>
          </div>
        </div>

        {/* Poll Sections: Upcoming / Live / Closed */}
        {SECTIONS.map(({ status, label, icon: Icon, hint }) => {
          const sectionPolls = polls.filter((poll) => getStatus(poll) === status);
          if (sectionPolls.length === 0) return null;

          return (
            <div key={status} className="my-16">
              <div className="flex items-center justify-between gap-3 border-b border-royal-gold/25 pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-royal-gold" />
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-ivory tracking-wide">
                    {label}
                  </h2>
                  <span className="px-2.5 py-1 bg-royal-gold/15 border border-royal-gold/40 text-royal-gold text-[10px] font-sans font-bold uppercase tracking-widest rounded-full">
                    {sectionPolls.length}
                  </span>
                </div>
                <span className="text-[11px] font-sans text-cream/60 hidden sm:block">{hint}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionPolls.map((poll) => {
                  const hasVoted = votedPolls[poll.id];
                  const selectedOptId = selectedOptions[poll.id];
                  const isClosed = status === "closed";
                  const isUpcoming = status === "upcoming";
                  const showPercentages = isClosed;

                  return (
                    <div
                      key={poll.id}
                      className={`bg-luxury-card border border-royal-gold/30 flex flex-col justify-between shadow-xl hover:border-royal-gold/60 transition-all duration-300 relative group ${
                        isUpcoming ? "p-4" : "p-5 h-full"
                      }`}
                    >
                      {/* Top-Right Status Stamp */}
                      <div
                        className={`absolute rounded-full border flex items-center justify-center font-sans font-bold tracking-widest uppercase pointer-events-none ${
                          isUpcoming ? "top-3 right-3 w-8 h-8 text-[7px]" : "top-4 right-4 w-9 h-9 text-[8px]"
                        } ${
                          status === "live"
                            ? "border-dashed border-royal-gold/60 text-royal-gold"
                            : status === "closed"
                            ? "border-royal-gold/70 text-royal-gold bg-royal-gold/10"
                            : "border-dashed border-cream/40 text-cream/60"
                        }`}
                      >
                        {status === "live" ? "LIVE" : status === "closed" ? "CLOSED" : "SOON"}
                      </div>

                      <div className={isUpcoming ? "flex flex-col gap-2" : "flex flex-col gap-3"}>
                        {/* Category Tag */}
                        <div className={`flex items-center justify-between border-b border-royal-gold/20 ${isUpcoming ? "pb-2 pr-10" : "pb-2 pr-11"}`}>
                          <span className="px-3 py-1 bg-royal-red text-[#F9F5EC] text-[10px] tracking-[0.25em] font-sans font-bold uppercase border border-royal-gold/30">
                            {poll.category}
                          </span>
                        </div>

                        {/* Question Title */}
                        <h3 className={`font-serif font-bold text-ivory text-center leading-snug ${isUpcoming ? "text-sm my-0" : "text-base my-1"}`}>
                          {poll.title}
                        </h3>

                        {isUpcoming && (
                          <span className="text-center text-[10px] font-sans text-cream/60 uppercase tracking-widest">
                            Opens in {getOpensInDays(poll.id)} days
                          </span>
                        )}

                        {/* Options List (upcoming polls show the heading only) */}
                        {!isUpcoming && (
                        <div className="flex flex-col gap-2 my-1">
                          {poll.options.map((option) => {
                            const isSelected = selectedOptId === option.id;
                            const percentage =
                              poll.totalVotes > 0
                                ? Math.round((option.votes / poll.totalVotes) * 100)
                                : 0;
                            const canSelect = status === "live" && !hasVoted;

                            return (
                              <div
                                key={option.id}
                                onClick={() => canSelect && handleOptionSelect(poll.id, option.id)}
                                className={`p-2.5 border transition-all duration-300 flex flex-col gap-1 relative overflow-hidden ${
                                  !canSelect
                                    ? "border-royal-gold/20 bg-luxury-dark/40 cursor-default"
                                    : isSelected
                                    ? "border-royal-gold bg-royal-gold/15 cursor-pointer shadow-md"
                                    : "border-royal-gold/20 bg-luxury-dark/40 hover:border-royal-gold/50 cursor-pointer"
                                }`}
                              >
                                <div className="relative z-10 flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2.5">
                                    {/* Radio Circle */}
                                    <div
                                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                                        isSelected
                                          ? "border-royal-gold bg-royal-gold text-luxury-black"
                                          : "border-royal-gold/50 bg-luxury-black"
                                      }`}
                                    >
                                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-luxury-black" />}
                                    </div>

                                    {/* Option Label + Percentage & Votes (closed polls, always shown) */}
                                    <span className="font-sans text-xs text-ivory font-medium">
                                      {option.label}{" "}
                                      {showPercentages && (
                                        <span className="font-semibold text-royal-gold ml-1" suppressHydrationWarning>
                                          ({percentage}%, {option.votes.toLocaleString('en-US')} Votes)
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {/* Progress Bar (closed polls, always shown) */}
                                {showPercentages && (
                                  <div className="w-full bg-luxury-dark h-1 rounded-full overflow-hidden">
                                    <div
                                      className="bg-royal-gold h-full rounded-full transition-all duration-700"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        )}

                        {/* Total Voters Count */}
                        {showPercentages && (
                          <div className="text-center font-sans text-xs text-cream/80 font-medium my-1">
                            Total Voters:{" "}
                            <span className="font-serif font-bold text-royal-gold" suppressHydrationWarning>
                              {poll.totalVotes.toLocaleString('en-US')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions: live polls only — closed polls show their final results statically above, no button needed */}
                      {status === "live" && (
                      <div className="mt-4 pt-3 border-t border-royal-gold/20 flex flex-col items-center gap-2">
                        {hasVoted ? (
                          <div className="w-full py-2.5 bg-royal-gold/15 border border-royal-gold text-center text-royal-gold text-xs font-bold font-sans tracking-widest uppercase flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-royal-gold" />
                            <span>VOTE RECORDED · THANK YOU</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleVote(poll.id)}
                            disabled={!selectedOptId}
                            className={`w-full py-2.5 text-xs tracking-[0.2em] font-sans font-bold uppercase transition-all duration-300 shadow-md ${
                              selectedOptId
                                ? "bg-royal-gold text-luxury-black hover:bg-royal-gold-light border border-royal-gold cursor-pointer"
                                : "bg-luxury-dark text-cream/40 border border-royal-gold/20 cursor-not-allowed"
                            }`}
                          >
                            VOTE
                          </button>
                        )}
                      </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <GoldDivider variant="crest" className="my-20" />

        {/* Suggest a Survey Topic Banner */}
        <div className="p-12 bg-royal-red-dark border border-royal-gold/30 text-center flex flex-col items-center gap-4 relative overflow-hidden shadow-2xl my-16 text-[#F9F5EC]">
          <Crown className="w-10 h-10 text-royal-gold" />
          <h3 className="font-serif text-3xl font-bold text-[#F9F5EC]">
            SUGGEST A POLL OR SURVEY TOPIC
          </h3>
          <p className="font-sans text-sm text-[#E8DCC4] max-w-xl leading-relaxed font-light">
            Have a critical question or industry topic you want Prime Success to put to a global vote? Submit your survey proposal to our research bureau.
          </p>
          <Button href="/contact" variant="secondary" size="md" className="mt-2">
            SUBMIT SURVEY TOPIC
          </Button>
        </div>
      </div>
    </div>
  );
}
