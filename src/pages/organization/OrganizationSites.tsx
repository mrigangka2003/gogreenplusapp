import { useState } from "react";
import { MapPin, Plus, Search, Building2, Trash2 } from "lucide-react";

interface Site {
    id: string;
    name: string;
    address: string;
    city: string;
    addedDate: string;
}

export default function OrganizationSites() {
    const [sites, setSites] = useState<Site[]>([
        {
            id: "1",
            name: "Headquarters",
            address: "123 Main Street",
            city: "Agartala",
            addedDate: "2024-01-15",
        },
        {
            id: "2",
            name: "East Branch",
            address: "456 Palace Compound",
            city: "Agartala",
            addedDate: "2024-03-20",
        },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSite, setNewSite] = useState({
        name: "",
        address: "",
        city: "",
    });

    const filteredSites = sites.filter(
        (site) =>
            site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            site.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            site.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddSite = () => {
        if (
            newSite.name.trim() &&
            newSite.address.trim() &&
            newSite.city.trim()
        ) {
            const site: Site = {
                id: Date.now().toString(),
                name: newSite.name.trim(),
                address: newSite.address.trim(),
                city: newSite.city.trim(),
                addedDate: new Date().toISOString().split("T")[0],
            };
            setSites([...sites, site]);
            setNewSite({ name: "", address: "", city: "" });
            setShowAddModal(false);
        }
    };

    const handleDeleteSite = (id: string) => {
        if (confirm("Are you sure you want to delete this site?")) {
            setSites(sites.filter((site) => site.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-tertiary-500 pb-24 max-w-md mx-auto">
            {/* Header */}
            <div className="bg-primary-500 px-5 pt-6 pb-8 rounded-b-3xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-white">
                        <Building2 size={20} />
                        <span className="font-medium text-sm">
                            Organization
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white leading-tight mb-2">
                    Site Locations
                </h1>
                <p className="text-white text-sm opacity-90">
                    Manage all your localities
                </p>
            </div>

            {/* Stats Card */}
            <div className="px-5 -mt-6 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-primary-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-mocha-500 text-sm font-medium">
                                Total Sites
                            </p>
                            <p className="text-text-500 text-2xl font-bold">
                                {sites.length}
                            </p>
                        </div>
                        <div className="bg-primary-500 bg-opacity-10 p-3 rounded-lg">
                            <MapPin className="text-primary-500" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-5 mb-6">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-mocha-500"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search sites..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 text-text-500 placeholder-mocha-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Sites List */}
            <div className="px-5">
                <h2 className="text-text-500 font-semibold text-lg mb-4">
                    All Sites
                </h2>
                {filteredSites.length > 0 ? (
                    <div className="space-y-3">
                        {filteredSites.map((site) => (
                            <div
                                key={site.id}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="bg-primary-500 bg-opacity-10 p-2 rounded-lg mt-1">
                                            <MapPin
                                                className="text-primary-500"
                                                size={20}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-text-500 text-base mb-1">
                                                {site.name}
                                            </h3>
                                            <p className="text-sm text-mocha-500 mb-1">
                                                {site.address}
                                            </p>
                                            <p className="text-sm text-mocha-500">
                                                {site.city}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeleteSite(site.id)
                                        }
                                        className="text-mocha-500 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-mocha-500">
                                        Added on{" "}
                                        {new Date(
                                            site.addedDate
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl">
                        <MapPin
                            className="mx-auto mb-3 text-mocha-500"
                            size={48}
                        />
                        <p className="text-mocha-500 text-sm">No sites found</p>
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <button
                className="fixed bottom-6 right-6 bg-primary-500 text-white rounded-full px-6 py-4 shadow-lg flex items-center gap-2 font-medium text-sm hover:opacity-90 transition-opacity active:scale-95"
                onClick={() => setShowAddModal(true)}
            >
                <Plus size={20} />
                Add Site
            </button>

            {/* Add Site Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-text-500">
                                Add New Site
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewSite({
                                        name: "",
                                        address: "",
                                        city: "",
                                    });
                                }}
                                className="text-mocha-500 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-500 mb-2">
                                    Site Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., North Branch"
                                    value={newSite.name}
                                    onChange={(e) =>
                                        setNewSite({
                                            ...newSite,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-lg bg-tertiary-500 text-text-500 placeholder-mocha-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-500 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., 789 Park Avenue"
                                    value={newSite.address}
                                    onChange={(e) =>
                                        setNewSite({
                                            ...newSite,
                                            address: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-lg bg-tertiary-500 text-text-500 placeholder-mocha-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-500 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Agartala"
                                    value={newSite.city}
                                    onChange={(e) =>
                                        setNewSite({
                                            ...newSite,
                                            city: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-lg bg-tertiary-500 text-text-500 placeholder-mocha-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <button
                                onClick={handleAddSite}
                                className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-6"
                            >
                                Add Site
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
