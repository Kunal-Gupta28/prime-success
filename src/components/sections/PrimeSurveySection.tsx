"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckCircle2, ShieldCheck, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import BrandCrown from "@/components/ui/BrandCrown";
import { surveysData } from "@/data/mockData";

interface PollOption {
  id: number;
  rank: number;
  name: string;
  title: string;
  votes: number;
  color: string;
}

// Mirrors the "Best Chief Minister in India" poll on the /surveys page (poll-22)
// so both pages always show the same live data.
const CM_POLL_ID = "poll-22";

const STATE_TITLES: Record<string, string> = {
  "Mr. Yogi Adityanath": "Chief Minister, Uttar Pradesh",
  "Mr. Pushkar Singh Dhami": "Chief Minister, Uttarakhand",
  "Mr. Nayab Singh Saini": "Chief Minister, Haryana",
  "Mr. Devendra Fadnavis": "Chief Minister, Maharashtra",
  "Mr. N. Chandrababu Naidu": "Chief Minister, Andhra Pradesh",
};

const RANK_COLORS = [
  "from-[#FFF1B0] via-[#E5C158] to-[#B38E22]",
  "from-[#F4E296] via-[#D4AF37] to-[#85640D]",
  "from-[#E5C158] to-[#997A15]",
  "from-[#D4AF37] to-[#7A5B0B]",
  "from-[#C5A028] to-[#563F05]",
];

const cmPoll = surveysData.find((poll) => poll.id === CM_POLL_ID);

const POLL_OPTIONS: PollOption[] = (cmPoll?.options ?? []).map((opt, idx) => ({
  id: idx,
  rank: idx + 1,
  name: opt.label,
  title: STATE_TITLES[opt.label] ?? "",
  votes: opt.votes,
  color: RANK_COLORS[idx] ?? RANK_COLORS[RANK_COLORS.length - 1],
}));

const BASE_TOTAL_VOTES = POLL_OPTIONS.reduce((sum, opt) => sum + opt.votes, 0);

