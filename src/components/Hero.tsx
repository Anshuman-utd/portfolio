'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Orb from './Orb';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                '.hero-text-char',
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.05,
                    delay: 0.2,
                }
            )
                .fromTo(
                    introRef.current,
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, duration: 1 },
                    '-=1'
                )
                .fromTo(
                    '.scroll-indicator',
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 1, repeat: -1, yoyo: true },
                    '-=0.5'
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
        >
            {/* 3D Background */}
            <Orb />

            {/* Content Overlay */}
            <div className="z-10 mt-[-5vh] flex w-full max-w-7xl flex-col items-center justify-between px-6 md:flex-row">
                {/* Left Side: Large Typography */}
                <div ref={textRef} className="flex flex-col items-start gap-0">
                    <h1 className="select-none text-6xl font-normal text-white md:text-8xl lg:text-9xl">
                        <span className="hero-text-char inline-block font-serif italic text-zinc-300">
                            Creative
                        </span>
                        <br />
                        <span className="hero-text-char inline-block font-sans font-bold tracking-tighter">
                            DEVELOPER.
                        </span>
                    </h1>
                </div>

                {/* Right Side: Intro Text */}
                <div
                    ref={introRef}
                    className="mt-8 flex max-w-sm flex-col items-end text-right md:mt-0"
                >
                    <p className="border-l-2 border-zinc-800 py-2 pl-6 text-md leading-relaxed text-white md:border-l-0 md:border-r-2 md:pl-0 md:pr-6 md:text-base">
                        Hi, I’m Anshuman Mehta, a full-stack developer focused on building clean, modern, and immersive web
                        experiences using modern frontend technologies and creative animation.
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-2 text-zinc-500">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowDown size={16} />
            </div>

            {/* Vignette / Overlay Effect */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </section>
    );
}
