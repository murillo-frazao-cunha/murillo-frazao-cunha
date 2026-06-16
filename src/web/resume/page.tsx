import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Metadata } from "nytlex/react";

// Polyfill nytlex
if (typeof window !== 'undefined') {
    (window as any).global = window;
}

const THEME = {
    primary: '#10B981', // Verde Esmeralda Moderno
    background: '#FFFFFF',
    text: '#0F172A',
    muted: '#475569',
    border: '#E2E8F0',
    subtle: '#64748B'
};

const createStyles = (lib: any) =>
    lib.StyleSheet.create({
        page: {
            backgroundColor: '#FFFFFF',
            padding: 0,
            fontFamily: 'Helvetica',
            color: THEME.text,
            fontSize: 10
        },

        layoutPage1: {
            flexDirection: 'row',
            width: '100%',
            height: '100%'
        },

        // SIDEBAR (Visual limpo, tom escuro premium com toque sutil esmeralda)
        sidebar: {
            width: '32%',
            backgroundColor: '#060B08',
            paddingTop: 40,
            paddingHorizontal: 20,
            height: '100%',
            color: '#FFFFFF'
        },

        avatar: {
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: 'rgba(16,185,129,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            border: `1pt solid ${THEME.primary}`
        },

        avatarText: {
            fontSize: 18,
            color: THEME.primary,
            fontWeight: 'bold',
            letterSpacing: 1
        },

        name: {
            fontSize: 19,
            fontWeight: 'bold',
            lineHeight: 1.2,
            color: '#FFFFFF'
        },

        role: {
            marginTop: 6,
            fontSize: 8,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: THEME.primary,
            fontWeight: 'bold',
            marginBottom: 26
        },

        sidebarSection: {
            marginTop: 24
        },

        sidebarTitle: {
            fontSize: 8.5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1.2,
            color: '#A7F3D0',
            marginBottom: 6
        },

        divider: {
            width: 16,
            height: 1.5,
            backgroundColor: THEME.primary,
            marginBottom: 14
        },

        contactItem: {
            marginBottom: 14
        },

        contactLabel: {
            fontSize: 7,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#6EE7B7',
            opacity: 0.7,
            marginBottom: 2
        },

        contactText: {
            fontSize: 8.5,
            color: '#E6F4EA',
            lineHeight: 1.4
        },

        // CONTEÚDO PRINCIPAL (Design clean, foco em tipografia e respiro)
        contentPage1: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingTop: 44,
            paddingHorizontal: 32
        },

        contentPage2: {
            width: '100%',
            backgroundColor: '#FFFFFF',
            paddingTop: 36,
            paddingHorizontal: 40,
            paddingBottom: 30
        },

        section: {
            marginBottom: 18
        },

        sectionTitle: {
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: 1.8,
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: 4
        },

        sectionLine: {
            width: '100%',
            height: 1,
            backgroundColor: '#F1F5F9',
            marginBottom: 10
        },

        summary: {
            fontSize: 9.5,
            lineHeight: 1.6,
            color: '#334155',
            textAlign: 'justify'
        },

        experienceCard: {
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: `1pt solid #F8FAFC`
        },

        topRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 4
        },

        company: {
            fontSize: 10.5,
            fontWeight: 'bold',
            color: '#0F172A'
        },

        period: {
            fontSize: 8.5,
            color: THEME.subtle
        },

        roleText: {
            fontSize: 9,
            color: THEME.primary,
            fontWeight: 'bold',
            marginBottom: 6
        },

        desc: {
            fontSize: 9,
            color: '#475569',
            lineHeight: 1.5,
            textAlign: 'justify'
        },

        educationGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },

        educationCard: {
            width: '48%',
            marginBottom: 10
        },

        educationTitle: {
            fontSize: 9.5,
            fontWeight: 'bold',
            color: '#0F172A',
            marginBottom: 2
        },

        educationSubtitle: {
            fontSize: 8.5,
            color: '#475569',
            lineHeight: 1.3
        },

        skillBlock: {
            marginBottom: 10
        },

        skillTitle: {
            fontSize: 9,
            fontWeight: 'bold',
            color: '#0F172A',
            marginBottom: 3
        },

        skillText: {
            fontSize: 8.5,
            lineHeight: 1.5,
            color: '#475569'
        },

        languageItem: {
            marginBottom: 10
        },

        languageName: {
            fontSize: 9,
            fontWeight: 'bold',
            color: '#0F172A',
            marginBottom: 2
        },

        languageLevel: {
            fontSize: 8.5,
            color: '#475569'
        },

        footer: {
            position: 'absolute',
            bottom: 20,
            right: 40,
            fontSize: 7,
            color: '#94A3B8'
        }
    });

