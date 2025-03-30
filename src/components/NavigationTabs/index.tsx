import { Separator } from "../shadcn/separator"
import { Tabs, TabsList, TabsTrigger } from "../shadcn/tabs"
import { Link, Outlet, useLocation } from "react-router-dom"

export const NavigationTabs = () => {
    const location = useLocation()
    const currentPath = location.pathname.slice(1) || 'overview'

    return (
        <Tabs value={currentPath} className="w-full">
            <TabsList className="flex gap-4 self-center">
                <Link to="/overview">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                </Link>
                <Link to="/campaigns">
                    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                </Link>
            </TabsList>
            <Separator className="w-full h-1 my-8 bg-gray-200" />
            <div className="w-full">
                <Outlet />
            </div>
        </Tabs>
    )
}