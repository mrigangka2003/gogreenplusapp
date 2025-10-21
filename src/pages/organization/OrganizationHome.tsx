import { useState } from "react";
import { Search, Users, Plus } from "lucide-react";

interface Task {
    id: string;
    title: string;
    assignedTo: string;
    deadline: string;
    status: "reported" | "in-progress" | "completed";
}

type TabType = "reported" | "in-progress" | "completed";

export default function OrganizationHome() {
    const [activeTab, setActiveTab] = useState<TabType>("reported");
    const [searchQuery, setSearchQuery] = useState("");
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "NeerMahal e agun lgse",
            assignedTo: "Tirthankar Das",
            deadline: "2023-10-29",
            status: "reported",
        },
    ]);

    const filteredTasks = tasks.filter(
        (task) =>
            task.status === activeTab &&
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tabs: { key: TabType; label: string }[] = [
        { key: "reported", label: "Reported" },
        { key: "in-progress", label: "In Progress" },
        { key: "completed", label: "Completed" },
    ];

    const handleRaiseRequest = () => {
        const title = prompt("Enter request title:");
        if (title && title.trim()) {
            const newTask: Task = {
                id: Date.now().toString(),
                title: title.trim(),
                assignedTo: "Unassigned",
                deadline: new Date().toISOString().split("T")[0],
                status: "reported",
            };
            setTasks((prev) => [...prev, newTask]);
            setActiveTab("reported");
        }
    };

    const statusLabel = (s: Task["status"]) =>
        s === "in-progress"
            ? "In Progress"
            : s === "reported"
            ? "Reported"
            : "Completed";

    return (
        <div className="min-h-screen bg-tertiary-500 pb-24 max-w-md mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-br from-secondary-500 via-secondary-500 to-tertiary-500 px-5 pt-6 pb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-text-500">
                        <Users size={20} />
                        <span className="font-medium text-sm">
                            Organization
                        </span>
                    </div>
                    <button className="text-sm font-medium text-text-500">
                        Support
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-text-500 leading-tight">
                    Welcome back! Let's
                    <br />
                    make today
                    <br />
                    productive.
                </h1>
            </div>

            {/* Search Bar */}
            <div className="px-5 -mt-4 mb-6">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-mocha-500"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search tasks"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary-500 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="px-5 mb-1">
                <div className="flex gap-6 border-b border-gray-300">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                                activeTab === tab.key
                                    ? "text-text-500"
                                    : "text-mocha-500"
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task List */}
            <div className="px-5 pt-5">
                {filteredTasks.length > 0 ? (
                    <div className="space-y-3">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-text-500 text-base">
                                        {task.title}
                                    </h3>
                                    <span className="bg-secondary-500 text-mocha-500 text-xs font-medium px-3 py-1 rounded uppercase tracking-wide">
                                        {statusLabel(task.status)}
                                    </span>
                                </div>
                                <p className="text-sm text-mocha-500 mb-1">
                                    Assigned to: {task.assignedTo}
                                </p>
                                <p className="text-sm text-mocha-500">
                                    Deadline: {task.deadline}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-mocha-500">
                        <p className="text-sm">No tasks found</p>
                    </div>
                )}
            </div>

            {/* Floating Action Button — show on mobile only */}
            <button
                type="button"
                aria-label="Raise Request"
                className="fixed flex bottom-22 right-6 bg-primary-500 text-white rounded-full px-6 py-4 shadow-lg items-center gap-2 font-medium text-sm hover:opacity-90 transition-opacity active:scale-95 z-40 md:hidden"
                onClick={handleRaiseRequest}
            >
                <Plus size={20} />
                Raise Request
            </button>
        </div>
    );
}
