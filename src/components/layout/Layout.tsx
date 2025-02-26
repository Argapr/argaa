import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/hooks/useTheme";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
            <div className="flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                <Header />
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
