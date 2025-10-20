import { Outlet } from "react-router-dom";

import BottomBar from "../components/BottomBar";

const DashboardLayout = () => {

    const userRoles = "emp"

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
            <BottomBar UserRoles={userRoles}/>
        </div>
    );
};

export default DashboardLayout;
