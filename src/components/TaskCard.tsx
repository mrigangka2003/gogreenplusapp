import type { Task } from "./EmpCompletedTask";

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <div className="bg-tertiary-500 rounded-xl shadow-sm p-3 sm:p-4 flex justify-between items-center border border-gray-200">
            {/* LEFT: Basic Details */}
            <div className="flex flex-col">
                <h2 className="text-sm sm:text-base font-semibold text-black">
                    {task.taskId}
                </h2>
                <p className="text-sm text-mocha-500">
                    {task.location}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                    {new Date(task.completedTime).toLocaleString()}
                </p>
            </div>

            {/* RIGHT: Before / After Photos */}
            <div className="flex gap-2">
                <img
                    src={task.beforePhoto}
                    alt="Before"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-300"
                />
                <img
                    src={task.afterPhoto}
                    alt="After"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-300"
                />
            </div>
        </div>
    );
}
