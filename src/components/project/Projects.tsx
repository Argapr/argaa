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
        <div className="py-12">
            <div className="container mx-auto px-4">
                <AnimatedSection className="mb-16">
                    <ProjectCard {...projects[0]} isFeatured={true} />
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
    );
};

export default Projects;
