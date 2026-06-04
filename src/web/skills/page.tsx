// app/skills/page.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Metadata } from "vatts/react";

interface Skill {
    name: string;
    description?: string;
}

interface SkillCategory {
    title: string;
    colorClass: string;
    badgeClass: string;
    skills: Skill[];
}

interface SkillCategoryProps {
    category: SkillCategory;
}

const SkillCategoryComponent: React.FC<SkillCategoryProps> = ({ category }) => (
    <section className="space-y-3">
        <div>
            <h2
                className={`text-xs font-mono uppercase tracking-[0.25em] font-semibold ${category.colorClass}`}
            >
                {category.title}
            </h2>
        </div>

        <div className="flex flex-wrap gap-2">
            {category.skills.map(skill => (
                <span
                    key={skill.name}
                    className={`text-sm font-light px-3 py-1.5 rounded-md transition-all duration-200 ${category.badgeClass}`}
                >
                    {skill.name}
                </span>
            ))}
        </div>
    </section>
);

export default function SkillsPage() {
    const { t } = useTranslation();

    // Puxando a estrutura de categorias de skills diretamente do JSON de tradução
    const skillsData = t('skillsData', { returnObjects: true }) as SkillCategory[];

    return (
        <div className="max-w-3xl space-y-12">
            <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                    {t('skills.title')}
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 font-light">
                    {t('skills.description')}
                </p>
            </div>

            <div className="space-y-10">
                {Array.isArray(skillsData) && skillsData.map(category => (
                    <SkillCategoryComponent
                        key={category.title}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
}

export function generateMetadata(): Metadata {
    return {
        title: 'Skills | Murillo Frazão'
    }
}