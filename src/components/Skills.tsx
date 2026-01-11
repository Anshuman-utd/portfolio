'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LucideIcon, Code2, Database, Layout, Terminal, Box, Server, Cpu, Layers, GitBranch, PenTool, Braces, Smartphone, Globe, Cloud, Command, Hash, FileCode } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
    name: string;
    icon: LucideIcon;
    color: string;
}

interface SkillCategory {
    title: string;
    skills: SkillItem[];
}

const skillsData: SkillCategory[] = [
    {
        title: 'Frontend',
        skills: [
            { name: 'HTML', icon: FileCode, color: '#E34F26' },
            { name: 'CSS', icon: Layout, color: '#1572B6' },
            { name: 'React', icon: Code2, color: '#61DAFB' },
            { name: 'Next.js', icon: Globe, color: '#ffffff' },
            { name: 'Tailwind CSS', icon: Box, color: '#38B2AC' },
            { name: 'GSAP', icon: Layers, color: '#88CE02' },
            { name: 'Three.js', icon: Box, color: '#ffffff' }, // White in dark mode
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', icon: Server, color: '#339933' },
            { name: 'Express', icon: Terminal, color: '#ffffff' },
            { name: 'Prisma', icon: Database, color: '#2D3748' },
            { name: 'MySQL', icon: Database, color: '#4479A1' },
            { name: 'MongoDB', icon: Database, color: '#47A248' },
            { name: 'PostgreSQL', icon: Database, color: '#336791' },
        ],
    },
    {
        title: 'Tools & Other',
        skills: [
            { name: 'Git / GitHub', icon: GitBranch, color: '#F05032' },
            { name: 'Figma', icon: PenTool, color: '#F24E1E' },
            { name: 'DSA', icon: Braces, color: '#FFFF00' },
            { name: 'Python', icon: Hash, color: '#3776AB' },
            { name: 'AI / ML Basics', icon: Cpu, color: '#FF6F00' },
        ],
    },
];

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // GSAP removed to ensure absolute visibility. 
    // If animations are needed, use simple CSS keyframes or ensure GSAP context is 100% robust.
    // Currently, reliability > animation.

    return (
        <section
            ref={sectionRef}
            className="relative z-10 flex w-full flex-col items-center justify-center bg-black px-6 py-24"
        >
            <div className="md:mb-20 mb-12 text-center">
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Expertise
                </h2>
                <h3 className="mt-2 font-serif text-4xl text-white md:text-5xl">My Skills</h3>
            </div>

            <div className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
                {skillsData.map((category, index) => (
                    <div
                        key={category.title}
                        // Removed gray background as requested. Using transparent/black with subtle border.
                        className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/10 bg-transparent p-8 transition-all hover:border-white/20 hover:bg-white/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <h4 className="relative z-10 text-xl font-medium text-zinc-200">
                            {category.title}
                        </h4>

                        <div className="relative z-10 flex flex-col gap-4">
                            {category.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="flex items-center gap-4 text-zinc-400 transition-colors duration-300 hover:text-white"
                                >
                                    {/* Icon with specific color */}
                                    <div style={{ color: skill.color }} className="drop-shadow-md">
                                        <skill.icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-sm tracking-wide">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
