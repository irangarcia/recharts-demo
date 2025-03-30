import { FunctionComponent, useState, type ChangeEvent, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../shadcn/dialog'
import { Button } from '../shadcn/button'
import { Input } from '../shadcn/input'

type CreateCampaignDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: { name: string }) => void
    isLoading?: boolean
    error?: Error | null
    existingCampaigns?: { name: string }[]
}

export const CreateCampaignDialog: FunctionComponent<CreateCampaignDialogProps> = ({
    open,
    onOpenChange,
    onSubmit,
    isLoading = false,
    error = null,
    existingCampaigns = []
}) => {
    const [name, setName] = useState('')
    const [validationError, setValidationError] = useState<string | null>(null)

    const handleSubmit = () => {
        setValidationError(null)

        const isDuplicate = existingCampaigns.some(
            campaign => campaign.name.toLowerCase().trim() === name.toLowerCase().trim()
        )

        if (isDuplicate) {
            setValidationError('A campaign with this name already exists.')

            return
        }

        onSubmit({ name })
    }

    useEffect(() => {
        if (!open) {
            setName('')
            setValidationError(null)
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Campaign Name
                        </label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setName(e.target.value)
                                setValidationError(null)
                            }}
                            placeholder="Enter campaign name"
                            disabled={isLoading}
                        />
                        {(error ?? validationError) && (
                            <p className="text-destructive text-sm">
                                {validationError ?? 'Oops, something went wrong. Please try again later.'}
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { onOpenChange(false); }} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!name.trim() || isLoading}>
                        {isLoading ? 'Creating...' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 