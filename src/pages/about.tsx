import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTheme } from "@/hooks/useTheme";

export default function About() {
    const { isDark } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const languages = [
        "PHP",
        "JavaScript",
        "TypeScript",
        "Dart",
        "Python",
        "HTML",
        "CSS",
    ];
    const frameworks = [
        "React.js",
        "Next.js",
        "Vue.js",
        "Laravel",
        "Flutter",
        "TailwindCSS",
    ];
    const tools = ["Git", "GitLab", "VS Code", "Vercel"];
    const databases = ["MySQL", "PostgreSQL", "MongoDB"];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl font-bold mb-8 tracking-tight">
                                Arga Pratama
                            </h1>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        WEB DEVELOPER
                                    </h2>
                                    <div
                                        className={`text-sm mb-6 ${
                                            isDark
                                                ? "text-gray-400"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        Bandung, Indonesia
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className={`w-2 h-2 ${
                                                isDark
                                                    ? "bg-green-400"
                                                    : "bg-gray-700"
                                            } rounded-full mt-2 flex-shrink-0`}
                                        ></div>
                                        <p
                                            className={`${
                                                isDark
                                                    ? "text-gray-300"
                                                    : "text-gray-700"
                                            } leading-relaxed`}
                                        >
                                            I am a Web Developer with a strong
                                            passion for creating engaging and
                                            impactful website experiences. I
                                            enjoy designing modern,
                                            user-friendly interfaces and
                                            combining them with well-structured
                                            backend development. <br /> My focus lies
                                            in ensuring seamless connections
                                            between every aspect of a
                                            website from UI design and user
                                            interactions to API
                                            integrations delivering results that
                                            are both visually appealing and
                                            highly functional.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <a
                                        href="/CV - Arga pratama.pdf"
                                        download
                                        className={`${
                                            isDark
                                                ? "bg-white text-black hover:bg-gray-200"
                                                : "bg-black text-white hover:bg-gray-800"
                                        } px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 w-fit hover:scale-105 hover:shadow-lg`}
                                    >
                                        <span>Download CV</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <h1 className="text-3xl font-bold mb-8 tracking-tight">
                            Technical Skills
                        </h1>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold tracking-wider">
                                LANGUAGES
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {languages.map((lang, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                            isDark
                                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold tracking-wider">
                                FRAMEWORKS & LIBRARIES
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {frameworks.map((framework, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                            isDark
                                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {framework}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold tracking-wider">
                                TOOLS & PLATFORMS
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {tools.map((tool, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                            isDark
                                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold tracking-wider">
                                DATABASES
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {databases.map((db, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                            isDark
                                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {db}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
