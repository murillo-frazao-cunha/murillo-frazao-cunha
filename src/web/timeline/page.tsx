import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Metadata } from "vatts/react";

interface TimelineItem {
    title: string;
    subtitle: string;
    period: string;
    description?: string;
    type: 'work' | 'education' | 'certification';
    isCurrent: boolean;
}

export default function TimelinePage() {
    const { t } = useTranslation();
    const today = new Date();
    const currentMonthYear = today.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

    // Puxando os dados dinâmicos do i18n
    const experienceData = t('experienceData', { returnObjects: true }) as any[];
    const educationData = t('educationData', { returnObjects: true }) as any[];
    const certificationsData = t('certificationsData', { returnObjects: true }) as any[];
    const presentKeyword = t('timeline.presentKeyword');

    const allItems: TimelineItem[] = [
        ...(Array.isArray(experienceData) ? experienceData.map(exp => ({
            title: exp.role,
            subtitle: exp.company,
            period: exp.period,
            description: exp.description,
            type: 'work' as const,
            isCurrent: exp.period.includes(presentKeyword)
        })) : []),
        ...(Array.isArray(educationData) ? educationData.map(edu => ({
            title: edu.degree,
            subtitle: edu.institution,
            period: edu.period,
            description: edu.description,
            type: 'education' as const,
            isCurrent: edu.period.includes(presentKeyword)
        })) : []),
        ...(Array.isArray(certificationsData) ? certificationsData.map(cert => ({
            title: cert.degree,
            subtitle: cert.institution,
            period: cert.period,
            description: cert.description,
            type: 'certification' as const,
            isCurrent: cert.period.includes(presentKeyword)
        })) : [])
    ];

    // Separa o que é atual do que é passado para uma organização exata
    const currentActivities = allItems.filter(item => item.isCurrent);
    const pastActivities = allItems
        .filter(item => !item.isCurrent)
        .sort((a, b) => b.period.localeCompare(a.period));

    return (
        <div className="max-w-4xl space-y-16 text-neutral-300 antialiased">

            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white">{t('timeline.title')}</h1>
                <p className="max-w-2xl text-base text-neutral-500 font-light leading-relaxed">
                    {t('timeline.description')}
                </p>
            </div>

            <div className="relative pl-8">
                {/* Linha vertical central */}
                <div className="absolute left-[11px] top-4 bottom-0 w-[1px] bg-neutral-900" />

                {/* Marcador pulsante do HOJE */}
                <div className="relative mb-12">
                    <div className="absolute -left-[32px] top-1 flex h-6 w-6 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-20"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.6)]"></span>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#10B981] font-bold">
                                {t('timeline.activeNow')} • {currentMonthYear}
                            </span>
                            <h2 className="text-sm text-neutral-500 font-medium">{t('timeline.activeSubtitle')}</h2>
                        </div>

                        <div className="grid gap-6">
                            {currentActivities.map((item, idx) => (
                                <TimelineEntry
                                    key={`current-${idx}`}
                                    item={item}
                                    badgeWork={t('timeline.badgeWork')}
                                    badgeEducation={t('timeline.badgeEducation')}
                                    badgeCertification={t('resume.labels.certificationsTitle', { defaultValue: 'Certificado' }).toUpperCase()}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Histórico / Passado */}
                <div className="space-y-12">
                    <div className="relative">
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                            {t('timeline.historyTitle')}
                        </span>
                    </div>

                    <div className="grid gap-10">
                        {pastActivities.map((item, idx) => (
                            <TimelineEntry
                                key={`past-${idx}`}
                                item={item}
                                badgeWork={t('timeline.badgeWork')}
                                badgeEducation={t('timeline.badgeEducation')}
                                badgeCertification={t('resume.labels.certificationsTitle', { defaultValue: 'Certificado' }).toUpperCase()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineEntry({ item, badgeWork, badgeEducation, badgeCertification }: { item: TimelineItem; badgeWork: string; badgeEducation: string; badgeCertification: string }) {

    // Define as cores dinâmicas dos badges de acordo com o tipo do item
    const getBadgeStyles = () => {
        switch (item.type) {
            case 'work':
                return 'border-[#10B981]/20 bg-[#10B981]/5 text-[#10B981]';
            case 'education':
                return 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400';
            case 'certification':
                return 'border-violet-500/20 bg-violet-500/5 text-violet-400';
            default:
                return 'border-neutral-800 bg-neutral-900 text-neutral-400';
        }
    };

    const getBadgeLabel = () => {
        if (item.type === 'work') return badgeWork;
        if (item.type === 'education') return badgeEducation;
        return badgeCertification;
    };

    return (
        <div className="relative group">
            {/* Marcador de nó lateral sutil */}
            <div className={`absolute -left-[32px] top-2 h-2 w-2 rounded-full border border-black transition-all duration-500 ${
                item.isCurrent ? 'bg-[#10B981]' : 'bg-neutral-800 group-hover:bg-neutral-600'
            }`} />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-[#10B981] transition-colors">
                            {item.title}
                        </h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getBadgeStyles()}`}>
                            {getBadgeLabel()}
                        </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-600 whitespace-nowrap tracking-wider">
                        {item.period}
                    </span>
                </div>

                <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                    {item.subtitle}
                </div>

                {item.description && (
                    <p className="text-sm leading-relaxed text-neutral-400 font-light max-w-2xl">
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
}

export function generateMetadata(): Metadata {
    return {
        title: 'Timeline | Murillo Frazão'
    }
}