'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Code, FileText, Download } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // useGSAP removed to ensure visibility - simpler slide-in via CSS if needed, or just static for now

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-6 py-6 transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm py-4' : 'bg-transparent'
                }`}
        >
            <div className="text-xl font-bold tracking-wider text-white">
                <span className="font-serif italic text-zinc-400">Anshuman</span> 
            </div>

            <div className="flex items-center gap-6">
                <SocialLink href="https://github.com/Anshuman-utd" icon={<Github size={20} />} label="GitHub" />
                <SocialLink href="https://leetcode.com/u/Anshu-MAN" icon={<Code size={20} />} label="LeetCode" />
                <SocialLink href="https://www.linkedin.com/in/anshuman-mehta-291a3b324" icon={<Linkedin size={20} />} label="LinkedIn" />

                <a
                    href="/resume/Resume-Anshuman-Mehta.pdf"
                    download
                    className="group relative overflow-hidden rounded-full border border-white bg-transparent px-6 py-2 text-sm font-medium text-white transition-all hover:text-black"
                >
                    <span className="absolute inset-0 z-0 h-full w-full translate-y-full bg-white transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                    <div className="relative z-10 flex items-center gap-2">
                        <span>Resume</span>
                        <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
                    </div>
                </a>
            </div>
        </nav>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-50 transition-all duration-300 hover:scale-110 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            aria-label={label}
        >
            {icon}
        </Link>
    );
}
