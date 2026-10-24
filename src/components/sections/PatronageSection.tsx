import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import Parallax from "@/components/animations/Parallax";
import { Crown, Sparkles, Building, Globe } from "lucide-react";

export default function PatronageSection() {
  return (
    <section className="py-28 px-6 md:px-12 bg-luxury-dark border-b border-royal-gold/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          number="PATRONAGE"
          eyebrow="GLOBAL INSTITUTIONAL ALLIANCES"
          title="ENDORSERS OF EXCELLENCE"
          subtitle="Prime Success operates under the global patronage of leading sovereign funds, academic institutes, and industrial syndicates."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Reveal delay={0.1}>
            <Parallax speed={-20}>
              <div className="p-8 bg-luxury-card border border-royal-gold/30 flex flex-col gap-4 text-center items-center shadow-lg shadow-luxury-black">
                <Crown className="w-8 h-8 text-royal-gold" />
                <h4 className="font-serif text-lg font-bold text-ivory">Royal Advisory Board</h4>
                <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
                  Composed of former heads of state, diplomats, and laureates guiding the global honors charter.
                </p>
              </div>
            </Parallax>
          </Reveal>

          <Reveal delay={0.2}>
            <Parallax speed={20}>
              <div className="p-8 bg-luxury-card border border-royal-gold/30 flex flex-col gap-4 text-center items-center shadow-lg shadow-luxury-black">
                <Building className="w-8 h-8 text-royal-gold" />
                <h4 className="font-serif text-lg font-bold text-ivory">Sovereign Wealth Syndicate</h4>
                <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
                  Aligning global financial syndicates to fuel long-term industrial energy and deep-tech innovation.
                </p>
              </div>
            </Parallax>
          </Reveal>

          <Reveal delay={0.3}>
            <Parallax speed={-20}>
              <div className="p-8 bg-luxury-card border border-royal-gold/30 flex flex-col gap-4 text-center items-center shadow-lg shadow-luxury-black">
                <Sparkles className="w-8 h-8 text-royal-gold" />
                <h4 className="font-serif text-lg font-bold text-ivory">Global Research Bureau</h4>
                <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
                  Independent quantitative research verifying empirical societal impact and ethical governance.
                </p>
              </div>
            </Parallax>
          </Reveal>

          <Reveal delay={0.4}>
            <Parallax speed={20}>
              <div className="p-8 bg-luxury-card border border-royal-gold/30 flex flex-col gap-4 text-center items-center shadow-lg shadow-luxury-black">
                <Globe className="w-8 h-8 text-royal-gold" />
                <h4 className="font-serif text-lg font-bold text-ivory">Press & Editorial Guild</h4>
                <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
                  Publishing high-end editorial features distributed across 48 nations in 6 language editions.
                </p>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
