import Layout from "@/components/layout/Layout";
import { accentFor } from "@/utils/accent";

const SKILL_GROUPS = [
    {
        title: "Languages",
        accent: "bg-nb-yellow",
        items: [
            "PHP",
            "JavaScript",
            "TypeScript",
            "Dart",
            "Python",
            "HTML",
            "CSS",
        ],
    },
    {
        title: "Frameworks & Libraries",
        accent: "bg-nb-pink",
        items: [
            "React.js",
            "Next.js",
            "Vue.js",
            "Laravel",
            "Flutter",
            "TailwindCSS",
        ],
    },
    {
        title: "Tools & Platforms",
        accent: "bg-nb-blue",
        items: ["Git", "GitLab", "VS Code", "Vercel"],
    },
    {
        title: "Databases",
        accent: "bg-nb-lime",
        items: ["MySQL", "PostgreSQL", "MongoDB"],
    },
];

export default function About() {
    return (
        <Layout>
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                {/* Kiri: profil */}
                <div>
                    <span className="nb-label bg-nb-orange">
                        Bandung, Indonesia
                    </span>

                    <h1 className="nb-heading mt-5 text-5xl sm:text-6xl">
                        Arga
                        <br />
                        Pratama
                    </h1>

                    <h2 className="mt-4 inline-block border-3 border-nb-border bg-nb-surface px-3 py-1.5 font-display text-sm uppercase tracking-widest shadow-nb-sm">
                        Web Developer
                    </h2>

                    <div className="mt-8 border-l-5 border-nb-border pl-5">
                        <p className="leading-relaxed text-nb-muted">
                            I am a Web Developer with a strong passion for
                            creating engaging and impactful website experiences.
                            I enjoy designing modern, user-friendly interfaces
                            and combining them with well-structured backend
                            development.
                        </p>
                        <p className="mt-4 leading-relaxed text-nb-muted">
                            My focus lies in ensuring seamless connections
                            between every aspect of a website — from UI design
                            and user interactions to API integrations —
                            delivering results that are both visually appealing
                            and highly functional.
                        </p>
                    </div>

                    <div className="pt-8">
                        <a
                            href="/CV - Arga pratama.pdf"
                            download
                            className="nb-btn-accent bg-nb-yellow"
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
                                    strokeWidth={2.5}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Kanan: skills */}
                <div>
                    <h2 className="nb-heading mb-8 text-3xl">
                        Technical Skills
                    </h2>

                    <div className="space-y-6">
                        {SKILL_GROUPS.map((group) => (
                            <div key={group.title} className="nb-card p-5">
                                <h3
                                    className={`-mx-5 -mt-5 mb-4 border-b-3 border-black ${group.accent} px-5 py-2 font-display text-xs uppercase tracking-widest text-black`}
                                >
                                    {group.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className={`nb-tag ${accentFor(
                                                item
                                            )}`}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
