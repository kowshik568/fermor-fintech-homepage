import React, { useEffect } from 'react';
import { FinancialInsight } from '../types';
import { X, Check, ArrowRight, Shield, AlertCircle } from 'lucide-react';

interface InsightDetailModalProps {
  insight: FinancialInsight | null;
  onClose: () => void;
  onActionClick: (insight: FinancialInsight) => void;
}

export const InsightDetailModal: React.FC<InsightDetailModalProps> = ({
  insight,
  onClose,
  onActionClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (insight) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [insight, onClose]);

  if (!insight) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="insight-modal-title"
    >
      <div
        className="w-full max-w-lg bg-[#FFFFFF] rounded-2xl border border-[#E2E7E0] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAFBF9] px-6 py-4 border-b border-[#E2E7E0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B4D]">
              Fermor Insight Note
            </span>
            <span className="text-[#66716B] text-xs">·</span>
            <span className="text-xs text-[#66716B] capitalize">{insight.category} context</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#66716B] hover:text-[#0A1713] hover:bg-black/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D]"
            aria-label="Close insight dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-left">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[#66716B]">{insight.subtitle}</span>
              <span className="text-xs font-bold text-[#176B4D] tabular-nums">
                {insight.highlightNumber}
              </span>
            </div>
            <h3 id="insight-modal-title" className="text-xl font-bold text-[#0A1713]">
              {insight.title}
            </h3>
          </div>

          <p className="text-sm text-[#66716B] leading-relaxed">
            {insight.description}
          </p>

          {/* Key data table */}
          {insight.detailItems && (
            <div className="bg-[#FAFBF9] rounded-xl border border-[#EDF0EC] p-3.5 divide-y divide-[#F0F2EF] text-xs">
              {insight.detailItems.map((item, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0 flex justify-between items-center">
                  <span className="text-[#66716B]">{item.label}</span>
                  <span className="font-semibold text-[#0A1713] tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Calm philosophy note */}
          <div className="flex items-start gap-2.5 p-3 bg-[#F7F9F6] border border-[#E2E7E0] rounded-lg text-xs text-[#66716B]">
            <Shield className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
            <p>
              Fermor insights do not trigger push alerts or demand urgent actions. They sit quietly here whenever you choose to review your ledger.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAFBF9] px-6 py-4 border-t border-[#E2E7E0] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#18231D] hover:bg-black/5 rounded-lg border border-[#E2E7E0] transition-colors"
          >
            Dismiss note
          </button>
          <button
            type="button"
            onClick={() => onActionClick(insight)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>{insight.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
