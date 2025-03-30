import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import type { OverviewData } from '../types';

export const useOverview = () => {
  return useQuery<OverviewData>({
    queryKey: ['overview'],
    queryFn: api.getOverview,
  });
}; 