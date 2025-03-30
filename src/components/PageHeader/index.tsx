import { FunctionComponent, ReactNode } from 'react'

type PageHeaderProps = {
    title: string
    actions?: ReactNode
}

export const PageHeader: FunctionComponent<PageHeaderProps> = ({
    title,
    actions
}) => {
    return (
        <div className="flex justify-between w-full">
            <h1 className="text-2xl font-bold w-full">{title}</h1>
            {actions && (
                <div className="flex justify-end gap-4 w-full">
                    {actions}
                </div>
            )}
        </div>
    )
} 