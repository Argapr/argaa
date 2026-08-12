import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Header() {
    const { isDark, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const menuItems = [
        { title: "Home", path: "/", accent: "bg-nb-yellow" },
        { title: "Blog", path: "/blog", accent: "bg-nb-pink" },
        { title: "Project", path: "/project", accent: "bg-nb-blue" },
        { title: "About", path: "/about", accent: "bg-nb-lime" },
    ];

    const isActive = (path: string) =>
        path === "/" ? router.pathname === "/" : router.pathname.startsWith(path);

    return (
        <header className="sticky top-0 z-20 border-b-3 border-nb-border bg-nb-bg">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="border-3 border-black bg-nb-yellow px-3 py-1.5 font-display text-2xl text-black shadow-ink transition-transform duration-100 hover:-rotate-2"
                    >
                        ARG_
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-2 md:flex">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`border-3 px-3 py-1.5 text-sm font-bold uppercase tracking-wide transition-all duration-100 ${
                                    isActive(item.path)
                                        ? `border-black ${item.accent} text-black shadow-ink-sm`
                                        : "border-transparent text-nb-ink hover:border-nb-border hover:shadow-nb-sm"
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="ml-2 border-3 border-nb-border bg-nb-surface p-2 text-nb-ink shadow-nb-sm transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-nb active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="border-3 border-nb-border bg-nb-surface p-2 text-nb-ink shadow-nb-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="border-3 border-black bg-nb-yellow p-2 text-black shadow-ink-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="mb-4 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`block border-3 px-4 py-3 text-base font-bold uppercase tracking-wide ${
                                        isActive(item.path)
                                            ? `border-black ${item.accent} text-black shadow-ink-sm`
                                            : "border-nb-border bg-nb-surface text-nb-ink shadow-nb-sm"
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
