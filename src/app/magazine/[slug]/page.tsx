import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock, Calendar } from "lucide-react";
import { articlesData } from "@/data/mockData";
import GoldDivider from "@/components/ui/GoldDivider";
import NominationCTA from "@/components/sections/NominationCTA";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="pt-28 pb-20 bg-luxury-black text-ivory">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link
          href="/magazine"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-royal-gold hover:text-ivory transition-colors uppercase"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>RETURN TO MAGAZINE</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-royal-red text-[#F9F5EC] text-[10px] tracking-[0.25em] font-sans font-bold uppercase border border-royal-gold/30">
            {article.category}
          </span>
          <span className="text-xs text-royal-gold font-sans font-semibold tracking-widest uppercase flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedAt}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory leading-tight">
          {article.title}
        </h1>

        <p className="font-sans text-base md:text-lg text-cream/80 max-w-2xl font-light leading-relaxed">
          {article.subtitle}
        </p>

        <div className="flex items-center gap-4 py-4 border-y border-royal-gold/20 w-full justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full relative overflow-hidden border border-royal-gold/40">
              <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
            </div>
            <div className="text-left font-sans text-xs">
              <div className="font-semibold text-ivory">{article.author.name}</div>
              <div className="text-cream/50">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans text-cream/60">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-royal-gold" />
              {article.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Article Image */}
      <div className="max-w-5xl mx-auto px-6 my-12">
        <div className="relative aspect-[16/9] border border-royal-gold/20 overflow-hidden">
          <Image src={article.image} alt={article.title} fill priority className="object-cover" />
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-3xl mx-auto px-6 font-sans text-base text-cream/90 leading-relaxed font-light flex flex-col gap-6">
        {article.pullQuote && (
          <blockquote className="p-8 bg-luxury-card border-l-4 border-royal-gold font-serif italic text-xl md:text-2xl text-ivory my-4 leading-snug">
            “{article.pullQuote}”
          </blockquote>
        )}

        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <GoldDivider variant="diamond" className="my-8" />
      </div>

      <NominationCTA />
    </article>
  );
}
