import React from 'react';
import { ArrowUpRight, Compass, Shield, ArrowDown } from 'lucide-react';
import { FinancialDashboard } from './FinancialDashboard';

interface HeroSectionProps {
  onOpenOnboarding: () => void;
  onOpenExplorerTab: (tab: 'spending' | 'saving' | 'overview') => void;
  onOpenInsight: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOnboarding,
  onOpenExplorerTab,
  onOpenInsight,
}) => {
  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background subtle tint and fine grid pattern */}
      <div className="absolute inset-0 bg-[#F7F7F1] -z-10" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#0A1713 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Philosophy */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B4D]">
              <span>Quiet personal finance</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#66716B] font-normal normal-case">Independent & private</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#0A1713] tracking-tight leading-[1.12] text-balance">
              Your money.
              <br />
              <span className="text-[#176B4D]">A little more understood.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#66716B] leading-relaxed max-w-xl text-pretty font-normal">
              Most money tools shout with red alerts, aggressive loan offers, and overwhelming charts.
              Fermor replaces the noise with calm clarity—helping you see where your money flows, protect what matters, and build habits around goals you actually care about.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onOpenOnboarding}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-xl transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B4D]"
              >
                <span>Get started</span>
                <ArrowUpRight className="w-4 h-4 text-[#92E8B7]" />
              </button>

              <a
                href="#how-it-works"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-[#18231D] hover:text-[#0A1713] bg-white hover:bg-[#FAFBF9] border border-[#E2E7E0] rounded-xl transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D]"
              >
                <span>Explore how it works</span>
                <ArrowDown className="w-4 h-4 text-[#66716B]" />
              </a>
            </div>

            {/* Honest Supporting Statement */}
            <div className="pt-4 border-t border-[#E2E7E0]/80">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#176B4D]/10 flex items-center justify-center text-[#176B4D] shrink-0 mt-0.5">
                  <Shield className="w-3 h-3" />
                </div>
                <p className="text-xs text-[#66716B] leading-relaxed">
                  <strong className="font-semibold text-[#18231D]">Zero financial noise:</strong> No unsolicited credit cards, no speculative stock tips, and no fabricated urgency. Just honest, clear accounting.
                </p>
              </div>
            </div>

            {/* Quiet Metadata Proof Points */}
            <div className="flex items-center gap-4 text-xs text-[#66716B] pt-1">
              <span>Interactive preview below</span>
              <span aria-hidden="true">·</span>
              <span>Rupee native</span>
              <span aria-hidden="true">·</span>
              <span>100% private sandbox</span>
            </div>
          </div>

          {/* Right Column: Live Financial Dashboard */}
          <div className="lg:col-span-6 relative">
            {/* Subtle decorative glow container */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#92E8B7]/15 to-[#176B4D]/5 rounded-3xl blur-xl -z-10" />
            <FinancialDashboard
              onOpenExplorerTab={onOpenExplorerTab}
              onOpenInsight={onOpenInsight}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
