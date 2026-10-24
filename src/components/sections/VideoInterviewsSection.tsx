"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Video } from "lucide-react";
import Button from "@/components/ui/Button";

const INTERVIEWS = [
  { id: "Ljbgj3GFMlA", category: "POLICY", title: "National Governance & Policy Blueprint", duration: "18:45" },
  { id: "NsSiv6OOc6A", category: "ENTERPRISE", title: "Building Durable Global Enterprises", duration: "24:10" },
  { id: "cRAsOrxNc08", category: "CULTURE", title: "Preserving India's Civilisational Heritage", duration: "16:30" },
  { id: "8PMmjj9_ocI", category: "PUBLIC LIFE", title: "Leadership in Public Administration", duration: "21:15" },
  { id: "ou00nS5Qhcs", category: "ENTERPRISE", title: "Innovation & Next-Gen Founders", duration: "19:50" },
  { id: "OIQwhehSffs", category: "POLICY", title: "Viksit Bharat @2047 Economic Vision", duration: "27:00" },
];

const CATEGORIES = ["ALL", "POLICY", "ENTERPRISE", "CULTURE", "PUBLIC LIFE"];

export default function VideoInterviewsSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredInterviews = activeCategory === "ALL"
    ? INTERVIEWS
    : INTERVIEWS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 bg-luxury-dark text-ivory border-b border-royal-gold/20 relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          number="INTERVIEW BROADCASTS"
          eyebrow="CONVERSATIONS WITH BUILDERS & LEADERS"
          title="WE LOOK FORWARD TO SHARING THE JOURNEY AHEAD"
          subtitle="Watch high-impact video dispatches and in-depth discussions with the policy makers, founders, and icons shaping India's future."
        />

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-md cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#6B0E16] text-[#F9F5EC] border border-[#E5C158] shadow-lg shadow-[#6B0E16]/30"
                  : "bg-[#120E09]/80 text-[#E8DCC4]/80 border border-royal-gold/20 hover:border-royal-gold/60 hover:text-[#F9F5EC]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {filteredInterviews.map((video, idx) => (
            <div
              key={video.id}
              className="bg-luxury-card border border-royal-gold/30 rounded-xl overflow-hidden shadow-2xl hover:border-royal-gold transition-all duration-500 group flex flex-col hover:-translate-y-1"
            >
              {/* Responsive Video Frame */}
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Details */}
              <div className="p-6 flex flex-col justify-between gap-4 flex-grow border-t border-royal-gold/15 bg-[#120E09]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-[#6B0E16]/40 border border-[#E5C158]/40 text-[#E5C158] text-[10px] font-sans font-bold uppercase tracking-widest rounded-md">
                      {video.category}
                    </span>
                    <span className="text-[11px] font-sans text-[#E8DCC4]/60 font-mono">
                      {video.duration}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#F9F5EC] group-hover:text-[#E5C158] transition-colors leading-snug">
                    {video.title}
                  </h4>
                </div>

                <div className="pt-3 border-t border-royal-gold/15 flex items-center justify-between text-xs font-sans text-[#E8DCC4]/70">
                  <span className="flex items-center gap-1.5 text-royal-gold font-semibold">
                    <Video className="w-3.5 h-3.5 text-royal-gold" />
                    <span>Broadcast 0{idx + 1}</span>
                  </span>
                  <span className="text-[11px] text-[#E5C158] font-bold tracking-wider">
                    EXCLUSIVE DISPATCH
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/interviews" variant="outline" size="lg">
            VIEW ALL INTERVIEW BROADCASTS
          </Button>
        </div>
      </div>
    </section>
  );
}
