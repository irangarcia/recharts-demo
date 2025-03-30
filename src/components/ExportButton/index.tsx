import { FunctionComponent } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { exportJson } from '@/lib/exportJson'

type ExportButtonProps = {
    data: Record<string, unknown>
    filename?: string
}

export const ExportButton: FunctionComponent<ExportButtonProps> = ({
    data,
    filename
}) => {
    const handleExport = (): void => {
        exportJson(data, filename)
    }

    return (
        <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
        >
            <Download className="size-4" />
            Export
        </Button>
    )
} 