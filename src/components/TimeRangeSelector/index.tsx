import { FunctionComponent } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'

type TimeRangeSelectorProps = {
    value?: string
    onChange?: (value: string) => void
}

export const TimeRangeSelector: FunctionComponent<TimeRangeSelectorProps> = ({
    value = '7days',
    onChange
}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days" disabled>Last month (soon)</SelectItem>
                <SelectItem value="90days" disabled>Last quarter (soon)</SelectItem>
                <SelectItem value="365days" disabled>Last year (soon)</SelectItem>
                <SelectItem value="custom" disabled>Custom range (soon)</SelectItem>
            </SelectContent>
        </Select>
    )
} 