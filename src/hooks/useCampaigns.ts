import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export const useCampaigns = () => {
    return useQuery({
        queryKey: ['campaigns'],
        queryFn: () => api.getCampaigns()
    })
}
