import { FunctionComponent, ReactNode } from 'react'
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

type ChartSectionProps = {
    title: string
    tooltipText: string
    value: ReactNode
    children: ReactNode
}

export const ChartSection: FunctionComponent<ChartSectionProps> = ({
    title,
    tooltipText,
    value,
    children
}) => {
    return (
        <div className="w-xl">
            <div className="flex items-center gap-2 ml-4">
                <h2 className="text-xl font-medium">{title}</h2>
                <Tooltip>
                    <TooltipTrigger>
                        <Info className="size-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltipText}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <p className="text-sm text-gray-500 mb-1 ml-4">Last 7 days</p>
            <p className="text-2xl font-semibold mb-4 ml-4">{value}</p>
            {children}
        </div>
    )
} 