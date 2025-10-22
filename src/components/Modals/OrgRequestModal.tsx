import  { useEffect } from "react";

export type TaskStatus = "reported" | "in-progress" | "completed";

export interface Task {
    id: string;
    title: string;
    assignedTo: string;
    deadline: string;
    description: string;
    status: TaskStatus;
}

interface OrgRequestModalProps {
    open: boolean;
    task: Task | null;
    onClose: () => void;
    onUpdateStatus?: (id: string, next: TaskStatus) => void;
}

export default function OrgRequestModal({
    open,
    task,
    onClose,
    onUpdateStatus,
}: OrgRequestModalProps) {
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    if (!open || !task) return null;

    const statusLabel = (s: TaskStatus) =>
        s === "in-progress"
            ? "In Progress"
            : s === "reported"
            ? "Reported"
            : "Completed";

    const nextStatus: TaskStatus | null =
        task.status === "reported"
            ? "in-progress"
            : task.status === "in-progress"
            ? "completed"
            : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
                onClick={onClose}
                aria-hidden
            />

            {/* modal dialog */}
            <div
                role="dialog"
                aria-modal="true"
                className="relative w-full md:w-[520px] max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-5 md:p-6 animate-in fade-in zoom-in"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <h2 className="text-xl font-semibold text-text-500">
                            {task.title}
                        </h2>
                        <p className="text-xs mt-1 inline-flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-secondary-500 text-mocha-500 font-medium">
                                {statusLabel(task.status)}
                            </span>
                            <span className="text-mocha-500">
                                • Deadline: {task.deadline}
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-secondary-500 text-mocha-500 text-sm font-medium hover:opacity-90"
                        aria-label="Close details"
                    >
                        Close
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-3">
                    <div className="bg-secondary-500 rounded-lg p-3">
                        <p className="text-sm text-black">
                            {task.description || "No description provided."}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                            <p className="text-mocha-500">Assigned to</p>
                            <p className="font-medium text-text-500">
                                {task.assignedTo}
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                            <p className="text-mocha-500">Task ID</p>
                            <p className="font-medium text-text-500">
                                {task.id}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="text-xs text-mocha-500">
                        Tip: Press{" "}
                        <kbd className="px-1 py-0.5 border rounded">Esc</kbd> to
                        close.
                    </div>
                    <div className="flex items-center gap-2">
                        {nextStatus && (
                            <button
                                onClick={() =>
                                    onUpdateStatus?.(task.id, nextStatus)
                                }
                                className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium hover:opacity-90 active:scale-95"
                            >
                                Mark{" "}
                                {nextStatus === "in-progress"
                                    ? "In Progress"
                                    : "Completed"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
