import { httpApiInstance } from '.';
import { IBudgetData, QueryKeys } from './types';

export const getBudgets = async () => {
  const res = await httpApiInstance.makeAuthenticatedRequest<IBudgetData>(
    `/${QueryKeys.BUDGETS}`
  );
  return await res.json();
};

export const updateBudget = async (data: IBudgetData) => {
  await httpApiInstance.makeAuthenticatedRequest(`/${QueryKeys.BUDGETS}`, {
    method: 'POST',
    body: data,
  });
};
