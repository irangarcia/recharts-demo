export type DayData = {
  day: string;
  value: number;
};

export type OverviewData = {
  installs: DayData[];
  revenue: DayData[];
}; 

export type Campaign = {
  id: string
  name: string
  installs: DayData[]
}

export type CreateCampaignInput = {
  name: string
}