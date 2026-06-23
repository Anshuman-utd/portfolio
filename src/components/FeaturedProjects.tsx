'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    image: string;
    github: string;
    demo: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'SpendSense - AI Powered Expense Tracker',
        description: 'AI-powered personal finance platform that helps users track expenses, extract data from receipts, and gain actionable spending insights.',
        tech: ['Next.js', 'React', 'Tailwind', 'Node.js','OpenAI','MongoDB'],
        image: '/images/porftolioimg-1.avif', // Placeholder
        github: 'https://github.com/Anshuman-utd/SpendSense',
        demo: 'https://spend-sense-pink.vercel.app',
    },
    {
        id: 2,
        title: 'SkillSync - A platform for students and mentors',
        description: 'A full-stack learning and mentorship platform that helps students and developers assess skills, and track progress. It enables mentors to create and manage courses,supports role-based authentication,chatting option with mentor and provides learning resources.',
        tech: ['Next.js','Tailwind','Node.js', 'Socket.io', 'Prisma','PostgreSQL', 'Express'],
        image: '/images/skillsyncportfolioimg-3.avif', // Placeholder
        github: 'https://github.com/Anshuman-utd/SkillSync',
        demo: 'https://skill-sync-nine-orcin.vercel.app',
    },
    {
        id: 3,
        title: 'Hilton AI - Autonomous Data Scientist',
        description: 'An AI-powered platform that automates the entire data science workflow, from data preprocessing and EDA to model training, evaluation, and prediction generation.',
        tech: ['Python', 'Django', 'React', 'PostgreSQL', 'LangChain', 'LangGraph', 'FAISS', 'Scikit-learn', 'Tailwind CSS'],
        image: '/images/hilton-ai-img.avif', // Placeholder
        github: 'https://github.com/Anshuman-utd/Autonomous-Data-scientist.git',
        demo: 'https://autonomous-data-scientist-green.vercel.app',
    },
    {
        id: 4,
        title: 'Bodh AI - AI Tutor',
        description: 'an agentic AI tutoring platform that transforms PDFs, presentations, and other learning materials into structured, personalized learning experiences. It uses multi-agent workflows and RAG to generate curricula, adaptive quizzes, learning paths,',
        tech: ['Python', 'Django', 'Next.js', 'PostgreSQL', 'LangChain', 'LangGraph', 'FAISS', 'Groq API', 'Tailwind CSS'],
        image: '/images/bodh-ai-img.avif', // Placeholder
        github: 'https://github.com/shouryapratap132006/BodhAI.git',
        demo: 'https://bodh-ai-kappa.vercel.app',
    },
];

export default function FeaturedProjects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            gsap.from(projectRefs.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative z-10 w-full bg-black px-6 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 flex flex-col items-center text-center">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                        Projects
                    </h2>
                    <h3 className="mt-2 font-serif text-4xl text-white md:text-5xl">Featured Work</h3>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => {
                                if (el) projectRefs.current[index] = el;
                            }}
                            className="group relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
                        >
                            {/* Background Image */}
                            <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-60"
                                />
                            </div>

                            {/* Overlay Content */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 transition-all duration-300">
                                <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {project.tech.map((tag) => (
                                            <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h4 className="mb-2 text-2xl font-bold text-white">{project.title}</h4>
                                    <p className="mb-6 text-zinc-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-4 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                            className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-zinc-300"
                                        >
                                            <Github size={18} />
                                            GitHub
                                        </Link>
                                        <Link
                                            href={project.demo}
                                            target="_blank"
                                            className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-zinc-300"
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
