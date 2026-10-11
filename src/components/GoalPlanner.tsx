import React, { useState, useId } from 'react';
import { formatINR, formatPercent } from '../utils/formatters';
import { Target, Calendar, Check, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

interface GoalPlannerProps {
  onOpenOnboarding: () => void;
}

export const GoalPlanner: React.FC<GoalPlannerProps> = ({ onOpenOnboarding }) => {
  const targetInputId = useId();
  const currentInputId = useId();
  const monthlyInputId = useId();

  // State
  const [goalName, setGoalName] = useState('Emergency Cushion');
  const [targetAmount, setTargetAmount] = useState<number>(300000);
  const [currentAmount, setCurrentAmount] = useState<number>(195000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(15000);

  // Sanitized calculations
  const sanitizedTarget = Math.max(1000, Number(targetAmount) || 0);
  const sanitizedCurrent = Math.max(0, Number(currentAmount) || 0);
  const sanitizedMonthly = Math.max(0, Number(monthlyContribution) || 0);

  const remainingAmount = Math.max(0, sanitizedTarget - sanitizedCurrent);
  const isGoalAchieved = sanitizedCurrent >= sanitizedTarget;

  const monthsRemaining =
    isGoalAchieved
      ? 0
      : sanitizedMonthly > 0
      ? Math.ceil(remainingAmount / sanitizedMonthly)
      : Infinity;

  const progressPercentage = Math.min(
    100,
    Math.round((sanitizedCurrent / sanitizedTarget) * 100)
  );

  // Calculate estimated completion month and year
  const getProjectedDateString = (months: number) => {
    if (months === 0) return 'Fully Funded';
    if (!isFinite(months)) return 'Indefinite';

    const now = new Date();
    const future = new Date(now.getFullYear(), now.getMonth() + months, 1);
    return future.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  const setPreset = (name: string, target: number, current: number, monthly: number) => {
    setGoalName(name);
    setTargetAmount(target);
    setCurrentAmount(current);
    setMonthlyContribution(monthly);
  };

  return (
    <section id="goal-planner" className="py-20 sm:py-28 bg-[#F7F7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl text-left mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B4D]">
            <span>Goal Architecture</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66716B] font-normal normal-case">Disciplined projection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1713] text-balance">
            An interactive savings planner.
          </h2>

          <p className="text-base text-[#66716B] leading-relaxed text-pretty">
            Model how small, steady contributions translate into tangible financial safety and milestones.
            No speculative return assumptions or gimmicks—just clear, grounded arithmetic.
          </p>
        </div>

        {/* Planner Workspace */}
        <div className="bg-[#FFFFFF] border border-[#E2E7E0] rounded-2xl shadow-sm overflow-hidden p-6 sm:p-10">
          {/* Preset Buttons */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#18231D] mr-2">Try sample scenarios:</span>
            <button
              type="button"
              onClick={() => setPreset('Emergency Cushion', 300000, 195000, 15000)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                goalName === 'Emergency Cushion'
                  ? 'bg-[#176B4D] text-white border-[#176B4D]'
                  : 'bg-[#FAFBF9] border-[#E2E7E0] text-[#66716B] hover:text-[#0A1713]'
              }`}
            >
              Emergency Cushion (₹3.0L)
            </button>
            <button
              type="button"
              onClick={() => setPreset('Himalayan Trek & Retreat', 60000, 42000, 6000)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                goalName === 'Himalayan Trek & Retreat'
                  ? 'bg-[#176B4D] text-white border-[#176B4D]'
                  : 'bg-[#FAFBF9] border-[#E2E7E0] text-[#66716B] hover:text-[#0A1713]'
              }`}
            >
              Himalayan Trek (₹60k)
            </button>
            <button
              type="button"
              onClick={() => setPreset('Ergonomic Studio Setup', 120000, 72000, 8000)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                goalName === 'Ergonomic Studio Setup'
                  ? 'bg-[#176B4D] text-white border-[#176B4D]'
                  : 'bg-[#FAFBF9] border-[#E2E7E0] text-[#66716B] hover:text-[#0A1713]'
              }`}
            >
              Ergonomic Studio (₹1.2L)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Target Name */}
              <div>
                <label className="block text-xs font-semibold text-[#18231D] mb-1.5">
                  Goal Name
                </label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#E2E7E0] rounded-xl text-[#0A1713] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B4D]"
                  placeholder="e.g. Relocation Fund"
                />
              </div>

              {/* Target & Current Amount Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={targetInputId} className="block text-xs font-semibold text-[#18231D] mb-1.5">
                    Target Amount (₹)
                  </label>
                  <input
                    id={targetInputId}
                    type="number"
                    min="1000"
                    step="5000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#E2E7E0] rounded-xl text-[#0A1713] font-semibold tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B4D]"
                  />
                  <span className="text-[11px] text-[#66716B] mt-1 block">
                    Formatted: {formatINR(sanitizedTarget)}
                  </span>
                </div>

                <div>
                  <label htmlFor={currentInputId} className="block text-xs font-semibold text-[#18231D] mb-1.5">
                    Already Saved (₹)
                  </label>
                  <input
                    id={currentInputId}
                    type="number"
                    min="0"
                    step="5000"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#E2E7E0] rounded-xl text-[#0A1713] font-semibold tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B4D]"
                  />
                  <span className="text-[11px] text-[#66716B] mt-1 block">
                    Formatted: {formatINR(sanitizedCurrent)}
                  </span>
                </div>
              </div>

              {/* Monthly Contribution Slider & Input */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={monthlyInputId} className="text-xs font-semibold text-[#18231D]">
                    Monthly Contribution
                  </label>
                  <span className="text-sm font-bold text-[#176B4D] tabular-nums">
                    {formatINR(sanitizedMonthly)} / month
                  </span>
                </div>

                <input
                  id={monthlyInputId}
                  type="range"
                  min="0"
                  max="40000"
                  step="1000"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full cursor-pointer"
                  aria-label="Adjust monthly savings contribution"
                />

                <div className="flex justify-between text-[11px] text-[#66716B]">
                  <span>₹0 / mo (Paused)</span>
                  <span>₹20,000 / mo</span>
                  <span>₹40,000 / mo</span>
                </div>
              </div>

              {/* Habit Perspective Box */}
              <div className="p-4 bg-[#FAFBF9] rounded-xl border border-[#EDF0EC] text-xs text-[#66716B] space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#18231D]">
                  <Sparkles className="w-3.5 h-3.5 text-[#176B4D]" />
                  <span>The Quiet Habit Math</span>
                </div>
                <p>
                  At <strong className="text-[#0A1713]">{formatINR(sanitizedMonthly)}/month</strong>, you are setting aside roughly <strong className="text-[#0A1713]">~{formatINR(Math.round(sanitizedMonthly / 30))} each day</strong>. Consistency outperforms sporadic windfalls.
                </p>
              </div>
            </div>

            {/* Right Projection Card Column */}
            <div className="lg:col-span-5 bg-[#FAFBF9] rounded-xl border border-[#E2E7E0] p-6 sm:p-8 space-y-6 text-left">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#176B4D]">
                    Projection Outcome
                  </span>
                  <span className="text-xs font-bold text-[#0A1713] tabular-nums">
                    {progressPercentage}% funded
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0A1713]">
                  {goalName}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-[#E2E7E0] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#176B4D] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#66716B] tabular-nums">
                  <span>Saved: {formatINR(sanitizedCurrent)}</span>
                  <span>Target: {formatINR(sanitizedTarget)}</span>
                </div>
              </div>

              {/* Key Calculations Table */}
              <div className="bg-white rounded-xl border border-[#EDF0EC] p-4 divide-y divide-[#F0F2EF] text-xs">
                <div className="py-2 first:pt-0 flex justify-between items-center">
                  <span className="text-[#66716B]">Remaining to fund:</span>
                  <span className="font-bold text-[#0A1713] tabular-nums">
                    {formatINR(remainingAmount)}
                  </span>
                </div>

                <div className="py-2 flex justify-between items-center">
                  <span className="text-[#66716B]">Estimated duration:</span>
                  <span className="font-bold text-[#176B4D] tabular-nums text-sm">
                    {isGoalAchieved
                      ? 'Goal Complete!'
                      : !isFinite(monthsRemaining)
                      ? 'Paused'
                      : `${monthsRemaining} Months`}
                  </span>
                </div>

                <div className="py-2 last:pb-0 flex justify-between items-center">
                  <span className="text-[#66716B]">Estimated completion:</span>
                  <span className="font-semibold text-[#0A1713]">
                    {getProjectedDateString(monthsRemaining)}
                  </span>
                </div>
              </div>

              {/* Action Call */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenOnboarding}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Build This Goal in Fermor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
