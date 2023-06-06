import {
  IExpenseEarningData,
  ISavingsData,
  IInvestmentData,
} from '../api/types';

type TCalculationData = IExpenseEarningData | ISavingsData | IInvestmentData;

export const calculateTotalThisYear = (data: TCalculationData[]) => {
  const is_same_year = (date: string | Date) =>
    new Date(date).getFullYear() === new Date().getFullYear();

  const total = data
    .filter(d => is_same_year(d.date))
    .reduce((a, b) => a + b.amount, 0);
  return total;
};

export const calculateTotalThisMonth = (data: TCalculationData[]) => {
  const is_same_month = (date: string | Date) =>
    new Date(date).getFullYear() === new Date().getFullYear() &&
    new Date(date).getMonth() === new Date().getMonth();

  const total = data
    .filter(d => is_same_month(d.date))
    .reduce((a, b) => a + b.amount, 0);
  return total;
};

export const calculateTotal = (data: TCalculationData[]) => {
  const total = data.reduce((a, b) => a + b.amount, 0);
  return total;
};
