import React, { useState } from 'react';
import { formatINR, formatPercent } from '../utils/formatters';
import {
  CURRENT_OVERVIEW,
  SPENDING_CATEGORIES,
  SAVINGS_GOALS,
  RECENT_TRANSACTIONS,
  SAMPLE_MONTHLY_CASHFLOW,
} from '../data/mockData';
import { ArrowUpRight, ArrowDownLeft, ShieldCheck, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

interface FinancialDashboardProps {
  onOpenExplorerTab?: (tab: 'spending' | 'saving' | 'overview') => void;
  onOpenInsight?: () => void;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  onOpenExplorerTab,
  onOpenInsight,
}) => {
  const [activeView, setActiveView] = useState<'current' | 'trend'>('current');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const selectedCategory = SPENDING_CATEGORIES[selectedCategoryIndex];
  const primaryGoal = SAVINGS_GOALS[0]; // Emergency cushion
  const goalProgress = Math.round((primaryGoal.currentAmount / primaryGoal.targetAmount) * 100);

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#E2E7E0] shadow-[0_4px_24px_rgba(10,23,19,0.06)] overflow-hidden transition-all duration-300">
      {/* Dashboard Top Application Bar */}
      <div className="bg-[#FAFBF9] px-4 sm:px-6 py-3.5 border-b border-[#E2E7E0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#176B4D]" aria-hidden="true" />
          <span className="text-xs font-semibold text-[#18231D] tracking-wide uppercase">
            Personal Ledger
          </span>
          <span className="text-[#66716B] text-xs">/</span>
          <span className="text-xs text-[#66716B] font-medium">October 2026</span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-[#EDF0EC] rounded-lg text-xs font-medium text-[#66716B]">
          <button
            type="button"
            onClick={() => setActiveView('current')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeView === 'current'
                ? 'bg-white text-[#0A1713] shadow-xs font-semibold'
                : 'hover:text-[#0A1713]'
            }`}
          >
            October Flow
          </button>
          <button
            type="button"
            onClick={() => setActiveView('trend')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeView === 'trend'
                ? 'bg-white text-[#0A1713] shadow-xs font-semibold'
                : 'hover:text-[#0A1713]'
            }`}
          >
            6-Month Rhythm
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Cashflow Summary Card */}
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs font-medium text-[#66716B]">Monthly Net Surplus</span>
            <span className="text-xs font-semibold text-[#176B4D] bg-[#92E8B7]/25 px-2 py-0.5 rounded text-center">
              +{formatPercent(CURRENT_OVERVIEW.savingsRate)} saved
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A1713] tabular-nums">
              {formatINR(CURRENT_OVERVIEW.monthlySurplus)}
            </h3>
            <span className="text-xs text-[#66716B]">unallocated & growing</span>
          </div>

          {/* Income vs Expenses Ratio Strip */}
          <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-[#F0F2EF]">
            <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#EDF0EC]">
              <div className="flex items-center gap-1.5 text-xs text-[#66716B] mb-1">
                <ArrowDownLeft className="w-3.5 h-3.5 text-[#176B4D]" />
                <span>Monthly Income</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#0A1713] tabular-nums">
                {formatINR(CURRENT_OVERVIEW.monthlyIncome)}
              </p>
            </div>
            <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#EDF0EC]">
              <div className="flex items-center gap-1.5 text-xs text-[#66716B] mb-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#66716B]" />
                <span>Total Outflow</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#0A1713] tabular-nums">
                {formatINR(CURRENT_OVERVIEW.monthlyExpenses)}
              </p>
            </div>
          </div>
        </div>

        {/* View 1: Current Month Distribution */}
        {activeView === 'current' ? (
          <>
            {/* Visual Proportion Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#66716B]">
                <span>Spending by Allocation</span>
                <span className="font-medium text-[#18231D]">
                  {selectedCategory.name}: <strong className="text-[#0A1713] tabular-nums">{formatINR(selectedCategory.amount)}</strong> ({selectedCategory.percentage}%)
                </span>
              </div>

              {/* Multi-segment stacked bar */}
              <div className="h-3 w-full bg-[#EDF0EC] rounded-full overflow-hidden flex gap-0.5 p-0.5">
                {SPENDING_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    title={`${cat.name}: ${formatINR(cat.amount)}`}
                    onClick={() => setSelectedCategoryIndex(idx)}
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                    className={`h-full rounded-xs transition-opacity cursor-pointer ${
                      selectedCategoryIndex === idx ? 'opacity-100 ring-2 ring-offset-1 ring-[#0A1713]' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>

              {/* Category interactive chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SPENDING_CATEGORIES.slice(0, 5).map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryIndex(idx)}
                    className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                      selectedCategoryIndex === idx
                        ? 'border-[#176B4D] bg-[#176B4D]/10 text-[#0A1713] font-medium'
                        : 'border-[#E2E7E0] bg-[#FAFBF9] text-[#66716B] hover:text-[#18231D]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Savings Goal Card */}
            <div className="bg-[#F7F9F6] border border-[#E2E7E0] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#176B4D]/15 flex items-center justify-center text-[#176B4D]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0A1713]">
                      {primaryGoal.name}
                    </h4>
                    <span className="text-[11px] text-[#66716B]">
                      {primaryGoal.note}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#176B4D] tabular-nums">
                  {goalProgress}%
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-[#E2E7E0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#176B4D] h-full rounded-full transition-all duration-500"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#66716B] tabular-nums">
                <span>Current: <strong className="text-[#0A1713] font-semibold">{formatINR(primaryGoal.currentAmount)}</strong></span>
                <span>Target: {formatINR(primaryGoal.targetAmount)}</span>
              </div>
            </div>
          </>
        ) : (
          /* View 2: 6-Month Rhythmic History */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#66716B]">
              <span>6-Month Consistency</span>
              <span>Income vs Expenses</span>
            </div>

            <div className="space-y-2 pt-1">
              {SAMPLE_MONTHLY_CASHFLOW.map((item) => {
                const expensePercent = Math.round((item.expenses / item.income) * 100);
                return (
                  <div key={item.month} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#18231D]">{item.month} 2026</span>
                      <div className="flex items-center gap-2 text-[11px] text-[#66716B] tabular-nums">
                        <span>Spent: {formatINR(item.expenses)}</span>
                        <span>·</span>
                        <span className="text-[#176B4D] font-semibold">+{formatINR(item.savings)}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-[#EDF0EC] rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#176B4D]"
                        style={{ width: `${expensePercent}%` }}
                        title={`Expenses: ${expensePercent}%`}
                      />
                      <div
                        className="bg-[#92E8B7]"
                        style={{ width: `${100 - expensePercent}%` }}
                        title={`Savings: ${100 - expensePercent}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#66716B] pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#176B4D]" /> Outflow
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#92E8B7]" /> Net Saved
              </span>
            </div>
          </div>
        )}

        {/* Recent Activity List */}
        <div className="space-y-2 pt-2 border-t border-[#F0F2EF]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#18231D]">Recent Transactions</span>
            <button
              type="button"
              onClick={() => onOpenExplorerTab && onOpenExplorerTab('spending')}
              className="text-[#176B4D] hover:underline font-medium text-[11px] flex items-center gap-0.5"
            >
              <span>Explore all</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-[#F0F2EF] text-xs">
            {RECENT_TRANSACTIONS.slice(0, 3).map((tx) => (
              <div key={tx.id} className="py-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-[#0A1713] truncate">{tx.title}</p>
                  <p className="text-[11px] text-[#66716B]">{tx.date} · {tx.category}</p>
                </div>
                <span
                  className={`font-semibold tabular-nums whitespace-nowrap text-xs ${
                    tx.type === 'income' ? 'text-[#176B4D]' : 'text-[#0A1713]'
                  }`}
                >
                  {tx.type === 'income' ? `+${formatINR(tx.amount)}` : formatINR(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Financial Insight Bar */}
        <div
          onClick={onOpenInsight}
          className="bg-[#FAFBF9] hover:bg-[#F2F6F3] transition-colors border border-[#E2E7E0] rounded-xl p-3 flex items-start gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onOpenInsight?.();
            }
          }}
        >
          <div className="w-5 h-5 rounded-md bg-[#92E8B7]/30 flex items-center justify-center text-[#176B4D] shrink-0 mt-0.5">
            <Sparkles className="w-3 h-3" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#0A1713] group-hover:text-[#176B4D] transition-colors">
              Mindful Observation
            </p>
            <p className="text-[11px] text-[#66716B] line-clamp-2 mt-0.5">
              Dining was ₹2,100 above your 3-month trailing benchmark. Click to view detailed review.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#66716B] group-hover:text-[#176B4D] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
        </div>
      </div>

      {/* Honest Footer Status Bar */}
      <div className="bg-[#F7F7F1] px-4 py-2 border-t border-[#E2E7E0] flex items-center justify-between text-[11px] text-[#66716B]">
        <span>Simulated ledger · Updated today</span>
        <span>Zero bank credentials required</span>
      </div>
    </div>
  );
};
