import { httpApiInstance } from '.';
import { IExpenseEarningData, QueryKeys } from './types';

export const getEarnings = async () => {
  const res = await httpApiInstance.makeAuthenticatedRequest<
    IExpenseEarningData[]
  >(`/${QueryKeys.EARNINGS}`);
  return await res.json();
};

export const addEarnings = async (data: Omit<IExpenseEarningData, 'key'>) => {
  await httpApiInstance.makeAuthenticatedRequest(`/${QueryKeys.EARNINGS}`, {
    method: 'POST',
    body: data,
  });
};
