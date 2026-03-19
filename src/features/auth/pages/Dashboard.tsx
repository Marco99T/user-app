
import Navbar from "../../../components/Navbar";
import DashboardLayout from "../../../layout/DashboardLayout";

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="min-h-screen bg-slate-900">
                <Navbar />
                <div className="flex justify-center items-center h-screen text-white">
                    <h1 className="text-4xl">Dashboard protegido</h1>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;