export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = [
        {
            label: "GitHub",
            href: "https://github.com/Argapr",
            accent: "bg-nb-lime",
        },
        {
            label: "GitLab",
            href: "https://gitlab.com/argaprataman052",
            accent: "bg-nb-orange",
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/arga-pratama-589b242a3/",
            accent: "bg-nb-blue",
        },
    ];

    return (
        <footer className="border-t-3 border-nb-border bg-nb-bg">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-3">
                        <span className="border-3 border-black bg-nb-yellow px-3 py-1.5 font-display text-lg text-black shadow-ink-sm">
                            ARG_
                        </span>
                        <p className="font-bold uppercase tracking-wide text-nb-muted">
                            © {currentYear}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`nb-btn-accent ${link.accent}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
