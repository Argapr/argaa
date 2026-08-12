import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tools: string[];
    githubUrl: string;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const projectsData = await import("@/data/projects.json");
                setProjects(projectsData.default);
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        };

        loadProjects();
    }, []);

    if (projects.length === 0) return null;

    return (
        <div>
            <div className="mb-10">
                <span className="nb-label bg-nb-blue">Portfolio</span>
                <h1 className="nb-heading mt-4 text-5xl sm:text-6xl">
                    Projects
                </h1>
                <p className="mt-4 max-w-xl text-nb-muted">
                    Here are a few of the things I&apos;ve built.
                </p>
            </div>

            <AnimatedSection className="mb-14">
                <ProjectCard {...projects[0]} isFeatured={true} />
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.slice(1).map((project, index) => (
                    <AnimatedSection
                        key={project.id}
                        className={`delay-${100 * (index + 1)}`}
                    >
                        <ProjectCard {...project} />
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
};

export default Projects;
