import React from 'react';
import {Link, Metadata, router} from "nytlex/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from "lucide-react";
import './globals.css';

import "./i18n/index"

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Home | Murillo Frazão Cunha",
    description: "Backend and Systems Administrator focused on high-performance systems, scalable infrastructure, and reliable software architecture.",

    keywords: [
        "Murillo Frazão",
        "Murillo",
        "Frazão",
        "Cunha",
        "Murillo Frazão Cunha",
        "Backend Engineer",
        "Systems Administrator",
        "Software Engineer",
        "DevOps",
        "Linux",
        "Docker",
        "Infrastructure",
        "Cloud Computing",
        "Software Architecture",
        "Backend Development",
        "Portfolio",
        "Full Stack Developer",
        "Open Source"
    ],

    author: "Murillo Frazão Cunha",

    favicon: "/favicon.png",
    appleTouchIcon: "/favicon.png",

    charset: "UTF-8",
    language: "en-US",

    viewport: "width=device-width, initial-scale=1",
    themeColor: "#0A0A0A",

    canonical: "https://mfraz.ovh",

    robots: "index, follow, max-image-preview:large",

    openGraph: {
        title: "Murillo Frazão",
        description: "Backend Engineer & Systems Administrator focused on high-performance systems, scalable infrastructure, and reliable software architecture.",
        type: "website",
        url: "https://mfraz.ovh",
        image: {
            url: "https://mfraz.ovh/favicon.png",
            alt: "Murillo Frazão Portfolio"
        },
        siteName: "Murillo Frazão",
        locale: "en_US"
    },

    twitter: {
        card: "summary",
        title: "Murillo Frazão",
        description: "Backend Engineer & Systems Administrator focused on high-performance systems, scalable infrastructure, and reliable software architecture.",
        image: "https://mfraz.ovh/favicon.png",
        imageAlt: "Murillo Frazão Portfolio"
    },

    other: {
        "color-scheme": "dark",
        "application-name": "Murillo Frazão Portfolio",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
        "mobile-web-app-capable": "yes"
    }
};

export default function Layout({ children }: LayoutProps) {
    const { t, i18n } = useTranslation();

    const variants = {
        hidden: { opacity: 0, y: 10 },
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    const getSocialIcon = (iconName: string) => {
        switch (iconName) {
            case 'github': return <GithubIcon size={18} />;
            case 'linkedin': return <LinkedinIcon size={18} />;
            case 'instagram': return <InstagramIcon size={18} />;
            case 'mail': return <MailIcon size={18} />;
            default: return null;
        }
    };

    // Função que muda o idioma e salva no localStorage
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('app-lng', lang);
        }
        window.location.reload()
    };

    const isSelectedLanguage = (lang: string) => {
        return i18n.language?.startsWith(lang);
    };

    const personalInfo = t('personalInfo', { returnObjects: true }) as any

    return (
        <div className="min-h-screen bg-black text-neutral-400 font-sans selection:bg-[#10B981]/30 selection:text-white antialiased">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row gap-12 items-start">

                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0 flex flex-col items-center md:items-start gap-6 md:sticky md:top-24">

                    {/* Gravatar */}
                    <img
                        src="https://www.gravatar.com/avatar/b2b9697ab2727ac792bfa53356d81880?s=400"
                        alt={personalInfo.name}
                        className="h-32 w-32 md:h-40 md:w-40 rounded-full border border-neutral-800 bg-neutral-950 p-1 object-cover"
                    />

                    {/* Informações básicas */}
                    <div className="text-center md:text-left">
                        <h1 className="text-xl font-semibold text-neutral-100 tracking-tight">{personalInfo.name}</h1>
                        <h2 className="text-xs font-mono text-[#10B981] uppercase tracking-wider mt-1">{personalInfo.title}</h2>
                    </div>

                    {/* Redes Sociais */}
                    <div className="flex items-center gap-4 border border-neutral-900 bg-neutral-950/50 px-4 py-2 rounded-md">
                        {personalInfo.socials.map((social: any) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="text-neutral-500 hover:text-[#10B981] transition-colors duration-200"
                            >
                                {getSocialIcon(social.icon)}
                            </a>
                        ))}
                    </div>

                    {/* Seletor de Idioma Minimalista */}
                    <div className="flex items-center gap-2 font-mono text-xs px-1">
                        <button
                            onClick={() => changeLanguage('pt')}
                            className={`transition-colors duration-200 cursor-pointer ${
                                isSelectedLanguage('pt')
                                    ? 'text-[#10B981] font-semibold'
                                    : 'text-neutral-600 hover:text-neutral-400'
                            }`}
                        >
                            PT
                        </button>
                        <span className="text-neutral-800 select-none">|</span>
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`transition-colors duration-200 cursor-pointer ${
                                isSelectedLanguage('en')
                                    ? 'text-[#10B981] font-semibold'
                                    : 'text-neutral-600 hover:text-neutral-400'
                            }`}
                        >
                            EN
                        </button>
                    </div>

                    {/* Menu de Navegação */}
                    <nav className="w-full flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-l border-neutral-900 pb-4 md:pb-0 md:pl-4 mt-2 overflow-x-auto flex-nowrap scrollbar-hide" aria-label={t('nav.ariaLabel')}>
                        {[
                            { name: t('nav.about'), path: '/' },
                            { name: t('nav.projects'), path: '/projects' },
                            { name: t('nav.resume'), path: '/resume' },
                            { name: t('nav.timeline'), path: '/timeline' },
                            { name: t('nav.skills'), path: '/skills' }
                        ].map((tab) => {
                            const isActive = router.pathname === tab.path;
                            return (
                                <Link
                                    key={tab.path}
                                    href={tab.path}
                                    className={`shrink-0 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all relative ${
                                        isActive
                                            ? 'text-[#10B981] font-medium border-b-2 border-[#10B981] md:border-b-0 md:border-l-2 md:border-[#10B981] md:-ml-[18px]'
                                            : 'text-neutral-600 hover:text-neutral-300'
                                    }`}
                                >
                                    {tab.name}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Conteúdo Principal */}
                <div className="flex-1 w-full flex flex-col justify-between min-h-[50vh]">
                    <main className="relative">
                        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                            <motion.div
                                key={router.pathname}
                                variants={variants}
                                initial="hidden"
                                animate="enter"
                                exit="exit"
                                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                                className="will-change-opacity"
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </main>

                    {/* Footer */}
                    <footer className="mt-24 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-600">
                        <div className="text-center md:text-left">
                            &copy; {new Date().getFullYear()} {personalInfo.name}. {t('footer.rights')}
                        </div>

                        <a href={"https://nytlex.mfraz.ovh"} className="block flex items-center gap-1.5">
                            <span>Feito com</span>
                            <img
                                src="https://raw.githubusercontent.com/murillo-frazao-cunha/nytlex-docs/master/public/favicon-dark.svg"
                                alt="Nytlex.js Logo"
                                className="w-3.5 h-3.5"
                            />
                            <span className="text-neutral-400 font-medium tracking-wide">Nytlex.js React</span>
                        </a>
                    </footer>
                </div>

            </div>
        </div>
    );
}