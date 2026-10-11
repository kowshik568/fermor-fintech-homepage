import React, { useState, useEffect, useId } from 'react';
import { X, Check, ArrowRight, ShieldCheck, RefreshCw, Sparkles, Compass } from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

interface OnboardingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const OnboardingDialog: React.FC<OnboardingDialogProps> = ({
  isOpen,
  onClose,
  onFinish,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('cushion');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(112000);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(18000);
  const [reviewRhythm, setReviewRhythm] = useState<'monthly' | 'biweekly'>('monthly');
  const [inputError, setInputError] = useState<string | null>(null);

  const incomeInputId = useId();
  const targetInputId = useId();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2Next = () => {
    if (monthlyIncome <= 0) {
      setInputError('Please enter a valid monthly take-home income.');
      return;
    }
    if (monthlyTarget >= monthlyIncome) {
      setInputError('Monthly savings target cannot exceed your total income.');
      return;
    }
    setInputError(null);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedGoal('cushion');
    setMonthlyIncome(112000);
    setMonthlyTarget(18000);
    setReviewRhythm('monthly');
    setInputError(null);
  };

  const goals = [
    {
      id: 'flow',
      title: 'Understand my real spending flow',
      desc: 'See where cash travels each month without tedious line-item guilt.',
    },
    {
      id: 'cushion',
      title: 'Build a solid emergency cushion',
      desc: 'Lock in 3 to 6 months of essential living expenses for true peace of mind.',
    },
    {
      id: 'dream',
      title: 'Fund a meaningful personal milestone',
      desc: 'Plan a retreat, career transition, or long-desired creative purchase.',
    },
    {
      id: 'peace',
      title: 'Cultivate general financial composure',
      desc: 'Replace chaotic last-minute reconciliations with a predictable rhythm.',
    },
  ];

  const safeMonthlySpend = Math.max(0, monthlyIncome - monthlyTarget);
  const targetSavingsRate =
    monthlyIncome > 0 ? Math.round((monthlyTarget / monthlyIncome) * 1000) / 10 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1713]/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div
        className="w-full max-w-xl bg-[#FFFFFF] rounded-2xl border border-[#E2E7E0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#FAFBF9] px-6 py-4 border-b border-[#E2E7E0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#176B4D]"
            >
              <rect x="2" y="2" width="24" height="24" rx="6" stroke="#176B4D" strokeWidth="2.2" />
              <circle cx="10" cy="14" r="3.2" fill="#176B4D" />
              <path d="M14 8L20 14L14 20" stroke="#92E8B7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-bold text-[#0A1713] tracking-tight uppercase">
              Fermor Onboarding Walkthrough
            </span>
            <span className="text-xs text-[#66716B]">· Step {step} of 3</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#66716B] hover:text-[#0A1713] hover:bg-black/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">
                  Phase 1: Intention
                </span>
                <h3 id="onboarding-title" className="text-2xl font-bold text-[#0A1713] mt-1">
                  What is your primary financial focus?
                </h3>
                <p className="text-sm text-[#66716B] mt-1.5">
                  Fermor tunes its visual hierarchy around your core priority. Choose what matters most today:
                </p>
              </div>

              <div className="space-y-2.5">
                {goals.map((g) => {
                  const isSelected = selectedGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGoal(g.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-[#176B4D] bg-[#176B4D]/5 ring-1 ring-[#176B4D]'
                          : 'border-[#E2E7E0] bg-[#FAFBF9] hover:bg-[#F2F6F3]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-[#176B4D] bg-[#176B4D] text-white'
                            : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#0A1713]">
                          {g.title}
                        </h4>
                        <p className="text-xs text-[#66716B] mt-0.5">
                          {g.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">
                  Phase 2: Rhythm & Figures
                </span>
                <h3 className="text-2xl font-bold text-[#0A1713] mt-1">
                  Establish your baseline targets.
                </h3>
                <p className="text-sm text-[#66716B] mt-1.5">
                  Enter approximate monthly numbers. These are processed strictly inside your current browser session.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor={incomeInputId} className="block text-xs font-semibold text-[#18231D] mb-1.5">
                    Monthly Take-Home Inflow (₹)
                  </label>
                  <input
                    id={incomeInputId}
                    type="number"
                    step="5000"
                    min="10000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#E2E7E0] rounded-xl text-[#0A1713] font-semibold tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B4D]"
                  />
                  <span className="text-[11px] text-[#66716B] mt-1 block">
                    Formatted: {formatINR(monthlyIncome)}
                  </span>
                </div>

                <div>
                  <label htmlFor={targetInputId} className="block text-xs font-semibold text-[#18231D] mb-1.5">
                    Desired Monthly Savings Target (₹)
                  </label>
                  <input
                    id={targetInputId}
                    type="number"
                    step="1000"
                    min="0"
                    value={monthlyTarget}
                    onChange={(e) => setMonthlyTarget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#E2E7E0] rounded-xl text-[#0A1713] font-semibold tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B4D]"
                  />
                  <span className="text-[11px] text-[#66716B] mt-1 block">
                    Formatted: {formatINR(monthlyTarget)} ({targetSavingsRate}% savings rate)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18231D] mb-1.5">
                    Review Cadence
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setReviewRhythm('monthly')}
                      className={`p-3 rounded-xl border text-left text-xs ${
                        reviewRhythm === 'monthly'
                          ? 'border-[#176B4D] bg-[#176B4D]/5 text-[#0A1713] font-semibold'
                          : 'border-[#E2E7E0] bg-[#FAFBF9] text-[#66716B]'
                      }`}
                    >
                      <span className="font-semibold block text-[#0A1713]">Monthly (Recommended)</span>
                      <span className="text-[11px] text-[#66716B]">One calm look at month's end</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewRhythm('biweekly')}
                      className={`p-3 rounded-xl border text-left text-xs ${
                        reviewRhythm === 'biweekly'
                          ? 'border-[#176B4D] bg-[#176B4D]/5 text-[#0A1713] font-semibold'
                          : 'border-[#E2E7E0] bg-[#FAFBF9] text-[#66716B]'
                      }`}
                    >
                      <span className="font-semibold block text-[#0A1713]">Bi-weekly check</span>
                      <span className="text-[11px] text-[#66716B]">Mid-month pulse check</span>
                    </button>
                  </div>
                </div>

                {inputError && (
                  <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                    {inputError}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#66716B] hover:text-[#0A1713]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Build My Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">
                  Phase 3: Confirmation
                </span>
                <h3 className="text-2xl font-bold text-[#0A1713] mt-1">
                  Your customized Fermor blueprint.
                </h3>
                <p className="text-sm text-[#66716B] mt-1.5">
                  Here is your personalized monthly structure based on your selections:
                </p>
              </div>

              {/* Blueprint Summary Card */}
              <div className="bg-[#FAFBF9] rounded-2xl border border-[#E2E7E0] p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#EDF0EC]">
                  <div>
                    <span className="text-[11px] text-[#66716B] block">Safe Living Budget</span>
                    <span className="text-lg font-bold text-[#0A1713] tabular-nums">
                      {formatINR(safeMonthlySpend)} / mo
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#66716B] block">Dedicated Savings Growth</span>
                    <span className="text-lg font-bold text-[#176B4D] tabular-nums">
                      {formatINR(monthlyTarget)} / mo
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#66716B]">Primary Focus:</span>
                    <span className="font-semibold text-[#0A1713]">
                      {goals.find((g) => g.id === selectedGoal)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66716B]">Projected Savings Rate:</span>
                    <span className="font-semibold text-[#176B4D] tabular-nums">
                      {formatPercent(targetSavingsRate)} of income
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66716B]">Review Frequency:</span>
                    <span className="font-semibold text-[#0A1713] capitalize">
                      {reviewRhythm} check-in
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EDF0EC] flex items-start gap-2.5 text-xs text-[#66716B]">
                  <ShieldCheck className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                  <p>
                    This blueprint is active in your current browser session. No data was transmitted or saved to an external server.
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#66716B] hover:text-[#0A1713] flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Start over</span>
                </button>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#18231D] hover:bg-black/5 rounded-xl border border-[#E2E7E0]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onFinish();
                      onClose();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-xl transition-colors"
                  >
                    Explore Dashboard with Blueprint
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
