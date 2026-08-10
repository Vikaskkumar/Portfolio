import { useState } from 'react';
import { ArrowRight, Mail, Terminal, Check, Copy, Download } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';
import resumePDF from '../assets/resume.pdf';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const pythonCode = `# main.py
developer = {
    "name": "Vikas",
    "role": "Full-Stack Engineer",
    "skills": ["Javascript", "python", "React", "SQL"],
    "focus": "Scalable Web Applications"
}

print(f"Hi, I'm {developer['name']}. Welcome to my portfolio!")`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Info */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">

          {/* Greeting */}
          <p className="text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            Hi <span className="text-2xl sm:text-3xl">👋🏻</span> My name is
          </p>

          {/* Large Name */}
          <h1 className="text-7xl sm:text-8xl md:text-[7.5rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#f59e0b] mb-4 pb-2">
            Vikas.
          </h1>

          {/* Subtitles matching the image */}
          <div className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            <p>I'm a Fullstack Software Engineer.</p>
            <p>
              I create <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#f59e0b]">Exciting Stuff</span> on the Internet.
            </p>
          </div>

          {/* Action Buttons (Neobrutalist style kept the same) */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#306998] hover:bg-[#25547c] text-white font-bold px-6 py-3.5 rounded-xl border-[2.5px] border-[#10162f] dark:border-white shadow-[4px_4px_0px_0px_#10162f] dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#10162f]"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={resumePDF}
              download="Vikas_Resume.pdf"
              className="inline-flex items-center gap-2 bg-[#ffe054] hover:bg-[#ffd23f] text-[#10162f] font-bold px-6 py-3.5 rounded-xl border-[2.5px] border-[#10162f] dark:border-white shadow-[4px_4px_0px_0px_#10162f] dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#10162f]"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          {/* Social Links (Adjusted colors to match the orange theme of the image) */}
          <div className="flex items-center gap-6 pt-8">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#ea580c] hover:text-[#c2410c] dark:text-[#f97316] dark:hover:text-[#fdba74] transition transform hover:scale-110">
              <Github className="w-7 h-7" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#ea580c] hover:text-[#c2410c] dark:text-[#f97316] dark:hover:text-[#fdba74] transition transform hover:scale-110">
              <Linkedin className="w-7 h-7" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#ea580c] hover:text-[#c2410c] dark:text-[#f97316] dark:hover:text-[#fdba74] transition transform hover:scale-110">
              <Twitter className="w-7 h-7" />
            </a>
            <a href="mailto:contact@vikas.dev" className="text-[#ea580c] hover:text-[#c2410c] dark:text-[#f97316] dark:hover:text-[#fdba74] transition transform hover:scale-110">
              <Mail className="w-7 h-7" />
            </a>
          </div>
        </div>

        {/* Right Column: Code Window (Kept exactly the same) */}
        <div className="lg:col-span-6 w-full">
          <div className="w-full rounded-2xl bg-[#0f1423] border-[2.5px] border-[#10162f] dark:border-white shadow-[6px_6px_0px_0px_#10162f] dark:shadow-[6px_6px_0px_0px_#ffffff] overflow-hidden">
            {/* Terminal Top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e2438] border-b-[2px] border-[#10162f] dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                <Terminal className="w-4 h-4 text-[#ffe054]" />
                <span>vikas_portfolio ~ main.py</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-white transition duration-150"
                title="Copy code"
              >
                {copied ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-6 sm:p-8 font-mono text-sm sm:text-base text-left overflow-x-auto min-h-[280px] sm:min-h-[320px] flex items-center bg-[#0b0f19]">
              <pre className="text-slate-300 leading-relaxed">
                <span className="text-slate-500"># main.py</span>
                <br />
                developer = <span className="text-pink-400">{"{"}</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">"name"</span>: <span className="text-emerald-400">"Vikas"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">"role"</span>: <span className="text-emerald-400">"Full-Stack Engineer"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">"skills"</span>: <span className="text-pink-400">[</span><span className="text-emerald-400">"Javascript"</span>, <span className="text-emerald-400">"python"</span>, <span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"SQL"</span><span className="text-pink-400">]</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">"focus"</span>: <span className="text-emerald-400">"Scalable Web Applications"</span>
                <br />
                <span className="text-pink-400">{"}"}</span>
                <br />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}