export default function PrimeSurveySection() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (id: number) => {
    setSelectedOption(id);
    setHasVoted(true);
  };

  const currentTotalVotes = hasVoted ? BASE_TOTAL_VOTES + 1 : BASE_TOTAL_VOTES;

  return (
    <section className="py-24 bg-luxury-black text-ivory relative border-b border-royal-gold/25 overflow-hidden bg-noise">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          number="NATIONAL PUBLIC SENTIMENT POLL"
          eyebrow="PRIME SUCCESS EDITORIAL RANKINGS"
          title="WHO IS THE BEST CHIEF MINISTER IN INDIA?"
          subtitle="Cast your vote and join thousands of verified business leaders, policy analysts, and citizens participating in our hourly updated national tracker."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-12 items-stretch">
          
          {/* LEFT COLUMN: Main Royal Poll Card (7 Cols) */}
          <div className="lg:col-span-7 bg-[#120E09] dark:bg-[#120E09] border border-[#E5C158]/40 p-6 sm:p-8 shadow-2xl relative rounded-xl flex flex-col justify-between">
            {/* Top Ornamental Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5C158]/25 pb-5 mb-6">
              <div className="flex items-center gap-2.5">
                <BrandCrown className="w-5 h-5" />
                <span className="text-xs font-sans font-bold text-[#E5C158] uppercase tracking-[0.2em]">
                  {currentTotalVotes.toLocaleString('en-US')} VERIFIED READER VOTES
                </span>
              </div>
              <span className="px-3 py-1 bg-[#6B0E16] border border-[#E5C158]/40 text-[#F9F5EC] text-[10px] font-sans font-bold uppercase tracking-widest rounded-md shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158] animate-ping" />
                LIVE HOURLY TALLY
              </span>
            </div>

            {/* Candidates Poll List */}
            <div className="flex flex-col gap-4">
              {POLL_OPTIONS.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const currentVotes = hasVoted && isSelected ? opt.votes + 1 : opt.votes;
                const displayPercent = Math.round((currentVotes / currentTotalVotes) * 100);

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleVote(opt.id)}
                    className={`group relative p-4 sm:p-5 border transition-all duration-300 cursor-pointer rounded-lg overflow-hidden ${
                      isSelected
                        ? "border-[#E5C158] bg-[#1C160F] shadow-lg shadow-[#E5C158]/10"
                        : "border-[#E5C158]/25 bg-[#17120B]/80 hover:border-[#E5C158]/60 hover:bg-[#1F190F]"
                    }`}
                  >
                    {/* Background Progress Fill Glow */}
                    <div
                      className="absolute inset-y-0 left-0 bg-[#E5C158]/10 transition-all duration-700 pointer-events-none"
                      style={{ width: `${displayPercent}%` }}
                    />

                    <div className="relative z-10 flex flex-col gap-2.5">
                      {/* Candidate Header */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Rank Medallion */}
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-xs font-bold border transition-colors ${
                            isSelected
                              ? "bg-[#E5C158] text-[#120E09] border-[#FFF1B0]"
                              : "bg-[#251D12] text-[#E5C158] border-[#E5C158]/40 group-hover:border-[#E5C158]"
                          }`}>
                            #{opt.rank}
                          </div>

                          <div className="flex flex-col">
                            <span className="font-serif text-sm sm:text-base font-bold text-[#F9F5EC] group-hover:text-[#E5C158] transition-colors flex items-center gap-2">
                              {opt.name}
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-[#E5C158] flex-shrink-0" />
                              )}
                            </span>
                            <span className="text-[11px] font-sans text-[#E8DCC4]/70 font-light">
                              {opt.title}
                            </span>
                          </div>
                        </div>

                        {/* Percentage & Vote Count */}
                        <div className="flex flex-col items-end flex-shrink-0">
                          <span className="font-serif text-lg sm:text-xl font-bold bg-gradient-to-r from-[#FFF1B0] to-[#E5C158] bg-clip-text text-transparent">
                            {displayPercent}%
                          </span>
                          <span className="text-[10px] font-sans text-[#E8DCC4]/60">
                            {currentVotes.toLocaleString('en-US')} votes
                          </span>
                        </div>
                      </div>

                      {/* Animated Metallic Gold Progress Track */}
                      <div className="w-full h-2.5 bg-[#080604] border border-[#E5C158]/20 rounded-full overflow-hidden p-0.5 shadow-inner">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${opt.color} transition-all duration-1000 relative shadow-sm`}
                          style={{ width: `${displayPercent}%` }}
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 rounded-full blur-[1px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Verification Footer */}
            <div className="mt-6 border-t border-[#E5C158]/20 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-[#E8DCC4]/80">
              <span className="flex items-center gap-2 text-[#E5C158] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                100% SESSION VERIFIED POLL
              </span>
              <span className="text-[11px] font-medium text-[#E8DCC4]/70">
                ⌛ Polling Closes in 4 Days · Live Audit Trail
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Royal Editorial Sidebar Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Box 1: Have Your Say - Royal Burgundy Card */}
            <div className="p-8 bg-gradient-to-br from-[#32060B] via-[#4A0A10] to-[#220407] border border-[#E5C158]/40 text-[#F9F5EC] flex flex-col justify-between gap-6 shadow-2xl rounded-xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#E5C158]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#6B0E16] border border-[#E5C158]/50 flex items-center justify-center shadow-md overflow-hidden">
                      <BrandCrown className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#E5C158] uppercase">
                      EDITORIAL INFLUENCE
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#E5C158]" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#F9F5EC] leading-snug">
                  HAVE YOUR SAY IN NATIONAL POLICY
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#E8DCC4] leading-relaxed font-light">
                  New weekly polls track economic policy, governance benchmarks, and public sentiment. Verified reader votes feed directly into Prime Success Media’s quarterly published editorial rankings.
                </p>
              </div>

              <a
                href="/surveys"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#FFF1B0] via-[#E5C158] to-[#B38E22] text-[#120E09] font-sans font-bold text-xs tracking-[0.2em] uppercase rounded-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 group cursor-pointer relative z-10"
              >
                <span>EXPLORE ALL SURVEYS</span>
                <ChevronRight className="w-4 h-4 text-[#120E09] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Box 2: Survey Archive Tracker */}
            <div className="p-8 bg-[#120E09] dark:bg-[#120E09] border border-[#E5C158]/30 flex flex-col justify-between gap-4 shadow-2xl rounded-xl relative">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#E5C158] uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-[#E5C158]" />
                  <span>SURVEY ARCHIVE</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-[#F9F5EC]">
                  Over 40+ Completed Public Sentiment Trackers
                </h4>
                <p className="font-sans text-xs text-[#E8DCC4]/70 font-light leading-relaxed">
                  Access archived reader tallies ranging from state assembly sentiment to national GDP growth expectations and corporate governance benchmarks.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5C158]/20 flex items-center justify-between text-xs text-[#E5C158] font-semibold">
                <span>Updated Weekly</span>
                <span className="flex items-center gap-1 hover:underline cursor-pointer">
                  View Full Archive <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
