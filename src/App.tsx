import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Overview } from "@/pages/Overview"
import { Campaigns } from "@/pages/Campaigns"
import { FunctionComponent } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/shadcn/tooltip"

const queryClient = new QueryClient()

export const App: FunctionComponent = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Router>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/overview" element={<Overview />} />
                            <Route path="/campaigns" element={<Campaigns />} />
                        </Route>
                        <Route path="/" element={<Navigate to="/overview" replace />} />
                    </Routes>
                </Router>
            </TooltipProvider>
        </QueryClientProvider>
    )
}