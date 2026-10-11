export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  merchant?: string;
  account: string;
}

export interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
  description: string;
  dailyAvg: number;
  trend: 'up' | 'down' | 'steady';
  trendAmount: number;
  sampleItems: string[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  category: string;
  targetDate: string;
  note: string;
}

export interface FinancialInsight {
  id: string;
  title: string;
  highlightNumber: string;
  subtitle: string;
  description: string;
  category: 'spending' | 'saving' | 'recurring';
  impact: 'moderate' | 'positive' | 'attention';
  actionLabel: string;
  actionType: 'open-category' | 'open-planner' | 'open-recurring';
  detailItems?: { label: string; value: string }[];
}

export interface MonthlyCashFlow {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}
