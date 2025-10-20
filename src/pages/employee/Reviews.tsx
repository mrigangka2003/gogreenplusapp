import { MessageSquare } from "lucide-react";

export function EmployeeReviews() {
    // TODO: swap with reviews data from API
    const reviews: Array<{
        id: string;
        author: string;
        text: string;
        rating: number;
    }> = [];

    return (
        <div className="min-h-screen bg-[#F6F8F7] text-[#0F172A] pb-24 px-6 pt-8">
            <h1 className="text-3xl font-extrabold">Reviews</h1>

            {reviews.length === 0 ? (
                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                        <MessageSquare className="h-10 w-10" />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold">No Reviews Yet</h3>
                    <p className="mt-2 text-gray-500 max-w-xs">
                        You'll see feedback from users here.
                    </p>
                </div>
            ) : (
                <ul className="mt-6 space-y-3">
                    {reviews.map((r) => (
                        <li
                            key={r.id}
                            className="bg-white rounded-xl border border-gray-100 p-4"
                        >
                            <div className="flex items-baseline justify-between">
                                <p className="font-semibold">{r.author}</p>
                                <p className="text-sm">
                                    ⭐ {r.rating.toFixed(1)}
                                </p>
                            </div>
                            <p className="mt-2 text-gray-600">{r.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
