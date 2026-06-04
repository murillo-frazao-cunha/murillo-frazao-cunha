import React, {useEffect, useState} from 'react';
import {ExternalLinkIcon, GithubIcon, ChevronLeft, ChevronRight, Maximize2, X} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import {VattsImage} from "vatts/react";


interface Project {
    title: string;
    type: string;
    description: string;
    tags: string[];
    images?: string[];
    imageUrl?: string;
    sourceCodeUrl?: string;
    demoUrl?: string;
}

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const images = project.images && project.images.length > 0 ? project.images : project.imageUrl ? [project.imageUrl] : [];
    const [index, setIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIndex(0);
    }, [project]);

    useEffect(() => {
        if (!isModalOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsModalOpen(false);
            if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + images.length) % images.length);
            if (e.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isModalOpen, images.length]);

    const prev = (e?: React.MouseEvent) => { e?.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); };
    const next = (e?: React.MouseEvent) => { e?.stopPropagation(); setIndex(i => (i + 1) % images.length); };

    return (
        <div className="group relative border border-neutral-900 bg-neutral-950/40 p-6 rounded-lg transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-950">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 block mb-2">{project.type}</span>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Image Area - Adicionado flexbox para garantir a centralização absoluta */}
                <div className="md:col-span-5 overflow-hidden rounded border border-neutral-900 bg-black relative group h-48 md:h-56 flex items-center justify-center">
                    {images.length > 0 ? (
                        <>
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={images[index]}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.28 }}
                                    className="w-full h-full flex items-center justify-center" // Garante o alinhamento no meio
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    {/* Mudado de object-cover para object-contain para não cortar nada */}
                                    <VattsImage
                                        src={images[index]}
                                        alt={`${project.title} - ${index + 1}`}
                                        className="w-full h-full object-contain filter  opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 cursor-zoom-in"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Standardized control styling */}
                            {images.length > 1 && (
                                <>
                                    <button onClick={prev} aria-label="Anterior" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-1.5 rounded-full text-white cursor-pointer backdrop-blur-sm">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button onClick={next} aria-label="Próximo" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-1.5 rounded-full text-white cursor-pointer backdrop-blur-sm">
                                        <ChevronRight size={16} />
                                    </button>
                                </>
                            )}

                            {/* Thumbnail indicators */}
                            <div className="absolute left-0 right-0 bottom-2 flex justify-center gap-1.5 px-3">
                                {images.map((_, i) => (
                                    <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                                            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white' : 'bg-neutral-600/70'} border border-black cursor-pointer`} aria-label={`Ir para imagem ${i+1}`} />
                                ))}
                            </div>

                            {/* Maximize icon */}
                            <button onClick={() => setIsModalOpen(true)} aria-label="Maximizar" className="absolute right-2 top-2 bg-black/60 hover:bg-black/80 p-1.5 rounded-md text-white cursor-pointer backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 size={14} />
                            </button>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600 text-sm font-light">Sem imagem</div>
                    )}
                </div>

                {/* Content Area */}
                <div className="md:col-span-7 flex flex-col h-full justify-between pt-2 md:pt-0">
                    <div>
                        <h3 className="text-lg font-medium text-neutral-100 tracking-tight transition-colors group-hover:text-white">
                            {project.title}
                        </h3>
                        <p className="text-sm text-neutral-400 mt-2 font-light leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-5">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[11px] font-mono bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono">
                            {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                                    <ExternalLinkIcon size={14} /> LIVE
                                </a>
                            )}
                            {project.sourceCodeUrl && (
                                <a href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                                    <GithubIcon size={14} /> CODE
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal / Lightbox */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/75" onClick={() => setIsModalOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="relative max-w-[95%] max-h-[95%] w-full" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ duration: 0.22 }}>
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div key={images[index]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }} className="w-full flex items-center justify-center">
                                    <VattsImage src={images[index]} alt={`${project.title} - ${index + 1}`} className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                                </motion.div>
                            </AnimatePresence>

                            {/* close button */}
                            <button onClick={() => setIsModalOpen(false)} aria-label="Fechar" className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-white cursor-pointer backdrop-blur-sm z-10">
                                <X size={20} />
                            </button>

                            {/* prev/next in modal */}
                            {images.length > 1 && (
                                <>
                                    <button onClick={prev} aria-label="Anterior" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white cursor-pointer backdrop-blur-sm z-10 transition-colors">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={next} aria-label="Próximo" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white cursor-pointer backdrop-blur-sm z-10 transition-colors">
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* indicator */}
                            <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-2 z-10 px-4">
                                {images.map((_, i) => (
                                    <button key={i} onClick={() => setIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-white' : 'bg-neutral-600/80'} cursor-pointer border border-black`} aria-label={`Imagem ${i+1}`} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};