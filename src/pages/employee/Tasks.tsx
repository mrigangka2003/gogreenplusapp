// import { ClipboardList, CheckCircle2 } from "lucide-react";

import TaskDetails from "../../components/TasksDetails";

export default function EmployeeTasks() {
    // TODO: replace with real tasks. Keeping empty to match provided design.
    // const tasks: Array<{ id: string; title: string; done?: boolean }> = [];

    return (
        // <div className="min-h-screen bg-[#F6F8F7] text-[#0F172A] pb-24 px-6 pt-8">
        //     <h1 className="text-3xl font-extrabold">Tasks</h1>

        //     {tasks.length === 0 ? (
        //         <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
        //             <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
        //                 <ClipboardList className="h-10 w-10" />
        //             </div>
        //             <h3 className="mt-6 text-2xl font-bold">
        //                 No Pending Tasks 🎉
        //             </h3>
        //             <p className="mt-2 text-gray-500 max-w-xs">
        //                 You're all caught up! Enjoy your day.
        //             </p>
        //         </div>
        //     ) : (
        //         <ul className="mt-6 space-y-3">
        //             {tasks.map((t) => (
        //                 <li
        //                     key={t.id}
        //                     className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3"
        //                 >
        //                     <CheckCircle2
        //                         className={
        //                             t.done ? "opacity-100" : "opacity-20"
        //                         }
        //                     />
        //                     <span
        //                         className={`text-sm ${
        //                             t.done
        //                                 ? "line-through text-gray-400"
        //                                 : "text-gray-900"
        //                         }`}
        //                     >
        //                         {t.title}
        //                     </span>
        //                 </li>
        //             ))}
        //         </ul>
        //     )}
        // </div>
        <TaskDetails/>
    );
}
