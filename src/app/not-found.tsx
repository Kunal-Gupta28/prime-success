import Link from "next/link";
import { Home, Compass } from "lucide-react";
import BrandCrown from "@/components/ui/BrandCrown";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-24 bg-[#080604] text-[#F9F5EC] bg-noise">
      <div className="max-w-xl w-full bg-[#120E09] border border-[#E5C158]/40 p-8 sm:p-12 shadow-2xl rounded-2xl text-center flex flex-col items-center gap-6 relative overflow-hidden">
        {/* Top Badge */}
        <div className="flex items-center gap-3 bg-[#6B0E16]/60 border border-[#E5C158]/50 px-4 py-1.5 rounded-full shadow-lg">
          <BrandCrown className="w-5 h-5" />
          <span className="text-[11px] font-sans font-bold text-[#E5C158] uppercase tracking-[0.25em]">
            404 — PAGE UNORGANIZED
          </span>
        </div>

        <div className="font-serif text-7xl font-bold bg-gradient-to-r from-[#FFF1B0] via-[#E5C158] to-[#B38E22] bg-clip-text text-transparent drop-shadow-lg">
          404
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F9F5EC]">
            DESIRED ARCHIVE NOT FOUND
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#E8DCC4]/80 font-light leading-relaxed">
            The page or editorial dispatch you are seeking may have been archived, renamed, or relocated within our digital hall.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4 border-t border-[#E5C158]/20">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#6B0E16] text-[#F9F5EC] border border-[#E5C158]/60 text-xs font-sans font-bold tracking-[0.2em] uppercase rounded-md hover:bg-[#8B121D] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Home className="w-4 h-4 text-[#E5C158]" />
            <span>HOME HALL</span>
          </Link>
          <Link
            href="/magazine"
            className="w-full sm:w-auto px-6 py-3 bg-transparent text-[#E5C158] border border-[#E5C158]/50 text-xs font-sans font-bold tracking-[0.2em] uppercase rounded-md hover:bg-[#E5C158]/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#E5C158]" />
            <span>EXPLORE MAGAZINE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
