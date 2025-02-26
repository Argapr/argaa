// src/pages/project.tsx
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import Projects from "@/components/project/Projects";

const ProjectPage: NextPage = () => {

    return (
        <Layout>
            <Projects />
        </Layout>
    );
};

export default ProjectPage;
