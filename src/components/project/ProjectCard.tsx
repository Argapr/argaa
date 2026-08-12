import Image from "next/image";
import Link from "next/link";
import { accentFor } from "@/utils/accent";

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    tools: string[];
    githubUrl: string;
    isFeatured?: boolean;
}

const GithubIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-github"
    >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const ProjectCard = ({
    id,
    title,
    description,
    image,
    tools,
    githubUrl,
    isFeatured = false,
}: ProjectCardProps) => {
    if (isFeatured) {
        return (
            <div className="nb-card nb-card-hover overflow-hidden">
                <div className="relative h-72 w-full overflow-hidden border-b-3 border-nb-border sm:h-96">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <span className="absolute left-4 top-4 nb-label bg-nb-yellow">
                        Featured
                    </span>
                </div>

                <div className="p-6">
                    <div className="mb-3 flex items-start justify-between gap-4">
                        <h3 className="nb-heading text-2xl sm:text-3xl">
                            {title}
                        </h3>
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 border-3 border-nb-border bg-nb-surface p-2 text-nb-ink shadow-nb-sm transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-nb"
                            aria-label="View on GitHub"
                        >
                            <GithubIcon size={20} />
                        </Link>
                    </div>

                    <p className="mb-4 text-nb-muted">{description}</p>

                    <div className="flex flex-wrap gap-2">
                        {tools.map((tool) => (
                            <span
                                key={tool}
                                className={`nb-tag ${accentFor(tool)}`}
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const hideGithubLink = id === 2 || id === 4 || id === 9;

    return (
        <div className="nb-card nb-card-hover flex h-full flex-col overflow-hidden">
            <div className="relative h-44 w-full overflow-hidden border-b-3 border-nb-border">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>

            <div className="flex flex-grow flex-col p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="nb-heading text-lg">{title}</h3>
                    {!hideGithubLink && (
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 border-2 border-nb-border bg-nb-surface p-1.5 text-nb-ink shadow-nb-sm transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-nb"
                            aria-label="View on GitHub"
                        >
                            <GithubIcon size={16} />
                        </Link>
                    )}
                </div>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {tools.slice(0, 3).map((tool) => (
                        <span key={tool} className={`nb-tag ${accentFor(tool)}`}>
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
