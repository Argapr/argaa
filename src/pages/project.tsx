// src/pages/project.tsx
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import Projects from "@/components/project/Projects";
import { useTheme } from "@/hooks/useTheme";

const ProjectPage: NextPage = () => {
    const { isDark } = useTheme();

    return (
        <Layout>
            <Projects />
        </Layout>
    );
};

export default ProjectPage;
