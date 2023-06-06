import { httpApiInstance } from '.';
import { IExpenseEarningData, QueryKeys } from './types';

export const getExpenses = async () => {
  const res = await httpApiInstance.makeAuthenticatedRequest<
    IExpenseEarningData[]
  >(`/${QueryKeys.EXPENSES}`);
  return await res.json();
};

export const addExpenses = async (data: Omit<IExpenseEarningData, 'key'>) => {
  await httpApiInstance.makeAuthenticatedRequest(`/${QueryKeys.EXPENSES}`, {
    method: 'POST',
    body: data,
  });
};
