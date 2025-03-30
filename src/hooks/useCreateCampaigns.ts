import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { CreateCampaignInput } from '@/types';

export const useCreateCampaign = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCampaignInput) => api.createCampaign(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        },
    });
}; 