import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '../components/ProjectCard';
import { Metadata } from "vatts/react";

export default function ProjectsPage() {
    const { t } = useTranslation();

    // Puxando o array de projetos diretamente do JSON de tradução
    const projectsData = t('projects', { returnObjects: true }) as any[];

    return (
        <div className="space-y-6">
            {Array.isArray(projectsData) && projectsData.map(p => (
                <ProjectCard key={p.title} project={p} />
            ))}
        </div>
    );
}

export function generateMetadata(): Metadata {
    return {
        title: 'Projects | Murillo Frazão'
    }
}