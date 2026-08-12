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
            "React Native",
            "Next.js",
            "Vue.js",
            "Laravel",
            "Flutter",
            "TailwindCSS",
            "Zustand",
            "Tauri",
        ],
    },
    {
        title: "Tools & Platforms",
        accent: "bg-nb-blue",
        items: ["Git", "GitLab", "VS Code", "Vercel", "GCP (Google Cloud Platform)", "Postman"],
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
                        Jakarta, Indonesia
                    </span>

                    <h1 className="nb-heading mt-5 text-5xl sm:text-6xl">
                        Arga
                        <br />
                        Pratama
                    </h1>

                    <h2 className="mt-4 inline-block border-3 border-nb-border bg-nb-surface px-3 py-1.5 font-display text-sm uppercase tracking-widest shadow-nb-sm">
                        Full Stack Developer
                    </h2>

                    <div className="mt-8 border-l-5 border-nb-border pl-5">
                        <p className="leading-relaxed text-nb-muted">
                            I'm a Full Stack Developer with a strong passion for
                            building products that solve real problems. I enjoy
                            crafting intuitive, modern interfaces and pairing
                            them with well-structured, reliable backend systems.
                            I care about the full picture — from how a user
                            interacts with a product to how it performs under
                            the hood — and I'm driven to deliver work that's
                            both functional and thoughtfully designed, from idea
                            to deployment.
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
                                                item,
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
