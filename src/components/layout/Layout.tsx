import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/hooks/useTheme";

type LayoutProps = {
    children: ReactNode;
};

const TICKER = [
    "REST API",
    "LARAVEL",
    "NEXT.JS",
    "REACT.JS",
    "TYPESCRIPT",
    "TAILWIND",
];

export default function Layout({ children }: LayoutProps) {
    const { isDark } = useTheme();

    return (
        <div className={`flex min-h-screen flex-col ${isDark ? "dark" : ""}`}>
            <div className="flex flex-grow flex-col text-nb-ink">
                <Header />

                {/* Ticker strip */}
                <div className="overflow-hidden border-b-3 border-nb-border bg-nb-pink">
                    <div className="flex w-max animate-marquee">
                        {[0, 1].map((copy) => (
                            <div
                                key={copy}
                                className="flex shrink-0 items-center py-1.5"
                                aria-hidden={copy === 1}
                            >
                                {TICKER.map((item) => (
                                    <span
                                        key={item}
                                        className="px-4 font-display text-xs uppercase tracking-widest text-black"
                                    >
                                        {item} <span className="px-2">★</span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <main className="mx-auto w-full max-w-5xl flex-grow px-4 py-12 sm:px-6 lg:px-8">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}
