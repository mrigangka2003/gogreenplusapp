import { NavLink } from "react-router-dom";
import {
    Home,
    CalendarCheck,
    Star,
    User,
    Users,
    ClipboardPlus,
    Settings,
    HomeIcon,
    ListCheck,
} from "lucide-react";
import React from "react";

interface SideBar {
    title: string;
    path: string;
    icon: React.ReactNode;
}

// ---- Sidebar items per role ---- //
const userSidebarContent: SideBar[] = [
    { title: "Book Now", path: "book-now", icon: <Home size={20} /> },
    {
        title: "My Bookings",
        path: "my-bookings",
        icon: <CalendarCheck size={20} />,
    },
    { title: "Reviews", path: "my-reviews", icon: <Star size={20} /> },
    { title: "Profile", path: "profile/:id", icon: <User size={20} /> },
];

const adminSidebarContent: SideBar[] = [
    { title: "Bookings", path: "current-bookings", icon: <Users size={20} /> },
    { title: "All Users", path: "all-users", icon: <Users size={20} /> },
    {
        title: "Past Bookings",
        path: "past-bookings",
        icon: <ClipboardPlus size={20} />,
    },
    {
        title: "Add Management",
        path: "add-management",
        icon: <Settings size={20} />,
    },
    { title: "Profile", path: "profile/:id", icon: <User size={20} /> },
];

const orgSidebarContent: SideBar[] = [
    { title: "Home", path: "home", icon: <Home size={20} /> },
    {
        title: "Sites",
        path: "our-sites",
        icon: <CalendarCheck size={20} />,
    },
    { title: "Profile", path: "profile", icon: <User size={20} /> },
    { title: "Logout", path: "logout", icon: <User size={20} /> },
];

export const empSidebarContent: SideBar[] = [
    { title: "Home", path: "home", icon: <HomeIcon size={20} /> },
    { title: "Tasks", path: "tasks", icon: <ListCheck size={20} /> },
    { title: "Reviews", path: "reviews", icon: <User size={20} /> },
    { title: "Profile", path: "profile", icon: <User size={20} /> },
];

// ---- Role types ---- //
type UserRole = "user" | "admin" | "org" | "emp";

const bottombar: Record<UserRole, SideBar[]> = {
    user: userSidebarContent,
    admin: adminSidebarContent,
    org: orgSidebarContent,
    emp: empSidebarContent,
};

// ---- Component ---- //
const BottomBar = ({ UserRoles }: { UserRoles: UserRole }) => {
    const items = bottombar[UserRoles];

    return (
        <nav
            className="
        fixed bottom-0 w-full flex justify-around items-center
        bg-[var(--color-secondary-500)] 
        border-t-2 border-[var(--color-primary-500)]
        py-3 z-50
        md:hidden
        shadow-[0_-4px_12px_rgba(56,176,0,0.1)]
      "
        >
            {items.map((item) => (
                <NavLink
                    key={item.path}
                    to={`${item.path}`}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all duration-300 px-3 py-1.5 rounded-lg
            ${
                isActive
                    ? "text-[var(--color-primary-500)] bg-[var(--color-tertiary-500)] shadow-sm scale-105"
                    : "text-[var(--color-mocha-500)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-tertiary-500)]/50"
            }`
                    }
                >
                    <div className="transition-transform duration-300">
                        {item.icon}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase">
                        {item.title}
                    </span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomBar;