interface DocumentProps {
    lib: any;
    personalInfo: any;
    experienceData: any[];
    educationData: any[];
    certificationsData: any[];
    skillsData: any[];
    resumeData: any;
}

const ResumeDocument = ({ lib, personalInfo, experienceData, educationData, certificationsData, skillsData, resumeData }: DocumentProps) => {
    const styles = createStyles(lib);
    const { Document, Page, Text, View } = lib;

    const email = personalInfo?.socials?.find((s: any) => s.icon === 'mail')?.url.replace('mailto:', '') || '';
    const github = personalInfo?.socials?.find((s: any) => s.icon === 'github')?.url.replace('https://', '') || '';

    const initials = useMemo(() => {
        if (!personalInfo?.name) return '';
        return personalInfo.name
            .split(' ')
            .map((x: string) => x[0])
            .slice(0, 2)
            .join('');
    }, [personalInfo?.name]);

    return (
        <Document
            author={personalInfo?.name}
            title={`Currículo - ${personalInfo?.name}`}
        >
            <Page size="A4" style={styles.page}>
                <View style={styles.layoutPage1}>
                    <View style={styles.sidebar}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{initials}</Text>
                        </View>

                        <Text style={styles.name}>{personalInfo?.name}</Text>
                        <Text style={styles.role}>{personalInfo?.title}</Text>

                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>{resumeData?.labels?.contact}</Text>
                            <View style={styles.divider} />

                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>{resumeData?.labels?.email}</Text>
                                <Text style={styles.contactText}>{email}</Text>
                            </View>

                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>{resumeData?.labels?.phone}</Text>
                                <Text style={styles.contactText}>{resumeData?.phone}</Text>
                            </View>

                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>{resumeData?.labels?.linkedin}</Text>
                                <Text style={styles.contactText}>{resumeData?.linkedin}</Text>
                            </View>

                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>{resumeData?.labels?.github}</Text>
                                <Text style={styles.contactText}>{github}</Text>
                            </View>

                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>{resumeData?.labels?.website}</Text>
                                <Text style={styles.contactText}>{resumeData?.website}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.contentPage1}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{resumeData?.labels?.summaryTitle}</Text>
                            <View style={styles.sectionLine} />
                            <Text style={styles.summary}>{resumeData?.summary}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{resumeData?.labels?.experienceTitle}</Text>
                            <View style={styles.sectionLine} />

                            {Array.isArray(experienceData) && experienceData.map((exp: any, index: number) => (
                                <View key={index} style={styles.experienceCard}>
                                    <View style={styles.topRow}>
                                        <Text style={styles.company}>{exp.company}</Text>
                                        <Text style={styles.period}>{exp.period}</Text>
                                    </View>
                                    <Text style={styles.roleText}>{exp.role}</Text>
                                    <Text style={styles.desc}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.contentPage2}>
                    {/* FORMAÇÃO ACADÊMICA */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{resumeData?.labels?.educationTitle}</Text>
                        <View style={styles.sectionLine} />

                        <View style={styles.educationGrid}>
                            {Array.isArray(educationData) && educationData.map((edu: any, index: number) => (
                                <View key={index} style={styles.educationCard}>
                                    <Text style={styles.educationTitle}>{edu.degree}</Text>
                                    <Text style={styles.educationSubtitle}>
                                        {edu.institution} — {edu.period}
                                    </Text>
                                    <Text style={styles.educationSubtitle}>
                                        {edu.description}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* CURSOS E CERTIFICAÇÕES */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{resumeData?.labels?.certificationsTitle || 'Cursos e Certificações'}</Text>
                        <View style={styles.sectionLine} />

                        <View style={styles.educationGrid}>
                            {Array.isArray(certificationsData) && certificationsData.map((cert: any, index: number) => (
                                <View key={index} style={styles.educationCard}>
                                    <Text style={styles.educationTitle}>{cert.degree}</Text>
                                    <Text style={styles.educationSubtitle}>
                                        {cert.institution} — {cert.period}
                                    </Text>
                                    <Text style={styles.educationSubtitle}>
                                        {cert.description}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* COMPETÊNCIAS E IDIOMAS */}
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 40,
                            marginTop: 4
                        }}
                    >
                        <View style={{ flex: 1.6 }}>
                            <Text style={styles.sectionTitle}>{resumeData?.labels?.skillsTitle}</Text>
                            <View style={styles.sectionLine} />

                            {Array.isArray(skillsData) && skillsData.map((category: any, index: number) => (
                                <View key={index} style={styles.skillBlock}>
                                    <Text style={styles.skillTitle}>{category.title}</Text>
                                    <Text style={styles.skillText}>
                                        {category.skills
                                            .map((skill: any) => skill.name)
                                            .join(' • ')}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ width: 140 }}>
                            <Text style={styles.sectionTitle}>{resumeData?.labels?.languagesTitle}</Text>
                            <View style={styles.sectionLine} />

                            {resumeData?.languages && Array.isArray(resumeData.languages) && resumeData.languages.map((lang: any, index: number) => (
                                <View key={index} style={styles.languageItem}>
                                    <Text style={styles.languageName}>{lang.name}</Text>
                                    <Text style={styles.languageLevel}>{lang.level}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Text style={styles.footer}>{resumeData?.website} — {new Date().getFullYear()}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default function ResumeGeneratorPage() {
    const { t } = useTranslation();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Resolvendo os dados traduzidos mapeados do JSON
    const personalInfo = t('personalInfo', { returnObjects: true }) as any;
    const experienceData = t('experienceData', { returnObjects: true }) as any[];
    const educationData = t('educationData', { returnObjects: true }) as any[];
    const certificationsData = t('certificationsData', { returnObjects: true }) as any[];
    const skillsData = t('skillsData', { returnObjects: true }) as any[];
    const resumeData = t('resume', { returnObjects: true }) as any;

    useEffect(() => {
        const generate = async () => {
            try {
                const pdfLib = await import('@react-pdf/renderer');
                const blob = await pdfLib
                    .pdf(
                        <ResumeDocument
                            lib={pdfLib}
                            personalInfo={personalInfo}
                            experienceData={experienceData}
                            educationData={educationData}
                            certificationsData={certificationsData}
                            skillsData={skillsData}
                            resumeData={resumeData}
                        />
                    )
                    .toBlob();

                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        generate();

        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, []);

    if (loading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                    <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-mono">
                        {t('resume.ui.loading')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-black flex flex-col overflow-hidden select-none">
            {/* TOPBAR - Glassmorphism sem bordas rígidas */}
            <div className="h-14 bg-neutral-950/40 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 shadow-xl relative z-20">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h1 className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                        {t('resume.ui.previewTitle')} — {personalInfo?.name}
                    </h1>
                </div>

                <a
                    href={pdfUrl || '#'}
                    download="Curriculo_MurilloFrazao.pdf"
                    className="h-9 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 flex items-center justify-center text-white font-bold text-[11px] uppercase tracking-[0.2em] active:scale-95 shadow-lg shadow-emerald-500/20 border-none"
                >
                    {t('resume.ui.downloadBtn')}
                </a>
            </div>

            {/* CONTENT - Modo Escuro Absoluto com glow sutil em Esmeralda/Ciano */}
            <div className="flex-1 overflow-hidden flex items-center justify-center p-5 md:p-8 bg-black relative">
                <div className="w-full h-full max-w-5xl relative flex items-center justify-center">
                    {/* Glow Effects */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

                    <iframe
                        src={`${pdfUrl}`}
                        title="Currículo"
                        className="relative z-10 w-full h-full rounded-2xl border-none shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-white"
                    />
                </div>
            </div>
        </div>
    );
}

export function generateMetadata(): Metadata {
    return {
        title: 'Resume | Murillo Frazão'
    }
}