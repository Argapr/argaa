// src/components/project/Projects.tsx
import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

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
        // Load the projects data
        const loadProjects = async () => {
            try {
                // In a real app, you'd probably fetch this from an API
                // For simplicity, we're importing it directly
                const projectsData = await import("@/data/projects.json");
                setProjects(projectsData.default);
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        };

        loadProjects();
    }, []);

    return (
        <div className={`py-12 `}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            tools={project.tools}
                            githubUrl={project.githubUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
