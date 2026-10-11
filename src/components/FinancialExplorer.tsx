import React, { useState } from 'react';
import {
  SPENDING_CATEGORIES,
  SAVINGS_GOALS,
  CURRENT_OVERVIEW,
  SAMPLE_MONTHLY_CASHFLOW,
} from '../data/mockData';
import { formatINR, formatPercent } from '../utils/formatters';
import {
  PieChart,
  PiggyBank,
  BarChart3,
  CheckCircle2,
  Sliders,
  TrendingDown,
  Info,
  Calendar,
} from 'lucide-react';

interface FinancialExplorerProps {
  initialTab?: 'spending' | 'saving' | 'overview';
}

export const FinancialExplorer: React.FC<FinancialExplorerProps> = ({
  initialTab = 'spending',
}) => {
  const [activeTab, setActiveTab] = useState<'spending' | 'saving' | 'overview'>(initialTab);

  // Tab 1: Spending State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(SPENDING_CATEGORIES[0].id);
  const [spendingAdjustPercent, setSpendingAdjustPercent] = useState<number>(0); // -30% to +30%

  // Tab 2: Saving State
  const [selectedGoalId, setSelectedGoalId] = useState<string>(SAVINGS_GOALS[0].id);
  const [customMonthlySavings, setCustomMonthlySavings] = useState<number>(15000);

  // Tab 3: Monthly Overview State
  const [simulatedIncome, setSimulatedIncome] = useState<number>(CURRENT_OVERVIEW.monthlyIncome);
  const [simulatedExpenses, setSimulatedExpenses] = useState<number>(CURRENT_OVERVIEW.monthlyExpenses);

  // Calculations for Spending tab
  const activeCategory =
    SPENDING_CATEGORIES.find((c) => c.id === selectedCategoryId) || SPENDING_CATEGORIES[0];
  const adjustedCategoryAmount = Math.max(
    0,
    Math.round(activeCategory.amount * (1 + spendingAdjustPercent / 100))
  );
  const differenceAmount = adjustedCategoryAmount - activeCategory.amount;
  const simulatedTotalExpenses = CURRENT_OVERVIEW.monthlyExpenses + differenceAmount;
  const simulatedMonthlySurplus = CURRENT_OVERVIEW.monthlyIncome - simulatedTotalExpenses;

  // Calculations for Saving tab
  const activeGoal = SAVINGS_GOALS.find((g) => g.id === selectedGoalId) || SAVINGS_GOALS[0];
  const remainingGoalAmount = Math.max(0, activeGoal.targetAmount - activeGoal.currentAmount);
  const calculatedMonths =
    customMonthlySavings > 0
      ? Math.ceil(remainingGoalAmount / customMonthlySavings)
      : Infinity;
  const goalProgressPercent = Math.min(
    100,
    Math.round((activeGoal.currentAmount / activeGoal.targetAmount) * 100)
  );

  // Calculations for Overview tab
  const netOverviewSurplus = simulatedIncome - simulatedExpenses;
  const overviewSavingsRate =
    simulatedIncome > 0
      ? Math.max(0, Math.round(((simulatedIncome - simulatedExpenses) / simulatedIncome) * 1000) / 10)
      : 0;

  return (
    <section id="how-it-works-preview" className="py-20 sm:py-28 bg-[#F7F7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B4D]">
            <span>Interactive Simulator</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66716B] font-normal normal-case">Try the interface</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1713]">
            Your money, at a glance.
          </h2>

          <p className="text-base text-[#66716B] leading-relaxed">
            Interact with actual sample ledgers below. Switch views, adjust monthly parameters,
            and observe how small behavioral tweaks ripple through your overall financial health.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="bg-[#FFFFFF] border border-[#E2E7E0] rounded-2xl shadow-sm p-3 sm:p-4 mb-8">
          <div className="flex flex-wrap sm:flex-nowrap gap-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'spending'}
              onClick={() => setActiveTab('spending')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'spending'
                  ? 'bg-[#0A1713] text-white shadow-xs'
                  : 'bg-[#FAFBF9] text-[#66716B] hover:text-[#0A1713] hover:bg-[#F0F2EF]'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>1. Spending Flow</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'saving'}
              onClick={() => setActiveTab('saving')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'saving'
                  ? 'bg-[#0A1713] text-white shadow-xs'
                  : 'bg-[#FAFBF9] text-[#66716B] hover:text-[#0A1713] hover:bg-[#F0F2EF]'
              }`}
            >
              <PiggyBank className="w-4 h-4" />
              <span>2. Savings Progress</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#0A1713] text-white shadow-xs'
                  : 'bg-[#FAFBF9] text-[#66716B] hover:text-[#0A1713] hover:bg-[#F0F2EF]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>3. Monthly Cash Flow</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="bg-[#FFFFFF] border border-[#E2E7E0] rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 transition-all">
          {/* ================= VIEW 1: SPENDING ================= */}
          {activeTab === 'spending' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F2EF] pb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0A1713]">
                    Categorized Outflows
                  </h3>
                  <p className="text-sm text-[#66716B] mt-1">
                    Select any category to inspect its share, typical items, and impact on monthly surplus.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#66716B]">Monthly Total Outflow</span>
                  <p className="text-2xl font-bold text-[#0A1713] tabular-nums">
                    {formatINR(simulatedTotalExpenses)}
                  </p>
                </div>
              </div>

              {/* Category Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {SPENDING_CATEGORIES.map((cat) => {
                  const isSelected = cat.id === selectedCategoryId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        setSpendingAdjustPercent(0);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#176B4D] bg-[#176B4D]/5 ring-1 ring-[#176B4D]'
                          : 'border-[#E2E7E0] bg-[#FAFBF9] hover:bg-[#F2F6F3] text-[#66716B]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-xs font-semibold text-[#0A1713] truncate">
                          {cat.name.split(' ')[0]}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#0A1713] tabular-nums block">
                          {formatINR(cat.amount)}
                        </span>
                        <span className="text-[11px] text-[#66716B] tabular-nums">
                          {cat.percentage}% share
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Category Spotlight */}
              <div className="bg-[#FAFBF9] rounded-xl border border-[#E2E7E0] p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: activeCategory.color }}
                    />
                    <h4 className="text-lg font-bold text-[#0A1713]">
                      {activeCategory.name}
                    </h4>
                    <span className="text-xs bg-white border border-[#E2E7E0] px-2 py-0.5 rounded text-[#66716B]">
                      {activeCategory.percentage}% of expenses
                    </span>
                  </div>

                  <p className="text-sm text-[#66716B] leading-relaxed">
                    {activeCategory.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-semibold text-[#18231D] block mb-1.5">
                      Frequent sample entries:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory.sampleItems.map((item) => (
                        <span
                          key={item}
                          className="text-xs bg-white border border-[#E2E7E0] text-[#18231D] px-2.5 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Category Adjustment Simulation */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#E2E7E0] space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A1713]">
                      <Sliders className="w-3.5 h-3.5 text-[#176B4D]" />
                      <span>Simulate Optimization</span>
                    </div>
                    <span className="text-xs font-bold text-[#176B4D] tabular-nums">
                      {spendingAdjustPercent > 0 ? `+${spendingAdjustPercent}%` : `${spendingAdjustPercent}%`}
                    </span>
                  </div>

                  <div>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      step="5"
                      value={spendingAdjustPercent}
                      onChange={(e) => setSpendingAdjustPercent(Number(e.target.value))}
                      className="w-full cursor-pointer"
                      aria-label="Adjust spending percentage"
                    />
                    <div className="flex justify-between text-[11px] text-[#66716B] mt-1">
                      <span>-30% trim</span>
                      <span>Baseline</span>
                      <span>+30% expand</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F0F2EF] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#66716B]">Simulated Category Spend:</span>
                      <span className="font-bold text-[#0A1713] tabular-nums">
                        {formatINR(adjustedCategoryAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#66716B]">Change in Monthly Net Surplus:</span>
                      <span
                        className={`font-bold tabular-nums ${
                          differenceAmount <= 0 ? 'text-[#176B4D]' : 'text-amber-700'
                        }`}
                      >
                        {differenceAmount <= 0
                          ? `+${formatINR(Math.abs(differenceAmount))} gained`
                          : `-${formatINR(differenceAmount)} reduced`}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-[#66716B]">New Total Monthly Surplus:</span>
                      <span className="text-[#0A1713] font-bold tabular-nums">
                        {formatINR(simulatedMonthlySurplus)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: SAVING ================= */}
          {activeTab === 'saving' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F2EF] pb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0A1713]">
                    Goal Progress & Velocity
                  </h3>
                  <p className="text-sm text-[#66716B] mt-1">
                    Connect surplus capital with tangible life targets. Adjust your monthly pace to see timeline outcomes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#66716B]">3 Active Goals Tracked</span>
                </div>
              </div>

              {/* Goal Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SAVINGS_GOALS.map((goal) => {
                  const isSelected = goal.id === selectedGoalId;
                  const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => {
                        setSelectedGoalId(goal.id);
                        setCustomMonthlySavings(goal.monthlyContribution);
                      }}
                      className={`p-5 rounded-xl text-left border transition-all space-y-3 ${
                        isSelected
                          ? 'border-[#176B4D] bg-[#176B4D]/5 ring-1 ring-[#176B4D]'
                          : 'border-[#E2E7E0] bg-[#FAFBF9] hover:bg-[#F2F6F3]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-[#176B4D] uppercase">
                          {goal.category}
                        </span>
                        <span className="text-xs font-bold text-[#0A1713] tabular-nums">
                          {progress}%
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0A1713]">
                        {goal.name}
                      </h4>
                      <div className="w-full bg-[#E2E7E0] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#176B4D] h-full rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-[#66716B] tabular-nums">
                        <span>{formatINR(goal.currentAmount)}</span>
                        <span>{formatINR(goal.targetAmount)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Goal Calculation Engine */}
              <div className="bg-[#FAFBF9] rounded-xl border border-[#E2E7E0] p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <h4 className="text-lg font-bold text-[#0A1713]">
                      {activeGoal.name}
                    </h4>
                    <p className="text-xs text-[#66716B] mt-1">
                      {activeGoal.note}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-[#18231D]">
                      <span>Monthly Contribution Allocation</span>
                      <span className="text-[#176B4D] font-bold tabular-nums">
                        {formatINR(customMonthlySavings)} / month
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="35000"
                      step="1000"
                      value={customMonthlySavings}
                      onChange={(e) => setCustomMonthlySavings(Number(e.target.value))}
                      className="w-full cursor-pointer"
                      aria-label="Set monthly contribution amount"
                    />
                    <div className="flex justify-between text-[11px] text-[#66716B]">
                      <span>₹2,000 / mo</span>
                      <span>₹15,000 / mo</span>
                      <span>₹35,000 / mo</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3 rounded-lg border border-[#EDF0EC]">
                      <span className="text-[11px] text-[#66716B] block">Already Saved</span>
                      <span className="text-sm font-bold text-[#0A1713] tabular-nums">
                        {formatINR(activeGoal.currentAmount)}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#EDF0EC]">
                      <span className="text-[11px] text-[#66716B] block">Remaining Distance</span>
                      <span className="text-sm font-bold text-[#176B4D] tabular-nums">
                        {formatINR(remainingGoalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Outcome Projection Card */}
                <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#E2E7E0] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176B4D]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Calculated Projection</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-[#66716B]">Time to completion at this pace:</span>
                    <p className="text-3xl font-bold text-[#0A1713] tabular-nums">
                      {isFinite(calculatedMonths) ? `${calculatedMonths} Months` : 'Paused'}
                    </p>
                  </div>

                  <p className="text-xs text-[#66716B] leading-relaxed">
                    By committing <strong className="text-[#0A1713]">{formatINR(customMonthlySavings)}</strong> every month from your net surplus, this goal will be 100% funded in roughly{' '}
                    <strong className="text-[#0A1713]">
                      {calculatedMonths < 12
                        ? `${calculatedMonths} months`
                        : `${(calculatedMonths / 12).toFixed(1)} years`}
                    </strong>.
                  </p>

                  <div className="p-3 bg-[#FAFBF9] rounded-lg border border-[#EDF0EC] text-xs text-[#66716B] space-y-1">
                    <div className="flex justify-between">
                      <span>Daily equivalent savings habit:</span>
                      <span className="font-semibold text-[#0A1713] tabular-nums">
                        ~{formatINR(Math.round(customMonthlySavings / 30))} / day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Percent of monthly surplus used:</span>
                      <span className="font-semibold text-[#176B4D] tabular-nums">
                        {formatPercent((customMonthlySavings / CURRENT_OVERVIEW.monthlySurplus) * 100)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: MONTHLY OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F2EF] pb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0A1713]">
                    Monthly Balance Sheet
                  </h3>
                  <p className="text-sm text-[#66716B] mt-1">
                    Mathematically unified view of total inflows, total outflows, and liquid margin.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSimulatedIncome(CURRENT_OVERVIEW.monthlyIncome);
                      setSimulatedExpenses(CURRENT_OVERVIEW.monthlyExpenses);
                    }}
                    className="text-xs text-[#176B4D] hover:underline font-semibold"
                  >
                    Reset to baseline
                  </button>
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E2E7E0] space-y-1">
                  <span className="text-xs text-[#66716B] font-medium">Monthly Inflow (Income)</span>
                  <p className="text-2xl font-bold text-[#0A1713] tabular-nums">
                    {formatINR(simulatedIncome)}
                  </p>
                  <span className="text-[11px] text-[#66716B] block">Primary salary + consulting</span>
                </div>

                <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E2E7E0] space-y-1">
                  <span className="text-xs text-[#66716B] font-medium">Monthly Outflow (Expenses)</span>
                  <p className="text-2xl font-bold text-[#0A1713] tabular-nums">
                    {formatINR(simulatedExpenses)}
                  </p>
                  <span className="text-[11px] text-[#66716B] block">Fixed essentials + living</span>
                </div>

                <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E2E7E0] space-y-1">
                  <span className="text-xs text-[#66716B] font-medium">Unallocated Surplus</span>
                  <p className="text-2xl font-bold text-[#176B4D] tabular-nums">
                    {formatINR(netOverviewSurplus)}
                  </p>
                  <span className="text-[11px] text-[#176B4D] font-medium block">
                    {overviewSavingsRate}% retained margin
                  </span>
                </div>
              </div>

              {/* Interactive Scenario Controls */}
              <div className="bg-[#FAFBF9] p-6 rounded-xl border border-[#E2E7E0] space-y-6">
                <h4 className="text-sm font-bold text-[#0A1713]">
                  Test What-If Scenarios
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Income Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#18231D] font-medium">Adjust Monthly Income</span>
                      <span className="text-[#0A1713] font-bold tabular-nums">
                        {formatINR(simulatedIncome)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="75000"
                      max="180000"
                      step="5000"
                      value={simulatedIncome}
                      onChange={(e) => setSimulatedIncome(Number(e.target.value))}
                      className="w-full cursor-pointer"
                      aria-label="Adjust monthly income"
                    />
                    <div className="flex justify-between text-[11px] text-[#66716B]">
                      <span>₹75,000</span>
                      <span>Baseline: ₹1,12,000</span>
                      <span>₹1,80,000</span>
                    </div>
                  </div>

                  {/* Expense Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#18231D] font-medium">Adjust Monthly Outflows</span>
                      <span className="text-[#0A1713] font-bold tabular-nums">
                        {formatINR(simulatedExpenses)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="40000"
                      max="110000"
                      step="2000"
                      value={simulatedExpenses}
                      onChange={(e) => setSimulatedExpenses(Number(e.target.value))}
                      className="w-full cursor-pointer"
                      aria-label="Adjust monthly expenses"
                    />
                    <div className="flex justify-between text-[11px] text-[#66716B]">
                      <span>₹40,000</span>
                      <span>Baseline: ₹74,800</span>
                      <span>₹1,10,000</span>
                    </div>
                  </div>
                </div>

                {/* Mathematical Visual Comparison Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-[#66716B]">
                    <span>Inflow vs Outflow Proportion</span>
                    <span className="tabular-nums">
                      {Math.min(100, Math.round((simulatedExpenses / simulatedIncome) * 100))}% absorbed
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#EDF0EC] rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#176B4D]"
                      style={{
                        width: `${Math.min(100, Math.round((simulatedExpenses / simulatedIncome) * 100))}%`,
                      }}
                      title="Outflow"
                    />
                    <div
                      className="bg-[#92E8B7]"
                      style={{
                        width: `${Math.max(0, 100 - Math.round((simulatedExpenses / simulatedIncome) * 100))}%`,
                      }}
                      title="Surplus"
                    />
                  </div>
                  <div className="flex items-center gap-6 text-[11px] text-[#66716B] pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#176B4D]" /> Outflows ({formatINR(simulatedExpenses)})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#92E8B7]" /> Free Buffer ({formatINR(Math.max(0, netOverviewSurplus))})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#66716B] px-2">
          <span>All sample figures are illustrative and calculated locally in your browser.</span>
          <span>Zero third-party tracking</span>
        </div>
      </div>
    </section>
  );
};
