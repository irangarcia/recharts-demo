import { FunctionComponent } from 'react'
import { Lightbulb } from 'lucide-react'
import { Button } from '@/components/shadcn/button'

type InsightButtonProps = {
    onToggle: () => void
}

export const InsightButton: FunctionComponent<InsightButtonProps> = ({
    onToggle
}) => {
    return (
        <Button
            variant="outline"
            onClick={onToggle}
            className="flex items-center gap-2"
        >
            <Lightbulb className="size-4" />
            Insights
        </Button>
    )
} 