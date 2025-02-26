import React from "react";
import Link from "next/link";
import projectsData from "@/data/projects.json";

type FeaturedProject = {
    id: number;
    title: string;
    description: string;
    tools?: string[];
    image?: string;
};

const FeaturedProjects: React.FC = () => {
    // Filter to only get projects with id 1 and 2
    const projects: FeaturedProject[] = projectsData.filter(
        (project: FeaturedProject) => project.id === 1 || project.id === 2
    );

    // Icon mapping based on project ID
    const getProjectIcon = (id: number) => {
        switch (id) {
            case 1: // InStay
                return (
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600 dark:text-blue-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                );
            case 2: // MyMind
                return (
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-purple-600 dark:text-purple-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"></path>
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-600 dark:text-green-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
            </h2>

            <div className="space-y-4">
                {projects.map((project) => (
                    <Link href={`/project/${project.id}`} key={project.id}>
                        <div className="group flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 cursor-pointer">
                            <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                {getProjectIcon(project.id)}
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-gray-900 dark:text-white font-medium text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition duration-200">
                                    {project.title}
                                </h3>
                                {project.description && (
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                        {project.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex-shrink-0 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 18l6-6-6-6"></path>
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProjects;
