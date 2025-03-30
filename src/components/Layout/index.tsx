import { NavigationTabs } from "../NavigationTabs"
import { FunctionComponent } from "react"

export const Layout: FunctionComponent = () => {
    return (
        <div className="flex bg-gray-100 flex-col items-center justify-center min-h-svh py-20">
            <div className="flex gap-8 flex-col bg-white min-w-7xl rounded-lg min-h-[calc(100vh-10rem)] items-center p-8">
                <NavigationTabs />
            </div>
        </div>
    )
}
