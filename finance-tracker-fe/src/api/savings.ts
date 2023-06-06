import { httpApiInstance } from '.';
import { ISavingsData, QueryKeys } from './types';

export const getSavings = async () => {
  const res = await httpApiInstance.makeAuthenticatedRequest<ISavingsData[]>(
    `/${QueryKeys.SAVINGS}`
  );
  return await res.json();
};

export const addSavings = async (data: Omit<ISavingsData, 'key'>) => {
  await httpApiInstance.makeAuthenticatedRequest(`/${QueryKeys.SAVINGS}`, {
    method: 'POST',
    body: data,
  });
};
