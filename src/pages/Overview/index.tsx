import { Fragment, FunctionComponent, useState } from 'react'
import { useOverview } from '@/hooks/useOverview'
import { LineChart } from '@/components/LineChart'
import { StackedBarChart } from '@/components/StackedBarChart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { ChartSection } from '@/components/ChartSection'
import { TimeRangeSelector } from '@/components/TimeRangeSelector'
import { InsightsCard } from '@/components/InsightsCard'
import { PageHeader } from '@/components/PageHeader'
import { InsightButton } from '@/components/InsightButton'
import { ExportButton } from '@/components/ExportButton'

type ChartType = 'installs' | 'revenue' | 'combined'

export const Overview: FunctionComponent = () => {
    const { data, isLoading, isError } = useOverview()
    const [showInsights, setShowInsights] = useState(false)
    const [chartType, setChartType] = useState<ChartType>('combined')

    if (isError) {
        return <div>Oops, something went wrong. Please try again later.</div>
    }

    if (isLoading || !data) {
        return <div>Loading...</div>
    }

    const totalInstalls = data.installs.reduce((sum, day) => sum + day.value, 0)
    const totalRevenue = data.revenue.reduce((sum, day) => sum + day.value, 0)

    const renderChart = () => {
        switch (chartType) {
            case 'installs':
                return (
                    <ChartSection
                        title="Installs"
                        tooltipText="Number of app installations tracked over the last 7 days"
                        value={totalInstalls}
                    >
                        <LineChart data={data.installs} color="#6366f1" name="Installs" />
                    </ChartSection>
                )
            case 'revenue':
                return (
                    <ChartSection
                        title="Revenue"
                        tooltipText="Total revenue generated from app installations over the last 7 days"
                        value={`${totalRevenue.toFixed(2)} EUR`}
                    >
                        <LineChart data={data.revenue} color="#10b981" name="Revenue" />
                    </ChartSection>
                )
            case 'combined':
                return (
                    <ChartSection
                        title="Installs & Revenue"
                        tooltipText="Combined view of installs and revenue over the last 7 days"
                        value={(
                            <Fragment>
                                {totalInstalls} installs <br /> {totalRevenue.toFixed(2)} EUR
                            </Fragment>
                        )}
                    >
                        <StackedBarChart
                            data={data.installs}
                            data2={data.revenue}
                            color="#6366f1"
                            color2="#10b981"
                            primaryKey="installs"
                            secondaryKey="revenue"
                            primaryName="Installs"
                            secondaryName="Revenue"
                        />
                    </ChartSection>
                )
        }
    }

    return (
        <div className="space-y-8 flex flex-col items-center pb-6 px-6">
            <PageHeader
                title="Overview"
                actions={(
                    <Fragment>
                        <InsightButton
                            onToggle={() => {
                                setShowInsights(!showInsights)
                            }}
                        />
                        <ExportButton
                            data={{
                                installs: data.installs,
                                revenue: data.revenue,
                                totalInstalls,
                                totalRevenue
                            }}
                        />
                        <TimeRangeSelector />
                    </Fragment>
                )}
            />

            <div className="flex self-start">
                <Select value={chartType} onValueChange={(value) => { setChartType(value as ChartType); }}>
                    <SelectTrigger aria-label="Select chart type" className="w-[180px]">
                        <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="installs">Installs</SelectItem>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="combined">Installs & Revenue</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {showInsights && (
                <InsightsCard
                    insights={[
                        'Revenue is highest on Fridays',
                        'Weekend performance is lower'
                    ]}
                />
            )}

            <div className="flex gap-8">
                {renderChart()}
            </div>
        </div>
    )
} 