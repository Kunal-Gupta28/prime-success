import Link from "next/link";
import { ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import ImageReveal from "@/components/ui/ImageReveal";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import { Article } from "@/types";

interface CoverStorySectionProps {
  article: Article;
}

export default function CoverStorySection({ article }: CoverStorySectionProps) {
  return (
    <section className="py-24 px-6 md:px-12 bg-luxury-dark border-t border-royal-gold/20 relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="03"
          eyebrow="EXCLUSIVE COVER STORY"
          title="NATIONAL EDITORIAL INVESTIGATION"
          subtitle="Deep dive investigative profiles into India's most influential visionaries, policy architects, and industry pioneers."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-luxury-card border border-royal-gold/35 p-6 md:p-10 relative shadow-2xl rounded-xl group hover:border-royal-gold/60 transition-all duration-500">
          
          {/* Cover Story Image */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-lg">
            <ImageReveal
              src={article.image}
              alt={article.title}
              aspectRatio="aspect-[16/10]"
              containerClassName="border-royal-gold/30 rounded-lg shadow-xl"
            />
            {/* Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#6B0E16] text-[#F9F5EC] border border-[#E5C158]/50 px-3.5 py-1.5 rounded-md text-[10px] font-sans font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
              SPECIAL EDITION COVER STORY
            </div>
          </div>

          {/* Cover Story Details */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-[#6B0E16] text-[#F9F5EC] text-[10px] tracking-[0.25em] font-sans font-bold uppercase rounded-sm shadow-md">
                  {article.category}
                </span>
                <span className="text-xs text-royal-gold font-sans font-semibold tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-royal-gold" />
                  {article.publishedAt}
                </span>
                <span className="text-xs text-cream/70 font-sans font-light">
                  • 8 Min Read
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-ivory leading-tight hover:text-royal-gold transition-colors">
                <Link href={`/magazine/${article.slug}`}>{article.title}</Link>
              </h3>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-sans text-sm text-cream/90 leading-relaxed font-light">
                {article.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="p-4 bg-luxury-dark/90 border-l-2 border-royal-gold italic font-serif text-sm text-cream/90 rounded-r-md shadow-sm">
                “{article.pullQuote}”
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button href={`/magazine/${article.slug}`} variant="primary" size="md">
                  READ FULL COVER STORY
                </Button>
                <Link
                  href="/magazine"
                  className="text-xs font-sans text-royal-gold font-bold tracking-wider uppercase hover:underline flex items-center gap-1"
                >
                  <span>BROWSE ARCHIVE</span>
                  <ArrowUpRight className="w-4 h-4 text-royal-gold" />
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
