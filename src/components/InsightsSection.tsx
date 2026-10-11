import React, { useState } from 'react';
import { FINANCIAL_INSIGHTS } from '../data/mockData';
import { FinancialInsight } from '../types';
import { Sparkles, ArrowRight, TrendingUp, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface InsightsSectionProps {
  onSelectInsight: (insight: FinancialInsight) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  onSelectInsight,
  onNavigateToSection,
}) => {
  return (
    <section id="insights" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E2E7E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B4D]">
            <span>Quiet Intelligence</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66716B] font-normal normal-case">Contextual awareness</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1713] text-balance">
            Insights that lead to action.
          </h2>

          <p className="text-base text-[#66716B] leading-relaxed text-pretty">
            Fermor silently scans your ledgers to highlight meaningful changes—not to trigger panic,
            but to hand you calm, contextual clarity before little decisions compound.
          </p>
        </div>

        {/* 3 Believable Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FINANCIAL_INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className="bg-[#FAFBF9] rounded-2xl border border-[#E2E7E0] hover:border-[#176B4D]/50 transition-all duration-200 p-6 flex flex-col justify-between space-y-6 group hover:shadow-sm text-left"
            >
              <div className="space-y-4">
                {/* Header Tag and Metric */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">
                    {insight.category === 'spending' && 'Outflow Notice'}
                    {insight.category === 'saving' && 'Goal Milestone'}
                    {insight.category === 'recurring' && 'Subscription Audit'}
                  </span>
                  <span className="text-xs font-bold text-[#0A1713] bg-white border border-[#E2E7E0] px-2.5 py-1 rounded-md tabular-nums">
                    {insight.highlightNumber}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-[#0A1713] group-hover:text-[#176B4D] transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-[#66716B] mt-0.5">
                    {insight.subtitle}
                  </p>
                </div>

                {/* Narrative Explanation */}
                <p className="text-xs sm:text-sm text-[#66716B] leading-relaxed">
                  {insight.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#EDF0EC]">
                <button
                  type="button"
                  onClick={() => onSelectInsight(insight)}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold text-[#0A1713] group-hover:text-[#176B4D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D] rounded-md px-1"
                >
                  <span>{insight.actionLabel}</span>
                  <ArrowRight className="w-4 h-4 text-[#176B4D] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Editorial Footnote */}
        <div className="mt-12 bg-[#FAFBF9] rounded-xl border border-[#E2E7E0] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#66716B]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#176B4D]" />
            <span className="text-[#18231D] font-medium">Calm Communication Guarantee:</span>
            <span>Zero push notifications, zero emotional manipulation, zero sponsored financial products.</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToSection('goal-planner')}
            className="text-[#176B4D] hover:underline font-semibold whitespace-nowrap shrink-0"
          >
            Explore Savings Planner →
          </button>
        </div>
      </div>
    </section>
  );
};
