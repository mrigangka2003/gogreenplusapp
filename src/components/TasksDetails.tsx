// ==================================
// src/pages/employee/TaskDetails.tsx
// ==================================
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { useState } from "react";

// Dummy task source
const TASKS: Record<string, any> = {
    t1: {
        id: "t1",
        title: "Office Cleaning",
        address: "123 Elm Street, Springfield",
        description:
            "Clean and organize the office space, including dusting, vacuuming, and emptying trash bins.",
        date: "July 26, 2024",
        time: "9:00 AM - 12:00 PM",
    },
};

// Placeholder images (simulate photo capture)
const PLACEHOLDER_START =
    "https://images.unsplash.com/photo-1581574209460-5c58b0647249?w=400";
const PLACEHOLDER_END =
    "https://images.unsplash.com/photo-1562004760-aceed7bb0d5e?w=400";

export default function TaskDetails() {
    const { id = "t1" } = useParams();
    const t = TASKS[id];
    const navigate = useNavigate();

    const [status, setStatus] = useState<
        "pending" | "accepted" | "inprogress" | "completed"
    >("pending");

    const [startPhoto, setStartPhoto] = useState<string | null>(null);
    const [endPhoto, setEndPhoto] = useState<string | null>(null);

    // Simulate photo capture
    function simulateCapture() {
        if (status === "accepted") {
            setStartPhoto(PLACEHOLDER_START);
            setStatus("inprogress");
        } else if (status === "inprogress") {
            setEndPhoto(PLACEHOLDER_END);
            setStatus("completed");
            setTimeout(() => navigate("/emp/tasks"), 600);
        }
    }

    return (
        <div className="min-h-screen bg-[#F6F8F7] text-[#0F172A] pb-24">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-4 pt-6">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2">
                    <ArrowLeft />
                </button>
                <h1 className="text-2xl font-extrabold">Task Details</h1>
            </div>

            {/* Card */}
            <section className="px-4 mt-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-3xl font-extrabold">{t.title}</h2>
                        <div className="mt-3 flex items-center gap-2 text-emerald-900/70">
                            <MapPin className="h-5 w-5" />
                            <span className="text-base">{t.address}</span>
                        </div>
                        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                            {t.description}
                        </p>
                    </div>

                    <div className="border-t border-gray-100">
                        <div className="grid grid-cols-2">
                            <div className="p-4">
                                <p className="text-gray-500">Date</p>
                                <p className="font-semibold">{t.date}</p>
                            </div>
                            <div className="p-4 border-l border-gray-100">
                                <p className="text-gray-500">Time</p>
                                <p className="font-semibold">{t.time}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview captures */}
                {(startPhoto || endPhoto) && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {startPhoto && (
                            <div className="bg-white border border-gray-100 rounded-xl p-2">
                                <p className="text-xs text-gray-500 mb-1">
                                    Start photo
                                </p>
                                <img
                                    src={startPhoto}
                                    className="rounded-lg w-full h-28 object-cover"
                                />
                            </div>
                        )}
                        {endPhoto && (
                            <div className="bg-white border border-gray-100 rounded-xl p-2">
                                <p className="text-xs text-gray-500 mb-1">
                                    End photo
                                </p>
                                <img
                                    src={endPhoto}
                                    className="rounded-lg w-full h-28 object-cover"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="mt-8 space-y-3">
                    {status === "pending" && (
                        <>
                            <button
                                onClick={() => setStatus("accepted")}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-full shadow-sm"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => navigate("/emp/tasks")}
                                className="w-full bg-white text-emerald-900/70 border border-emerald-100 font-semibold py-4 rounded-full"
                            >
                                Reject
                            </button>
                        </>
                    )}

                    {status === "accepted" && (
                        <button
                            onClick={simulateCapture}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-full shadow-sm"
                        >
                            Start Task (Simulate Photo)
                        </button>
                    )}

                    {status === "inprogress" && (
                        <button
                            onClick={simulateCapture}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-full shadow-sm"
                        >
                            End Task (Simulate Photo)
                        </button>
                    )}

                    {status === "completed" && (
                        <button
                            onClick={() => navigate("/emp/tasks")}
                            className="w-full bg-emerald-500 text-white font-semibold py-4 rounded-full"
                        >
                            Done – Back to Tasks
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
}
