import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

interface FinalCTAProps {
  onOpenOnboarding: () => void;
  onExploreClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenOnboarding,
  onExploreClick,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#0A1713] text-white relative overflow-hidden">
      {/* Subtle background radial accent */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#92E8B7 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#176B4D]/40 border border-[#176B4D] text-xs font-semibold text-[#92E8B7] uppercase tracking-wider">
            Start Your Clarity Journey
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
            Make your next money decision a clearer one.
          </h2>

          <p className="text-base sm:text-lg text-[#92E8B7]/80 max-w-xl mx-auto leading-relaxed text-pretty font-normal">
            Say goodbye to frantic month-end spreadsheet reconciliations. Step into a calmer,
            grounded relationship with your finances today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-[#0A1713] bg-[#92E8B7] hover:bg-[#FFFFFF] rounded-xl transition-colors duration-150 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#92E8B7]"
            >
              <span>Get started with Fermor</span>
              <ArrowUpRight className="w-4 h-4 text-[#0A1713]" />
            </button>

            <button
              type="button"
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-white hover:text-[#92E8B7] bg-[#176B4D]/30 hover:bg-[#176B4D]/50 border border-[#176B4D] rounded-xl transition-colors"
            >
              <span>Test Interactive Simulator</span>
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#92E8B7]/70">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#92E8B7]" /> Free local demo
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#92E8B7]" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#92E8B7]" /> Instant configuration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
