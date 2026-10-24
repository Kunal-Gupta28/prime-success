"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, BookOpen, ChevronLeft } from "lucide-react";
import { MagazineIssue } from "@/types";

interface Props {
  issue: MagazineIssue;
  onOpenReader: () => void;
}

export default function MagazineIssueHeader({ issue, onOpenReader }: Props) {
  return (
    <div>
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/magazine"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-royal-gold hover:text-ivory transition-colors uppercase font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>RETURN TO MAGAZINE ARCHIVE</span>
        </Link>
      </div>

      {/* Main Issue Hero Box */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-center bg-luxury-card border border-royal-gold/30 p-3 md:p-5 shadow-2xl relative overflow-hidden">
        {/* Cover Preview (3:4 Print Aspect Ratio) */}
        <div className="lg:col-span-7 relative aspect-[3/4] border border-royal-gold/40 shadow-2xl overflow-hidden group">
          <Image
            src={issue.coverImage}
            alt={issue.title}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Issue Details & CTAs */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-1 bg-royal-red text-[#F9F5EC] text-[10px] tracking-[0.2em] font-sans font-bold uppercase border border-royal-gold/30">
              {issue.category}
            </span>
            <span className="text-[11px] text-royal-gold font-sans font-semibold tracking-widest uppercase">
              {issue.issueNumber} ({issue.monthYear})
            </span>
          </div>

          <h1 className="font-serif text-xl sm:text-2xl font-bold text-ivory leading-tight">
            {issue.title}
          </h1>

          <p className="font-sans text-[13px] sm:text-sm text-cream/90 font-light leading-relaxed">
            {issue.description}
          </p>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border-y border-royal-gold/15 py-2 text-[11px] font-sans">
            <div>
              <span className="block text-royal-gold font-semibold uppercase">PAGES</span>
              <span className="text-cream/80">{issue.pagesCount} Pages</span>
            </div>
            <div>
              <span className="block text-royal-gold font-semibold uppercase">PRGI REGISTRATION</span>
              <span className="text-cream/80">{issue.prgiRegNo}</span>
            </div>
            <div>
              <span className="block text-royal-gold font-semibold uppercase">FORMAT</span>
              <span className="text-cream/80">Vector PDF & Digital Reader</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-1">
            <button
              onClick={onOpenReader}
              className="w-full sm:w-auto px-4 py-2 bg-royal-gold hover:bg-royal-gold-light text-luxury-black font-sans text-[11px] tracking-[0.18em] font-bold uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer rounded-none"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>READ DIGITAL ISSUE</span>
            </button>

            <a
              href={issue.pdfUrl}
              download
              className="w-full sm:w-auto px-4 py-2 bg-royal-gold/15 hover:bg-royal-gold text-royal-gold hover:text-luxury-black border border-royal-gold font-sans text-[11px] tracking-[0.18em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
