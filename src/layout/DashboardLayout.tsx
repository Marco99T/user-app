import type { ReactNode } from "react"
import Sidebar from "./Sidebar"

interface Props {
    children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-slate-950 min-h-screen">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout