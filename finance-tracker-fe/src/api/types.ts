export interface IExpenseEarningData {
  name: string;
  amount: number;
  remarks: string;
  date: string;
}

export interface ISavingsData {
  amount: number;
  remarks: string;
  date: string;
}

export interface IBudgetData {
  amount: number;
}

export interface IInvestmentData {
  name: string;
  amount: number;
  interest: number;
  duration: number;
  payout: 'monthly' | 'yearly' | 'quarterly';
  date: string;
}

export enum QueryKeys {
  EARNINGS = 'earnings',
  EXPENSES = 'expenses',
  BUDGETS = 'budgets',
  INVESTMENTS = 'investments',
  SAVINGS = 'savings',
}
