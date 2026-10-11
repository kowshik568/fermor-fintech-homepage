import React, { useState } from 'react';
import { Eye, Target, BellRing, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface ProductBenefitsProps {
  onExploreClick: () => void;
}

export const ProductBenefits: React.FC<ProductBenefitsProps> = ({ onExploreClick }) => {
  const [activeSimulationCategory, setActiveSimulationCategory] = useState<'fixed' | 'flexible' | 'savings'>('fixed');

  return (
    <section id="product" className="py-20 sm:py-28 bg-[#FFFFFF] border-y border-[#E2E7E0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B4D]">
            <span>Product Philosophy</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66716B] font-normal normal-case">Core architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1713] text-balance">
            See the bigger picture.
            <br />
            Find your next step.
          </h2>

          <p className="text-base sm:text-lg text-[#66716B] font-normal leading-relaxed text-pretty">
            Personal finance is rarely about complicated mathematics. It is about having an honest,
            uncluttered mirror of your financial reality so you can make decisions with complete composure.
          </p>
        </div>

        {/* Varied Layout: 3 Distinct Architectures */}
        <div className="space-y-8">
          {/* Benefit 1: Asymmetric Marquee Card with interactive allocation breakdown */}
          <div className="bg-[#FAFBF9] rounded-2xl border border-[#E2E7E0] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">
                01 — Clarity of Flow
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1713] tracking-tight">
                Understand spending patterns without guilt or judgment.
              </h3>
              <p className="text-sm sm:text-base text-[#66716B] leading-relaxed">
                Most budgeting apps scold you for everyday pleasures. Fermor takes an editorial approach:
                it organizes your outflows into fixed essentials, deliberate lifestyle choices, and quiet buffers.
                You see where every rupee actually travels without feeling micro-managed.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#18231D]">
                <button
                  type="button"
                  onClick={() => setActiveSimulationCategory('fixed')}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    activeSimulationCategory === 'fixed'
                      ? 'bg-[#176B4D] text-white border-[#176B4D]'
                      : 'bg-white border-[#E2E7E0] text-[#66716B] hover:text-[#0A1713]'
                  }`}
                >
                  Essential Base (₹42,700)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSimulationCategory('flexible')}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    activeSimulationCategory === 'flexible'
                      ? 'bg-[#176B4D] text-white border-[#176B4D]'
                      : 'bg-white border-[#E2E7E0] text-[#66716B] hover:text-[#0A1713]'
                  }`}
                >
                  Flexible Living (₹32,100)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSimulationCategory('savings')}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    activeSimulationCategory === 'savings'
                      ? 'bg-[#176B4D] text-white border-[#176B4D]'
                      : 'bg-white border-[#E2E7E0] text-[#66716B] hover:text-[#0A1713]'
                  }`}
                >
                  Surplus Retained (₹37,200)
                </button>
              </div>
            </div>

            {/* Visual preview on right */}
            <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-xl border border-[#E2E7E0] shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs text-[#66716B] border-b border-[#F0F2EF] pb-3">
                <span className="font-semibold text-[#0A1713]">Allocation Profile</span>
                <span className="tabular-nums">Total Net: ₹1,12,000 / mo</span>
              </div>

              {activeSimulationCategory === 'fixed' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#18231D] font-medium">Housing & Maintenance</span>
                    <span className="text-[#0A1713] font-semibold tabular-nums">₹28,500</span>
                  </div>
                  <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#176B4D] h-full w-[66%]" />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#18231D] font-medium">Groceries & Dairy Staples</span>
                    <span className="text-[#0A1713] font-semibold tabular-nums">₹14,200</span>
                  </div>
                  <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#28966E] h-full w-[34%]" />
                  </div>
                  <p className="text-[11px] text-[#66716B] bg-[#FAFBF9] p-2.5 rounded-lg border border-[#EDF0EC]">
                    Fixed expenses represent 38.1% of take-home pay, comfortably below the traditional 50% threshold.
                  </p>
                </div>
              )}

              {activeSimulationCategory === 'flexible' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#18231D] font-medium">Dining & Social Cafes</span>
                    <span className="text-[#0A1713] font-semibold tabular-nums">₹8,400</span>
                  </div>
                  <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D97706] h-full w-[26%]" />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#18231D] font-medium">Books, Stationery & Travel</span>
                    <span className="text-[#0A1713] font-semibold tabular-nums">₹7,150</span>
                  </div>
                  <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4F46E5] h-full w-[22%]" />
                  </div>
                  <p className="text-[11px] text-[#66716B] bg-[#FAFBF9] p-2.5 rounded-lg border border-[#EDF0EC]">
                    Flexible living is fully funded from income without dipping into revolving debt or emergency reserves.
                  </p>
                </div>
              )}

              {activeSimulationCategory === 'savings' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#18231D] font-medium">Monthly Unallocated Buffer</span>
                    <span className="text-[#176B4D] font-semibold tabular-nums">₹37,200</span>
                  </div>
                  <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#92E8B7] h-full w-[100%]" />
                  </div>
                  <p className="text-[11px] text-[#66716B] bg-[#FAFBF9] p-2.5 rounded-lg border border-[#EDF0EC]">
                    Every month provides ₹37,200 of headroom. Fermor channels this directly into your chosen savings goals.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Benefits 2 & 3: Two-Column Complementary Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 2: Connect today's decisions with future goals */}
            <div className="bg-[#FAFBF9] rounded-2xl border border-[#E2E7E0] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3 text-left">
                <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">
                  02 — Purposeful Alignment
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A1713] tracking-tight">
                  Connect today's decisions with future goals.
                </h3>
                <p className="text-sm text-[#66716B] leading-relaxed">
                  Saving in an abstract vacuum feels restrictive. When your unspent surplus is explicitly linked
                  to an upcoming retreat or a 6-month safety buffer, every deliberate choice feels rewarding.
                </p>
              </div>

              {/* Goal visual card */}
              <div className="bg-white p-4 rounded-xl border border-[#E2E7E0] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0A1713]">Himalayan Trek & Retreat</span>
                  <span className="text-[#176B4D] font-bold tabular-nums">70% reached</span>
                </div>
                <div className="w-full bg-[#EDF0EC] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#176B4D] h-full w-[70%]" />
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#66716B] tabular-nums">
                  <span>Saved: ₹42,000</span>
                  <span>Target: ₹60,000 (3 months left)</span>
                </div>
              </div>
            </div>

            {/* Benefit 3: Identify what deserves attention next */}
            <div className="bg-[#FAFBF9] rounded-2xl border border-[#E2E7E0] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3 text-left">
                <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">
                  03 — Signal Over Noise
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A1713] tracking-tight">
                  Identify what deserves attention next.
                </h3>
                <p className="text-sm text-[#66716B] leading-relaxed">
                  Instead of drowning you in daily push notifications, Fermor surfaces exactly 1 to 3 thoughtful
                  prompts when something actually shifts—like an unused tool renewing or a savings milestone reached.
                </p>
              </div>

              {/* Signal card */}
              <div className="bg-white p-4 rounded-xl border border-[#E2E7E0] space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#176B4D]" />
                  <span className="text-xs font-semibold text-[#0A1713]">Calm Focus Signal</span>
                  <span className="text-[11px] text-[#66716B] ml-auto">Quiet Priority</span>
                </div>
                <p className="text-xs text-[#18231D] font-medium">
                  3 quarterly subscriptions due in the next 14 days (₹4,650).
                </p>
                <p className="text-[11px] text-[#66716B]">
                  No panic alert. Just a gentle nudge to make sure each tool is still worth keeping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
