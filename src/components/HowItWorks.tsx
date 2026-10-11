import React from 'react';
import { Eye, Compass, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenOnboarding: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenOnboarding }) => {
  const steps = [
    {
      step: '01',
      title: 'Understand',
      subtitle: 'See your financial picture clearly.',
      description:
        'Connect your typical transactions or log monthly totals. Fermor categorizes outflows cleanly into essential survival, flexible living, and real surplus—stripping away confusion.',
      metricNote: 'Zero complicated jargon',
      graphic: (
        <div className="bg-white p-3.5 rounded-xl border border-[#EDF0EC] space-y-2">
          <div className="flex justify-between text-[11px] text-[#66716B]">
            <span>Income: ₹1,12,000</span>
            <span className="text-[#176B4D] font-semibold">100% Accounted</span>
          </div>
          <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden flex">
            <div className="bg-[#176B4D] h-full w-[38%]" title="Housing" />
            <div className="bg-[#28966E] h-full w-[28%]" title="Living" />
            <div className="bg-[#92E8B7] h-full w-[34%]" title="Surplus" />
          </div>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Decide',
      subtitle: 'Identify a useful next step.',
      description:
        'Instead of twenty flashing alerts, Fermor isolates 1 to 3 deliberate questions per month: an unnoticed auto-renewal, a shifting dining pattern, or a funded buffer threshold.',
      metricNote: 'Signal over noise',
      graphic: (
        <div className="bg-white p-3.5 rounded-xl border border-[#EDF0EC] space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0A1713]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#176B4D]" />
            <span>Calm Priority for October</span>
          </div>
          <p className="text-[11px] text-[#66716B]">
            Review 3 quarterly subscriptions due before Oct 24.
          </p>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Grow',
      subtitle: 'Build habits around real goals.',
      description:
        'Anchor your unspent surplus to tangible personal ambitions—emergency cushion, sabbatical travel, or home workspace. Small, rhythmic allocations create lasting peace of mind.',
      metricNote: 'Compound consistency',
      graphic: (
        <div className="bg-white p-3.5 rounded-xl border border-[#EDF0EC] space-y-2">
          <div className="flex justify-between text-[11px] text-[#66716B]">
            <span>Emergency Cushion</span>
            <span className="text-[#176B4D] font-bold">65% Reached</span>
          </div>
          <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden">
            <div className="bg-[#176B4D] h-full w-[65%]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#FFFFFF] border-y border-[#E2E7E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B4D]">
            <span>Methodology</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66716B] font-normal normal-case">How it works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1713] text-balance">
            A deliberate, three-stage rhythm.
          </h2>

          <p className="text-base text-[#66716B] leading-relaxed text-pretty">
            Financial confidence does not require complex trading desks or endless daily micro-management.
            It requires a steady, reliable loop that you can trust.
          </p>
        </div>

        {/* 3 Step Sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-[#FAFBF9] rounded-2xl border border-[#E2E7E0] p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#176B4D] tracking-tight">
                    {item.step}
                  </span>
                  <span className="text-xs font-semibold text-[#66716B] bg-white border border-[#E2E7E0] px-2.5 py-1 rounded-md">
                    {item.metricNote}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0A1713]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#176B4D] mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#66716B] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Step graphic visual */}
              <div className="pt-2">{item.graphic}</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenOnboarding}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-xl transition-colors shadow-2xs"
          >
            <span>Start your three-step setup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
