import React from 'react';

interface FooterProps {
  onOpenOnboarding: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOnboarding,
  onNavigateToSection,
}) => {
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigateToSection(id);
  };

  return (
    <footer className="bg-[#FAFBF9] border-t border-[#E2E7E0] pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E2E7E0]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#176B4D]"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="24" height="24" rx="6" stroke="#176B4D" strokeWidth="2.2" />
                <circle cx="10" cy="14" r="3.2" fill="#176B4D" />
                <path d="M14 8L20 14L14 20" stroke="#92E8B7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-[#0A1713]">
                Fermor
              </span>
            </div>

            <p className="text-sm text-[#66716B] leading-relaxed max-w-sm">
              Fermor is building a calmer, clearer way for people to understand their spending,
              fund meaningful goals, and make informed financial decisions without anxiety.
            </p>

            <div className="pt-2 text-xs text-[#66716B]">
              <p>Creative Direction: <strong className="text-[#0A1713]">Quiet Financial Confidence</strong></p>
              <p className="mt-0.5">Designed with care for human perspective.</p>
            </div>
          </div>

          {/* Column 2: Product & Capabilities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-[#0A1713] uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-[#66716B]">
              <li>
                <a
                  href="#product"
                  onClick={(e) => handleNavClick(e, 'product')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  Core Overview
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works-preview"
                  onClick={(e) => handleNavClick(e, 'how-it-works-preview')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  Financial Explorer
                </a>
              </li>
              <li>
                <a
                  href="#insights"
                  onClick={(e) => handleNavClick(e, 'insights')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  Contextual Insights
                </a>
              </li>
              <li>
                <a
                  href="#goal-planner"
                  onClick={(e) => handleNavClick(e, 'goal-planner')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  Interactive Savings Planner
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenOnboarding}
                  className="hover:text-[#176B4D] transition-colors text-left"
                >
                  Onboarding Simulation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: How & Why */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#0A1713] uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-sm text-[#66716B]">
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, 'how-it-works')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  01. Understand
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, 'how-it-works')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  02. Decide
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, 'how-it-works')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  03. Grow
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="hover:text-[#0A1713] transition-colors"
                >
                  Trust & Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Principles & Sandbox */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#0A1713] uppercase tracking-wider">
              Ethics
            </h4>
            <ul className="space-y-2 text-sm text-[#66716B]">
              <li>
                <span className="text-[#66716B]">No Loan Selling</span>
              </li>
              <li>
                <span className="text-[#66716B]">No Alarm Gimmicks</span>
              </li>
              <li>
                <span className="text-[#66716B]">Local-First Sandbox</span>
              </li>
              <li>
                <span className="text-[#66716B]">Transparent Math</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#66716B]">
          <p>© 2026 Fermor Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Illustrative sample figures for evaluation</span>
            <span>·</span>
            <span>Zero third-party cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
