import axios from 'axios';
import { OverviewData, CreateCampaignInput, Campaign } from '../types';

const BASE_URL = 'http://5c3db915a9d04f0014a98a79.mockapi.io';

export const api = {
  getOverview: async (): Promise<OverviewData> => {
    const response = await axios.get<OverviewData>(`${BASE_URL}/overview`);
    return response.data;
  },

  getCampaigns: async (): Promise<Campaign[]> => {
    const response = await axios.get<Campaign[]>(`${BASE_URL}/campaigns`);
    return response.data;
  },

  createCampaign: async (data: CreateCampaignInput): Promise<Campaign> => {
    const response = await axios.post<Campaign>(`${BASE_URL}/campaigns`, data);
    return response.data;
  },
}; 