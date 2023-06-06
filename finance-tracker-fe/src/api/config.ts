import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
