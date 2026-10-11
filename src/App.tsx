/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductBenefits } from './components/ProductBenefits';
import { FinancialExplorer } from './components/FinancialExplorer';
import { InsightsSection } from './components/InsightsSection';
import { GoalPlanner } from './components/GoalPlanner';
import { HowItWorks } from './components/HowItWorks';
import { TrustSection } from './components/TrustSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { OnboardingDialog } from './components/OnboardingDialog';
import { InsightDetailModal } from './components/InsightDetailModal';
import { FINANCIAL_INSIGHTS } from './data/mockData';
import { FinancialInsight } from './types';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<FinancialInsight | null>(null);
  const [explorerTab, setExplorerTab] = useState<'spending' | 'saving' | 'overview'>('spending');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenExplorerTab = (tab: 'spending' | 'saving' | 'overview') => {
    setExplorerTab(tab);
    scrollToSection('how-it-works-preview');
  };

  const handleOpenDefaultInsight = () => {
    setSelectedInsight(FINANCIAL_INSIGHTS[0]);
  };

  const handleInsightAction = (insight: FinancialInsight) => {
    setSelectedInsight(null);
    if (insight.actionType === 'open-category' || insight.actionType === 'open-recurring') {
      handleOpenExplorerTab('spending');
    } else if (insight.actionType === 'open-planner') {
      scrollToSection('goal-planner');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F1] text-[#18231D] selection:bg-[#92E8B7] selection:text-[#0A1713] font-sans antialiased">
      {/* 1. Navigation & Brand */}
      <Navbar onOpenOnboarding={() => setIsOnboardingOpen(true)} />

      <main id="main-content">
        {/* 2. Hero Section with Real Product Financial Dashboard */}
        <HeroSection
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenExplorerTab={handleOpenExplorerTab}
          onOpenInsight={handleOpenDefaultInsight}
        />

        {/* 3. Product Benefits: See the bigger picture. Find your next step */}
        <ProductBenefits
          onExploreClick={() => scrollToSection('how-it-works-preview')}
        />

        {/* 4. Functional Financial Explorer: Spending, Saving, Monthly Overview */}
        <FinancialExplorer initialTab={explorerTab} />

        {/* 5. Insights That Lead to Action */}
        <InsightsSection
          onSelectInsight={(insight) => setSelectedInsight(insight)}
          onNavigateToSection={scrollToSection}
        />

        {/* 6. Interactive Savings Planner */}
        <GoalPlanner onOpenOnboarding={() => setIsOnboardingOpen(true)} />

        {/* 7. How Fermor Works: 01 Understand, 02 Decide, 03 Grow */}
        <HowItWorks onOpenOnboarding={() => setIsOnboardingOpen(true)} />

        {/* 8. Trust, Presentation, and User Control */}
        <TrustSection />

        {/* 9. Final Call to Action */}
        <FinalCTA
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onExploreClick={() => scrollToSection('how-it-works-preview')}
        />
      </main>

      {/* 10. Comprehensive Footer */}
      <Footer
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onNavigateToSection={scrollToSection}
      />

      {/* 11. Functional Local Onboarding Dialog */}
      <OnboardingDialog
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onFinish={() => {
          scrollToSection('how-it-works-preview');
        }}
      />

      {/* 12. Detailed Insight Context Modal */}
      <InsightDetailModal
        insight={selectedInsight}
        onClose={() => setSelectedInsight(null)}
        onActionClick={handleInsightAction}
      />
    </div>
  );
}
