import { useState, lazy, Suspense } from "react";
import { Search, Plus } from "lucide-react";

import WelcomeMessage from "../../components/WelcomeMessage";
const RaiseRequest = lazy(() => import("../../components/RaiseRequest"));
const OrgRequestModal = lazy(() => import("../../components/Modals/OrgRequestModal"));

interface Task {
    id: string;
    title: string;
    assignedTo: string;
    deadline: string;
    description: string;
    status: "reported" | "in-progress" | "completed";
}

type TabType = "reported" | "in-progress" | "completed";

export default function OrganizationHome() {
    const [activeTab, setActiveTab] = useState<TabType>("reported");
    const [searchQuery, setSearchQuery] = useState("");
    const [showRaise, setShowRaise] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "NeerMahal e agun lgse",
            assignedTo: "Tirthankar Das",
            deadline: "2023-10-29",
            status: "reported",
            description: "Bhalo koira poriskar koron lgbo",
        },
    ]);


    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showDetails, setShowDetails] = useState(false);

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

    const handleCreateRequest = (data: {
        locality: string;
        description: string;
    }) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: data.locality,
            assignedTo: "Samik Das",
            deadline: new Date().toISOString().slice(0, 10), // YYYY-MM-DD for consistency
            status: "reported",
            description: data.description,
        };
        setTasks((prev) => [
            // keep newest on top
            newTask,
            ...prev,
        ]);
        console.log("Raised request:", data);
    };

    const statusLabel = (s: Task["status"]) =>
        s === "in-progress"
            ? "In Progress"
            : s === "reported"
            ? "Reported"
            : "Completed";

    // NEW: update status handler (used by modal CTA)
    function handleUpdateStatus(id: string, next: Task["status"]) {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: next } : t))
        );
        setShowDetails(false);
        setSelectedTask(null);
    }

    return (
        <div className="min-h-screen bg-tertiary-500 pb-24 max-w-md mx-auto">
            {/* Header */}
            <WelcomeMessage type="Organization"/>

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
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary-500  text-black placeholder-black text-sm focus:ring-2 focus:black outline"
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
                            <button
                                key={task.id}
                                onClick={() => {
                                    setSelectedTask(task);
                                    setShowDetails(true);
                                }}
                                className="w-full text-left bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:ring-2 hover:ring-primary-500/30 focus:outline-none"
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
                            </button>
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
                onClick={() => setShowRaise(true)}
            >
                <Plus size={20} />
                Raise Request
            </button>

            {/* Lazy components must be inside Suspense */}
            <Suspense fallback={null}>
                <RaiseRequest
                    open={showRaise}
                    onClose={() => setShowRaise(false)}
                    onSubmit={handleCreateRequest}
                />
                <OrgRequestModal
                    open={showDetails}
                    task={selectedTask}
                    onClose={() => setShowDetails(false)}
                    onUpdateStatus={handleUpdateStatus}
                />
            </Suspense>
        </div>
    );
}
