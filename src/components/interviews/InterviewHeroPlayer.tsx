"use client";

import { Play } from "lucide-react";
import { Interview } from "@/types";

interface Props {
  featuredInterview: Interview;
  onPlay: (interview: Interview) => void;
}

export default function InterviewHeroPlayer({ featuredInterview, onPlay }: Props) {
  return (
    <div className="my-12 bg-luxury-card border border-royal-gold/30 p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Video Player Frame */}
        <div className="lg:col-span-7 relative aspect-video w-full bg-luxury-black border border-royal-gold/30 shadow-2xl overflow-hidden group">
          <iframe
            src={featuredInterview.videoUrl}
            title={featuredInterview.title}
            className="w-full h-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info & Transcript Launch Button */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-royal-red text-[#F9F5EC] text-[10px] tracking-[0.25em] font-sans font-bold uppercase border border-royal-gold/30">
              FEATURED BROADCAST
            </span>
            <span className="text-xs text-royal-gold font-sans font-semibold tracking-widest uppercase">
              {featuredInterview.category}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ivory leading-snug">
            {featuredInterview.title}
          </h2>

          <div className="flex flex-col gap-1 font-sans text-sm text-cream/90">
            <span className="font-semibold text-royal-gold">
              {featuredInterview.guestName}
            </span>
            <span className="text-xs text-cream/70">
              {featuredInterview.guestRole}, <strong>{featuredInterview.organization}</strong>
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-cream/80 font-light leading-relaxed">
            {featuredInterview.summary}
          </p>

          <button
            onClick={() => onPlay(featuredInterview)}
            className="w-full py-4 bg-royal-gold hover:bg-royal-gold-light text-luxury-black font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-3 cursor-pointer mt-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>OPEN TRANSCRIPT & BROADCAST</span>
          </button>
        </div>
      </div>
    </div>
  );
}
