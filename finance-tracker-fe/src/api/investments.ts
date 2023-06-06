import { httpApiInstance } from '.';
import { IExpenseEarningData, IInvestmentData, QueryKeys } from './types';

export const getInvestments = async () => {
  const res = await httpApiInstance.makeAuthenticatedRequest<
    IExpenseEarningData[]
  >(`/${QueryKeys.INVESTMENTS}`);
  return await res.json();
};

export const addInvestment = async (data: IInvestmentData) => {
  await httpApiInstance.makeAuthenticatedRequest(`/${QueryKeys.INVESTMENTS}`, {
    method: 'POST',
    body: data,
  });
};
