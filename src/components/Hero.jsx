import { useState } from 'react';
import { ArrowRight, Mail, Terminal, Check, Copy, Download } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const pythonCode = `# main.py
developer = {
    "name": "Vikas",
    "role": "Full-Stack Engineer",
    "skills": ["Python", "FastAPI", "React", "SQL"],
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
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
          
          {/* Simple Inline Code Greeting */}
          <div className="font-mono text-xs sm:text-sm font-bold text-[#306998] dark:text-[#ffe054] tracking-wide select-none">
            print(<span className="text-emerald-600 dark:text-emerald-400">"Welcome to my portfolio!"</span>)
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display leading-[1.15] tracking-tight text-[#10162f] dark:text-white">
            Hi, I'm <span className="text-[#306998] dark:text-[#ffe054]">Vikas</span>.
            <br />
            I build digital experiences.
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
            I am a software engineer dedicated to crafting clean, high-performance web applications. I design responsive interfaces and implement robust backend services.
          </p>

          {/* Action Buttons (Neobrutalist style) */}
          <div className="flex flex-wrap items-center gap-5 pt-3">
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 bg-[#306998] hover:bg-[#25547c] text-white font-bold px-6 py-3.5 rounded-xl border-[2.5px] border-[#10162f] dark:border-white shadow-[4px_4px_0px_0px_#10162f] dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#10162f]"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="/resume.pdf" 
              download="Vikas_Resume.pdf"
              className="inline-flex items-center gap-2 bg-[#ffe054] hover:bg-[#ffd23f] text-[#10162f] font-bold px-6 py-3.5 rounded-xl border-[2.5px] border-[#10162f] dark:border-white shadow-[4px_4px_0px_0px_#10162f] dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#10162f]"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          <div className="flex items-center gap-4 pt-6 text-slate-500 dark:text-slate-400">
            <span className="text-xs uppercase tracking-widest font-black mr-2 text-[#10162f] dark:text-[#fcf2e8]">Connect</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#10162f] dark:text-slate-400 hover:text-[#306998] dark:hover:text-[#ffe054] transition transform hover:scale-110">
              <Github className="w-5.5 h-5.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#10162f] dark:text-slate-400 hover:text-[#306998] dark:hover:text-[#ffe054] transition transform hover:scale-110">
              <Linkedin className="w-5.5 h-5.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#10162f] dark:text-slate-400 hover:text-[#306998] dark:hover:text-[#ffe054] transition transform hover:scale-110">
              <Twitter className="w-5.5 h-5.5" />
            </a>
            <a href="mailto:contact@vikas.dev" className="text-[#10162f] dark:text-slate-400 hover:text-[#306998] dark:hover:text-[#ffe054] transition transform hover:scale-110">
              <Mail className="w-5.5 h-5.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Code Window */}
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
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">"skills"</span>: <span className="text-pink-400">[</span><span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"FastAPI"</span>, <span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"SQL"</span><span className="text-pink-400">]</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">"focus"</span>: <span className="text-emerald-400">"Scalable Web Applications"</span>
                <br />
                <span className="text-pink-400">{"}"}</span>
                <br />
                <br />
                <span className="text-blue-400">print</span>(f<span className="text-emerald-400">"Hi, I'm </span><span className="text-[#ffe054]">{"{"}</span>developer[<span className="text-emerald-400">"name"</span>]<span className="text-[#ffe054]">{"}"}</span><span className="text-emerald-400">. Welcome to my portfolio!"</span>)
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
