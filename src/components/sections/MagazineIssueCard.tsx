"use client";

import Link from "next/link";
import { MagazineIssue } from "@/types";
import { ArrowRight, BookOpen, Crown, FileCheck, Layers } from "lucide-react";
import ImageReveal from "@/components/ui/ImageReveal";

interface MagazineIssueCardProps {
  issue: MagazineIssue;
}

export default function MagazineIssueCard({ issue }: MagazineIssueCardProps) {
  return (
    <div className="group relative bg-luxury-card border border-royal-gold/30 hover:border-royal-gold transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-royal-gold/15">
      {/* Cover Image Container */}
      <div className="relative overflow-hidden bg-luxury-dark w-full aspect-[3/4]">
        <ImageReveal
          src={issue.coverImage}
          alt={`Prime Success Magazine Cover - ${issue.title} (${issue.monthYear})`}
          aspectRatio="aspect-[3/4]"
          objectFit="contain"
        />

        {/* Magazine Cover Framing Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 bg-royal-red/90 text-[#F9F5EC] text-[10px] tracking-[0.2em] font-sans font-bold uppercase border border-royal-gold/40 shadow-lg">
            {issue.category}
          </span>
          {issue.isCurrentIssue && (
            <span className="px-2.5 py-1 bg-royal-gold text-luxury-black text-[10px] tracking-[0.2em] font-sans font-bold uppercase flex items-center gap-1 shadow-lg">
              <Crown className="w-3 h-3 text-luxury-black" />
              CURRENT ISSUE
            </span>
          )}
        </div>

        {/* Cover Bottom Info Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-cream/90 font-sans pointer-events-none">
          <span className="font-serif font-bold text-royal-gold text-sm tracking-wide">
            {issue.issueNumber}
          </span>
          <span className="flex items-center gap-1 text-[11px] bg-luxury-black/70 px-2 py-0.5 border border-royal-gold/20">
            <Layers className="w-3 h-3 text-royal-gold" />
            {issue.pagesCount} Pages
          </span>
        </div>
      </div>

      {/* Magazine Info Details */}
      <div className="p-6 sm:p-8 flex flex-col justify-between w-full flex-1">
        <div className="flex flex-col gap-3">
          {/* Header Metadata */}
          <div className="flex items-center justify-between border-b border-royal-gold/20 pb-3 text-xs font-sans">
            <span className="text-royal-gold font-semibold tracking-widest uppercase">
              {issue.monthYear}
            </span>
            <span className="text-cream/60 flex items-center gap-1 text-[10px] tracking-wider uppercase font-mono">
              <FileCheck className="w-3 h-3 text-royal-gold" />
              PRGI: {issue.prgiRegNo}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-gold-gradient transition-colors leading-snug my-1">
            {issue.title}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-cream/80 leading-relaxed font-light line-clamp-3">
            {issue.subtitle}
          </p>

          {/* Cover Feature Highlight */}
          {issue.coverPerson && (
            <div className="mt-2 p-3 bg-royal-gold/10 border border-royal-gold/25 text-xs text-ivory font-sans flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-royal-gold shrink-0" />
              <span className="font-semibold text-royal-gold truncate">
                Cover Feature: {issue.coverPerson}
              </span>
            </div>
          )}
        </div>

        {/* Action Button Link */}
        <div className="mt-6 pt-4 border-t border-royal-gold/20 flex items-center justify-between">
          <Link
            href={`/magazine/issue/${issue.slug}`}
            className="w-full py-3 bg-royal-gold/15 hover:bg-royal-gold text-royal-gold hover:text-luxury-black border border-royal-gold text-xs tracking-[0.2em] font-sans font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 text-center"
            aria-label={`Read Prime Success Magazine — ${issue.title} (${issue.monthYear})`}
          >
            <span>READ ISSUE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
