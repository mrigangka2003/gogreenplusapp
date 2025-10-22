import { X } from "lucide-react";
import { useForm } from "react-hook-form";

type RaiseRequestForm = {
    locality: string;
    description: string;
};

export default function RaiseRequest({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: RaiseRequestForm) => void;
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RaiseRequestForm>();

    if (!open) return null;

    const submit = handleSubmit(async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    });

    return (
        <div className="fixed inset-0 bottom-20 z-50 flex items-end justify-center">
            {/* overlay */}
            <button
                aria-label="Close"
                onClick={onClose}
                className="absolute inset-0 bg-black/50"
            />
            {/* sheet */}
            <div className="w-full max-w-md bg-white rounded-t-3xl p-6 animate-slide-up relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-text-500">
                        Raise Request
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-mocha-500 hover:opacity-80 p-1 rounded"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* Raise by locality */}
                    <div>
                        <label className="block text-sm font-medium text-text-500 mb-2">
                            Raise by locality
                        </label>
                        <input
                            {...register("locality", {
                                required: "Locality is required",
                            })}
                            placeholder="e.g., Neermahal, Palace Compound"
                            className="w-full px-4 py-3 rounded-lg bg-tertiary-500 text-text-500 placeholder-mocha-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.locality && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.locality.message}
                            </p>
                        )}
                    </div>

                    {/* What to do */}
                    <div>
                        <label className="block text-sm font-medium text-text-500 mb-2">
                            What to do
                        </label>
                        <textarea
                            {...register("description", {
                                required: "Please describe the work",
                            })}
                            rows={4}
                            placeholder="Describe the issue or work needed..."
                            className="w-full px-4 py-3 rounded-lg bg-tertiary-500 text-text-500 placeholder-mocha-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}
