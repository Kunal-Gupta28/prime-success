"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { X, Download } from "lucide-react";
import { MagazineIssue } from "@/types";
import { useLenis } from "@/components/layout/SmoothScroll";

const MagazineBookReader = dynamic(() => import("./MagazineBookReader"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-cream/70 py-24">
      <div className="w-8 h-8 border-2 border-royal-gold/30 border-t-royal-gold rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest font-sans">Initializing Digital Reader...</span>
    </div>
  ),
});

interface Props {
  issue: MagazineIssue;
  onClose: () => void;
}

export default function MagazinePdfModal({ issue, onClose }: Props) {
  const [readerMode, setReaderMode] = useState<"PDF" | "BOOK">("BOOK");
  const lenis = useLenis();

  // Lock background page scroll while the reader is open. CSS `overflow: hidden`
  // alone isn't enough — Lenis intercepts wheel events directly and still moves
  // window.scrollY, so the underlying Lenis instance must be paused too.
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [lenis]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Digital Reader — ${issue.title}`}
      className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300"
    >
      {/* Reader Top Bar */}
      <div className="h-16 border-b border-royal-gold/20 px-6 flex items-center justify-between bg-luxury-dark text-ivory">
        <div className="flex items-center gap-4">
          <span className="font-serif text-sm sm:text-base font-bold text-royal-gold hidden sm:inline">
            {issue.title}
          </span>
          <span className="px-2.5 py-1 bg-royal-red text-[#F9F5EC] text-[10px] font-sans font-bold uppercase tracking-widest">
            {issue.issueNumber}
          </span>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-4 text-xs font-sans">
          {/* Mode Switcher */}
          <div className="hidden sm:flex items-center border border-royal-gold/30 p-1 bg-luxury-black">
            <button
              onClick={() => setReaderMode("BOOK")}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase font-bold transition-colors ${
                readerMode === "BOOK" ? "bg-royal-gold text-luxury-black" : "text-cream/70 hover:text-ivory"
              }`}
            >
              BOOK VIEW
            </button>
            <button
              onClick={() => setReaderMode("PDF")}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase font-bold transition-colors ${
                readerMode === "PDF" ? "bg-royal-gold text-luxury-black" : "text-cream/70 hover:text-ivory"
              }`}
            >
              REAL PDF VIEW
            </button>
          </div>

          {/* Download Link */}
          <a
            href={issue.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-royal-gold/15 text-royal-gold hover:bg-royal-gold hover:text-luxury-black border border-royal-gold text-[10px] font-bold tracking-wider uppercase transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">DOWNLOAD PDF</span>
          </a>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-cream/70 hover:text-royal-gold transition-colors"
            aria-label="Close reader modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Reader Stage */}
      <div className="flex-grow relative overflow-hidden bg-black/80 flex items-center justify-center p-2 sm:p-4">
        {readerMode === "PDF" ? (
          <iframe
            src={issue.pdfUrl?.replace("/view", "/preview")}
            title={`PDF Reader for ${issue.title}`}
            className="w-full h-full max-w-5xl border border-royal-gold/30 shadow-2xl bg-white"
          />
        ) : issue.pdfUrl ? (
          <MagazineBookReader pdfUrl={issue.pdfUrl} title={issue.title} />
        ) : (
          <p className="font-sans text-sm text-cream/70">No source file available for this issue.</p>
        )}
      </div>
    </div>
  );
}
