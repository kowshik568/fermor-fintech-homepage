import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOnboarding }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#F7F7F1]/95 backdrop-blur-md border-b border-[#E2E7E0] py-3.5 shadow-[0_1px_3px_rgba(10,23,19,0.04)]'
          : 'bg-[#F7F7F1] border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark & Geometric Glyph */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-[#0A1713] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D] rounded-md px-1"
          >
            {/* Custom geometric logo mark representing balance & measured growth */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#176B4D] group-hover:rotate-6 transition-transform duration-300"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="24" height="24" rx="6" stroke="#176B4D" strokeWidth="2.2" />
              <circle cx="10" cy="14" r="3.2" fill="#176B4D" />
              <path d="M14 8L20 14L14 20" stroke="#92E8B7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-[#0A1713]">
              Fermor
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[#66716B]"
            aria-label="Main Navigation"
          >
            <a
              href="#product"
              onClick={(e) => scrollToSection(e, 'product')}
              className="hover:text-[#0A1713] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Product
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="hover:text-[#0A1713] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              How it works
            </a>
            <a
              href="#insights"
              onClick={(e) => scrollToSection(e, 'insights')}
              className="hover:text-[#0A1713] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Insights
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="hover:text-[#0A1713] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              About
            </a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="text-sm font-medium text-[#18231D] hover:text-[#176B4D] px-3 py-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D] rounded-lg"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-lg transition-colors duration-150 shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B4D]"
            >
              <span>Get started</span>
              <ArrowUpRight className="w-4 h-4 text-[#92E8B7]" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#18231D] hover:text-[#176B4D] rounded-lg hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E7E0] bg-[#F7F7F1] px-5 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#18231D]">
            <a
              href="#product"
              onClick={(e) => scrollToSection(e, 'product')}
              className="px-2 py-1.5 hover:text-[#176B4D] rounded-md transition-colors"
            >
              Product
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="px-2 py-1.5 hover:text-[#176B4D] rounded-md transition-colors"
            >
              How it works
            </a>
            <a
              href="#insights"
              onClick={(e) => scrollToSection(e, 'insights')}
              className="px-2 py-1.5 hover:text-[#176B4D] rounded-md transition-colors"
            >
              Insights
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="px-2 py-1.5 hover:text-[#176B4D] rounded-md transition-colors"
            >
              About
            </a>
          </nav>
          <div className="pt-3 border-t border-[#E2E7E0] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full text-center py-2.5 text-sm font-medium text-[#18231D] hover:bg-black/5 rounded-lg border border-[#E2E7E0]"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#0A1713] hover:bg-[#176B4D] rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Get started</span>
              <ArrowUpRight className="w-4 h-4 text-[#92E8B7]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
