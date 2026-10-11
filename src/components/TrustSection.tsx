import React from 'react';
import { ShieldCheck, EyeOff, FileText, Lock } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#F7F7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-14 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B4D]">
            <span>Ethical Foundation</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66716B] font-normal normal-case">Trust and user control</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1713] text-balance">
            Built on quiet principles.
          </h2>

          <p className="text-base text-[#66716B] leading-relaxed text-pretty">
            We believe financial tools should serve the person holding them—not monetize their stress
            or funnel them into high-interest borrowing.
          </p>
        </div>

        {/* 3 Core Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Pillar 1: Clear Financial Information */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E7E0] p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#176B4D]/10 flex items-center justify-center text-[#176B4D]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0A1713]">
              Clear Financial Information
            </h3>
            <p className="text-xs sm:text-sm text-[#66716B] leading-relaxed">
              Every balance, category sum, and projection is grounded in simple arithmetic. No opaque AI credit scores, no hidden weights, and no vanity metrics designed to manufacture worry.
            </p>
          </div>

          {/* Pillar 2: Transparent Presentation */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E7E0] p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#176B4D]/10 flex items-center justify-center text-[#176B4D]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0A1713]">
              Transparent Presentation
            </h3>
            <p className="text-xs sm:text-sm text-[#66716B] leading-relaxed">
              We do not accept commissions to steer you toward specific credit cards, mutual funds, or personal loans. The recommendations and insights you see reflect only your real numbers.
            </p>
          </div>

          {/* Pillar 3: Privacy & User Control */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E7E0] p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#176B4D]/10 flex items-center justify-center text-[#176B4D]">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0A1713]">
              Privacy and User Control
            </h3>
            <p className="text-xs sm:text-sm text-[#66716B] leading-relaxed">
              You stay in control of what you record. You can export your financial records anytime, reset your demo states with one click, and explore without linking sensitive banking passwords.
            </p>
          </div>
        </div>

        {/* Clear statement */}
        <div className="mt-10 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E7E0] flex items-center justify-between flex-wrap gap-4 text-xs text-[#66716B]">
          <span>Fermor is designed for thoughtful individuals seeking sustainable financial peace.</span>
          <span className="font-semibold text-[#18231D]">Open · Accountable · Calibrated</span>
        </div>
      </div>
    </section>
  );
};
