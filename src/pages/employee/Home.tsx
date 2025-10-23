import { useNavigate } from "react-router-dom";
import { PartyPopper } from "lucide-react";

export default function EmployeeHome() {
    const navigate = useNavigate();
    const userName = "Alex Morgan"; // TODO: replace with real user name from auth/store

    return (
            <div className="min-h-screen bg-tertiary-500 text-[#0F172A] pb-24">
            {/* bottom padding for BottomBar */}
            <header className="px-6 pt-8">
                <p className="text-[#6B7280] text-lg">Welcome back,</p>
                <h1 className="text-3xl font-bold tracking-tight">
                    {userName}
                </h1>
            </header>

            <section className="px-6 mt-8">
                <h2 className="text-3xl font-extrabold mb-4">Pending Tasks</h2>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                        <PartyPopper className="h-10 w-10" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold">
                        No Pending Tasks 🎉
                    </h3>
                    <p className="mt-2 text-gray-500 max-w-xs">
                        You're all caught up! Enjoy your day.
                    </p>

                    <button
                        onClick={() => navigate("/emp/tasks")}
                        className="mt-8 w-full bg-primary-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                        View My Tasks
                    </button>
                </div>
            </section>
        </div>
    );
}
