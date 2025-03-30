import { FunctionComponent } from 'react'
import { Info } from 'lucide-react'
import { Card, CardContent } from '@/components/shadcn/card'

type InsightsCardProps = {
    insights: string[]
}

export const InsightsCard: FunctionComponent<InsightsCardProps> = ({ insights }) => {
    return (
        <Card>
            <CardContent>
                <ul className="space-y-2 text-sm">
                    {insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <Info className="size-4 mt-0.5 flex-shrink-0" />
                            {insight}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
} 