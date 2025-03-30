import { FunctionComponent, useState, useEffect, Fragment } from 'react'
import { useCampaigns } from '@/hooks/useCampaigns'
import { LineChart } from '@/components/LineChart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { Plus } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { CreateCampaignDialog } from '@/components/CreateCampaignDialog'
import { DayData } from '@/types'
import { useCreateCampaign } from '@/hooks/useCreateCampaigns'
import { ChartSection } from '@/components/ChartSection'
import { TimeRangeSelector } from '@/components/TimeRangeSelector'
import { InsightsCard } from '@/components/InsightsCard'
import { PageHeader } from '@/components/PageHeader'
import { InsightButton } from '@/components/InsightButton'
import { ExportButton } from '@/components/ExportButton'

export type CampaignsProps = Record<string, never>

const SELECTED_CAMPAIGN_KEY = 'selectedCampaignId'

export const Campaigns: FunctionComponent<CampaignsProps> = () => {
    const { data: campaigns, isLoading, isError } = useCampaigns()
    const { mutate: createCampaign, isPending, error: creationError } = useCreateCampaign()
    
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>(() => {
         
        return localStorage.getItem(SELECTED_CAMPAIGN_KEY) || ''
    })
    const [showInsights, setShowInsights] = useState<boolean>(false)
    const [showCreateDialog, setShowCreateDialog] = useState(false)

    useEffect(() => {
        if (campaigns && campaigns.length > 0 && !selectedCampaignId) {
            const firstCampaignId = campaigns[0].id
            setSelectedCampaignId(firstCampaignId)
            localStorage.setItem(SELECTED_CAMPAIGN_KEY, firstCampaignId)
        }
    }, [campaigns, selectedCampaignId])

    if (isError) {
        return <div>Oops, something went wrong. Please try again later.</div>
    }

    if (isLoading || !campaigns) {
        return <div>Loading...</div>
    }

    const selectedCampaign = campaigns.find(campaign => campaign.id === selectedCampaignId) || campaigns[0]
    const totalInstalls = selectedCampaign.installs.reduce((sum: number, day: DayData) => sum + day.value, 0)

    const handleCreateCampaign = (data: { name: string }) => {
        createCampaign(
            { name: data.name },
            {
                onSuccess: () => {
                    setShowCreateDialog(false)
                }
            }
        )
    }

    const handleCampaignChange = (value: string) => {
        setSelectedCampaignId(value)
        localStorage.setItem(SELECTED_CAMPAIGN_KEY, value)
    }

    return (
        <div className="space-y-8 flex flex-col items-center pb-6 px-6">
            <PageHeader
                title={`Campaign: ${selectedCampaign.name}`}
                actions={(
                    <Fragment>
                        <Button
                            onClick={() => { setShowCreateDialog(true); }}
                            className="flex items-center gap-2"
                        >
                            <Plus className="size-4" />
                            Create Campaign
                        </Button>
                        <InsightButton onToggle={() => { setShowInsights(!showInsights); }} />
                        <ExportButton
                            filename={`${selectedCampaign.id}-installs.json`}
                            data={{
                                campaignName: selectedCampaign.name,
                                installs: selectedCampaign.installs,
                                totalInstalls
                            }}
                        />
                        <TimeRangeSelector />
                    </Fragment>
                )}
            />

            <div className="flex self-start">
                <Select
                    value={selectedCampaignId || campaigns[0].id}
                    onValueChange={handleCampaignChange}
                >
                    <SelectTrigger aria-label="Select campaign" className="w-[180px]">
                        <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                        {campaigns.map(campaign => (
                            <SelectItem
                                key={campaign.id}
                                value={campaign.id}
                            >
                                {campaign.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {showInsights && (
                <InsightsCard
                    insights={[
                        'Thursday shows the highest install rates across campaigns',
                        'Campaign 2 outperforms others with peak performance of 78 installs',
                        'Campaign 4 shows significantly lower performance (avg. 10 installs/day)'
                    ]}
                />
            )}

            <ChartSection
                title="Installs"
                tooltipText="Number of app installations tracked over the last 7 days for this campaign"
                value={totalInstalls}
            >
                <LineChart data={selectedCampaign.installs} color="#6366f1" name="Installs" />
            </ChartSection>

            <CreateCampaignDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSubmit={handleCreateCampaign}
                isLoading={isPending}
                error={creationError}
                existingCampaigns={campaigns}
            />
        </div>
    )
} 