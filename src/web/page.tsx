import React from 'react';
import { useTranslation } from 'react-i18next';
import { Metadata } from "nytlex/react";

export default function AboutPage() {
    const { t } = useTranslation();

    const personalInfo = t('personalInfo', { returnObjects: true }) as any;
    const experienceData = t('experienceData', { returnObjects: true }) as any[];
    const educationData = t('educationData', { returnObjects: true }) as any[];
    const certificationsData = t('certificationsData', { returnObjects: true }) as any[];

    const quickLinks = [
        { name: t('about.quickLinks.story'), href: '#story' },
        { name: t('about.quickLinks.experience'), href: '#experience' },
        { name: t('about.quickLinks.education'), href: '#education' },
        { name: t('about.quickLinks.certifications', { defaultValue: 'Certificados' }), href: '#certifications' }
    ];

    return (
        <div className="space-y-16 max-w-3xl text-neutral-300 scroll-smooth">

            {/* Botões de Navegação Rápida (Âncoras Internas) */}
            <div className="flex flex-wrap gap-3 text-xs font-mono">
                {quickLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400 hover:text-[#10B981] px-3 py-1.5 rounded transition-all duration-200"
                    >
                        {link.name} →
                    </a>
                ))}
            </div>

            {/* Seção Sobre / Bio */}
            <section id="story" className="space-y-6 font-light leading-relaxed scroll-mt-24">
                {/* Título do Texto */}
                <h3 className="text-xl font-medium text-neutral-100 tracking-tight">
                    {t('about.storyTitle')}
                </h3>
                <div className="space-y-6">
                    {personalInfo?.bio?.map((paragraph: string, index: number) => (
                        <p key={index} className="text-sm md:text-base text-neutral-400">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            {/* Seção de Experiência */}
            <section id="experience" className="space-y-6 scroll-mt-24">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                    {t('about.experienceTitle')}
                </h3>
                <div className="space-y-8">
                    {Array.isArray(experienceData) && experienceData.map((exp, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div className="space-y-1">
                                <h4 className="text-base font-medium text-neutral-100">{exp.role}</h4>
                                <p className="text-sm font-mono text-neutral-500">{exp.company}</p>
                                <p className="text-sm text-neutral-400 font-light max-w-xl mt-2 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                            <span className="text-xs font-mono text-neutral-600 md:text-right shrink-0">
                                {exp.period}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção de Educação */}
            <section id="education" className="space-y-6 scroll-mt-24">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                    {t('about.educationTitle')}
                </h3>
                <div className="space-y-6">
                    {Array.isArray(educationData) && educationData.map((edu, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div className="space-y-0.5">
                                <h4 className="text-base font-medium text-neutral-100">{edu.degree}</h4>
                                <p className="text-sm font-mono text-neutral-500">{edu.institution}</p>
                            </div>
                            <span className="text-xs font-mono text-neutral-600 md:text-right shrink-0">
                                {edu.period}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção de Certificados */}
            <section id="certifications" className="space-y-6 scroll-mt-24">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                    {t('resume.labels.certificationsTitle', { defaultValue: 'Certificações' })}
                </h3>
                <div className="space-y-6">
                    {Array.isArray(certificationsData) && certificationsData.map((cert, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div className="space-y-1">
                                <h4 className="text-base font-medium text-neutral-100">{cert.degree}</h4>
                                <p className="text-sm font-mono text-neutral-500">{cert.institution}</p>
                                {cert.description && (
                                    <p className="text-sm text-neutral-400 font-light max-w-xl mt-2 leading-relaxed">
                                        {cert.description}
                                    </p>
                                )}
                            </div>
                            <span className="text-xs font-mono text-neutral-600 md:text-right shrink-0">
                                {cert.period}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export function generateMetadata(): Metadata {
    return {
        title: 'Home | Murillo Frazão Cunha'
    }
}