import { useState } from "react";
import {
    Camera,
    Mail,
    User as UserIcon,
    ShieldCheck,
    Bell,
    Palette,
    LogOut,
} from "lucide-react";

export default function Profile() {
    const [name, setName] = useState("Alex Morgan");
    const [email, setEmail] = useState("alex.morgan@example.com");
    const role = "Employee";

    // Password form state
    const [showPassword, setShowPassword] = useState(false);
    const [curr, setCurr] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!curr || !next || !confirm)
            return setError("Please fill all fields.");
        if (next.length < 8)
            return setError("New password must be at least 8 characters.");
        if (next !== confirm) return setError("Passwords do not match.");

        // TODO: call API to change password
        setSuccess("Password updated successfully.");
        setCurr("");
        setNext("");
        setConfirm("");
    }

    return (
        <div className="min-h-screen bg-[var(--color-secondary-500)] text-[var(--color-text-500)] pb-24">
            {/* Profile Header */}
            <section className="bg-[var(--color-primary-500)] pt-8 pb-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-[var(--color-secondary-500)] flex items-center justify-center border-4 border-white shadow-lg">
                                <UserIcon className="w-12 h-12 text-[var(--color-mocha-500)]" />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-[var(--color-tertiary-500)] transition-colors">
                                <Camera className="w-4 h-4 text-[var(--color-mocha-500)]" />
                            </button>
                        </div>

                        {/* Name and Email */}
                        <div className="mt-4 text-center">
                            <h1 className="text-2xl font-bold text-white">{name}</h1>
                            <div className="flex items-center gap-2 mt-2 text-white/90">
                                <Mail className="w-4 h-4" />
                                <p className="text-sm">{email}</p>
                            </div>
                            <span className="inline-block mt-3 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium">
                                {role}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Basic Info Card */}
            <section className="px-6 -mt-12">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-[var(--color-primary-500)]" />
                        Basic Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="w-full bg-[var(--color-primary-500)] hover:bg-[#2d8c00] text-white font-semibold px-4 py-2 rounded-xl transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>

            {/* Settings cards */}
            <section className="px-6 mt-6 space-y-4 max-w-2xl mx-auto">
                {/* Change password */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-[var(--color-primary-500)]" />
                        <h2 className="text-lg font-semibold">Change Password</h2>
                    </div>
                    <form onSubmit={handlePasswordSubmit} className="mt-4 grid gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Current password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                                value={curr}
                                onChange={(e) => setCurr(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">New password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                                value={next}
                                onChange={(e) => setNext(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Confirm new password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                                <input 
                                    type="checkbox" 
                                    className="accent-[var(--color-primary-500)]" 
                                    checked={showPassword} 
                                    onChange={(e) => setShowPassword(e.target.checked)} 
                                />
                                Show password
                            </label>
                            <button 
                                type="submit" 
                                className="bg-[var(--color-primary-500)] hover:bg-[#2d8c00] text-white font-semibold px-4 py-2 rounded-xl transition-colors"
                            >
                                Update
                            </button>
                        </div>
                        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                        {success && <p className="text-sm text-[var(--color-primary-500)] mt-1">{success}</p>}
                    </form>
                </div>

                {/* Other settings */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="flex items-center gap-3 text-gray-800">
                            <Bell className="h-5 w-5 text-[var(--color-primary-500)]" />
                            Notifications
                        </span>
                        <span className="text-sm text-gray-500">Manage alerts</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="flex items-center gap-3 text-gray-800">
                            <Palette className="h-5 w-5 text-[var(--color-primary-500)]" />
                            Appearance
                        </span>
                        <span className="text-sm text-gray-500">Theme</span>
                    </button>
                    <div className="h-px bg-gray-100 mx-4" />
                    <button className="w-full flex items-center justify-between px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <span className="flex items-center gap-3">
                            <LogOut className="h-5 w-5" />
                            Log out
                        </span>
                    </button>
                </div>
            </section>
        </div>
    );
}