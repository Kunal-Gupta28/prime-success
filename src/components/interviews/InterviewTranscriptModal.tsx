"use client";

import { X } from "lucide-react";
import { Interview } from "@/types";

interface Props {
  interview: Interview;
  onClose: () => void;
}

export default function InterviewTranscriptModal({ interview, onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Interview Broadcast — ${interview.title}`}
      className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-8 animate-in fade-in duration-300 overflow-y-auto"
    >
      <div className="max-w-4xl w-full bg-luxury-card border border-royal-gold/30 shadow-2xl relative flex flex-col overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-royal-gold/20 flex items-center justify-between bg-luxury-dark">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-royal-red text-[#F9F5EC] text-[10px] font-sans font-bold uppercase tracking-widest">
              {interview.category}
            </span>
            <span className="text-xs text-royal-gold font-sans font-semibold">
              PUBLISHED: {interview.publishedAt}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-cream/70 hover:text-royal-gold transition-colors cursor-pointer"
            aria-label="Close interview modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={interview.videoUrl}
            title={interview.title}
            className="w-full h-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
            {interview.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-cream/80 border-y border-royal-gold/15 py-3">
            <span className="font-semibold text-royal-gold text-sm">
              {interview.guestName}
            </span>
            <span>•</span>
            <span>{interview.guestRole}, <strong>{interview.organization}</strong></span>
            <span>•</span>
            <span className="font-mono text-royal-gold">{interview.duration}</span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
            {interview.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
