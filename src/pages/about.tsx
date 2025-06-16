import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

export default function About() {
    const { isDark } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Untuk menghindari hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/images/avatar.jpeg"
                    alt="Arga Pratama"
                    width={128}
                    height={128}
                    className="rounded-full border-2 border-white mb-6 object-cover"
                />
                <h1 className="text-4xl font-bold mb-6">Arga Pratama</h1>
                <p className="text-center max-w-2xl mb-10">
                    I am an 18-year-old fresh graduate and a detail-oriented,
                    passionate web developer with hands-on experience in
                    building full-stack web applications using modern JavaScript
                    technologies such as React, Next.js, Node.js, and Laravel. I
                    have a strong interest in creating robust backend services
                    and user-friendly interfaces, with a particular focus on
                    performance, scalability, and maintainability. Highly
                    motivated to grow professionally, I am ready to contribute
                    in both remote and on-site work environments.
                </p>
                <a
                    href="/CV_Arga-pratama.pdf"
                    download
                    className={`${
                        isDark
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-black text-white hover:bg-gray-800"
                    } px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2`}
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
        </Layout>
    );
}
