'use client';

import React, { useRef, useState } from 'react';
import { Mail, Github, Linkedin, Twitter, ArrowRight, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [result, setResult] = useState('');
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult('Sending...');
        setStatus(null);

        // NOTE: You must generate a Web3Forms Access Key for anshuman.mehta2024@nst.rishihood.edu.in
        // Go to https://web3forms.com/ to get your key.
        const accessKey = "e73d5feb-1073-4b00-a58f-a2b5e02fb346";



        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    ...formData,
                }),
            });

            const json = await response.json();

            if (response.status === 200) {
                setResult("Message sent successfully!");
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setResult(json.message || "Something went wrong.");
                setStatus('error');
            }
        } catch (error) {
            console.log(error);
            setResult("An error occurred. Please try again.");
            setStatus('error');
        }
    };

    useGSAP(
        () => {
            // Animate text sliding in from left
            gsap.from(textRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
            });

            // Animate form sliding in from right
            gsap.from(formRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative z-10 w-full overflow-hidden bg-black px-6 py-24">
            {/* Background Glow */}
            <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-white/5 blur-[120px] pointer-events-none" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
                {/* Left Column: Text & Info */}
                <div ref={textRef} className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                        Connect With
                        <span className="text-zinc-400"> Me</span>
                    </h2>
                    <p className="mt-6 max-w-md text-lg text-zinc-400">
                        Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
                    </p>

                    <div className="mt-10 flex items-center gap-6">
                        <a href="https://github.com/Anshuman-utd" target="_blank" rel="noopener noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-white transition-all hover:border-white hover:bg-white hover:text-black">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/anshuman-mehta-291a3b324" target="_blank" rel="noopener noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-white transition-all hover:border-white hover:bg-white hover:text-black">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:anshuman.mehta2024@nst.rishihood.edu.in" className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-white transition-all hover:border-white hover:bg-white hover:text-black">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="relative">
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="relative z-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-zinc-950/50 p-8 backdrop-blur-sm sm:p-10"
                    >
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all focus:border-white/50 focus:bg-zinc-900"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all focus:border-white/50 focus:bg-zinc-900"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-sm font-medium text-zinc-400">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Project Inquiry"
                                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all focus:border-white/50 focus:bg-zinc-900"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                className="resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all focus:border-white/50 focus:bg-zinc-900"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="group flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-zinc-200"
                        >
                            Send Message
                            <Send size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>

                        {/* Status Message */}
                        {result && (
                            <p className={`mt-4 text-center text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {result}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
