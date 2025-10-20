import * as React from "react";
import { Home, ListChecks, User as UserIcon, PartyPopper } from "lucide-react";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
};

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    className = "",
    children,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-base font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
        primary:
            "text-white shadow-md bg-[var(--color-primary-500)] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-[var(--color-primary-500)]",
        secondary:
            "text-[var(--color-text-500)] bg-[var(--color-secondary-500)] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-[var(--color-primary-500)]",
        ghost: "text-[var(--color-primary-500)] bg-transparent hover:bg-black/5",
    };

    return (
        <button
            className={[base, variants[variant], className].join(" ")}
            {...props}
        >
            {children}
        </button>
    );
};

type CardProps = React.HTMLAttributes<HTMLDivElement> & { hover?: boolean };
const Card: React.FC<CardProps> = ({
    hover = false,
    className = "",
    ...props
}) => (
    <div
        className={[
            "rounded-3xl border bg-white p-5 shadow-sm",
            // subtle border that adapts to light UI
            "border-black/5",
            hover ? "transition hover:shadow-lg" : "",
            className,
        ].join(" ")}
        {...props}
    />
);

const IconCircle: React.FC<
    { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className = "", ...props }) => (
    <div
        className={[
            "grid h-16 w-16 place-items-center rounded-full",
            "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]",
            className,
        ].join(" ")}
        {...props}
    >
        {children}
    </div>
);

// ---- Bottom Tab Bar --------------------------------------------------------

type TabKey = "home" | "tasks" | "profile";

const TabBar: React.FC<{ current: TabKey; onChange?: (k: TabKey) => void }> = ({
    current,
    onChange,
}) => {
    const Item: React.FC<{
        id: TabKey;
        label: string;
        icon: React.ReactNode;
    }> = ({ id, label, icon }) => {
        const active = current === id;
        return (
            <button
                aria-selected={active}
                onClick={() => onChange?.(id)}
                className={[
                    "flex flex-1 flex-col items-center justify-center gap-1 py-2",
                    active
                        ? "text-[var(--color-primary-500)]"
                        : "text-gray-500",
                ].join(" ")}
            >
                {icon}
                <span className="text-xs leading-none">{label}</span>
            </button>
        );
    };

    return (
        <nav
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-sm border-t border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
            role="tablist"
        >
            <div className="mx-auto grid max-w-sm grid-cols-3">
                <Item
                    id="home"
                    label="Home"
                    icon={<Home className="h-6 w-6" />}
                />
                <Item
                    id="tasks"
                    label="Tasks"
                    icon={<ListChecks className="h-6 w-6" />}
                />
                <Item
                    id="profile"
                    label="Profile"
                    icon={<UserIcon className="h-6 w-6" />}
                />
            </div>
        </nav>
    );
};

// ---- Screen ----------------------------------------------------------------

export default function MobileHome() {
    const [tab, setTab] = React.useState<TabKey>("home");

    return (
        <div className="mx-auto min-h-screen max-w-sm bg-[var(--color-tertiary-500)] text-[var(--color-text-500)]">
            {/* top padding to avoid notch overlap */}
            <div className="px-5 pb-28 pt-6">
                {/* bottom padding for tab bar */}
                {/* Header */}
                <header className="mb-6 flex items-start justify-between">
                    <div className="space-y-1">
                        <p className="text-sm text-black/60">Welcome back,</p>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Alex Morgan
                        </h1>
                    </div>
                    <Button
                        aria-label="Profile"
                        variant="secondary"
                        className="h-12 w-12 rounded-full p-0 shadow-sm ring-0"
                    >
                        <UserIcon className="h-6 w-6 text-[var(--color-primary-500)]" />
                    </Button>
                </header>

                {/* Section Title */}
                <h2 className="mb-4 text-2xl font-semibold">Pending Tasks</h2>

                {/* Empty state card */}
                <Card className="mb-6 bg-white shadow-md">
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                        <IconCircle>
                            <PartyPopper className="h-8 w-8" />
                        </IconCircle>
                        <h3 className="text-xl font-semibold">
                            No Pending Tasks 🎉
                        </h3>
                        <p className="max-w-[20ch] text-balance text-gray-600">
                            You're all caught up! Enjoy your day.
                        </p>
                    </div>
                </Card>

                {/* CTA */}
                <Button className="w-full shadow-lg">View My Tasks</Button>
            </div>

            <TabBar current={tab} onChange={setTab} />
        </div>
    );
}
