import { useState } from 'react';
import { ArrowRight, Mail, Terminal, Check, Copy, Download } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';
import { useSiteData } from '../hooks/useSiteData';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const { siteData } = useSiteData();

  const pythonCode = `# main.py
developer = {
    "name": "Vikas",
    "role": "Full-Stack Engineer",
    "skills": ["Javascript", "Python", "React", "SQL"],
    "focus": "Scalable Web Applications"
}

print(f"Hi, I'm {developer['name']}. Welcome!")`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--c-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left: Info */}
        <div className="flex flex-col justify-center text-left">


          {/* Greeting */}
          <p className="text-lg sm:text-xl font-medium text-[var(--c-text-2)] mb-2 flex items-center gap-2">
            Hi <span className="text-2xl">👋🏻</span> My name is
          </p>

          {/* Large Name */}
          <h1 className="text-6xl sm:text-7xl md:text-[7.5rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#f59e0b] mb-4 pb-2 leading-none">
            Vikas.
          </h1>

          {/* Subtitle */}
          <div className="text-xl sm:text-2xl font-medium text-[var(--c-text-2)] leading-relaxed mb-8">
            <p>I'm a Fullstack Software Engineer.</p>
            <p>
              I create{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#f59e0b]">
                Exciting Stuff
              </span>{' '}
              on the Internet.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[var(--c-accent)] hover:opacity-90 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={siteData.resume.url}
              download={siteData.resume.name}
              className="inline-flex items-center gap-2 bg-[var(--c-surface)] hover:bg-[var(--c-surface-2)] text-[var(--c-text)] font-bold px-6 py-3.5 rounded-xl border border-[var(--c-border)] transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 pt-8">
            {[
              { href: 'https://github.com/Vikas-kumar-kumawat', Icon: Github },
              { href: 'https://www.linkedin.com/in/vikas-kumar-kumawat-bb477629a/', Icon: Linkedin },
              { href: 'https://twitter.com', Icon: Twitter },
              { href: `mailto:${siteData.contact.email}`, Icon: Mail },
            ].map(({ href, Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition-all transform hover:scale-110"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Code Window */}
        <div className="w-full">
          <div className="w-full rounded-2xl overflow-hidden border border-[var(--c-border)] shadow-2xl shadow-black/10 dark:shadow-black/40">
            {/* Terminal top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e2438] border-b border-[#2d3553]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>vikas_portfolio ~ main.py</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="text-slate-500 hover:text-white transition"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {/* Code */}
            <div className="p-5 sm:p-8 font-mono text-xs sm:text-base text-left overflow-x-auto bg-[#0b0f19]">
              <pre className="text-slate-300 leading-relaxed">
                <span className="text-slate-500"># main.py</span>{'\n'}
                developer = <span className="text-pink-400">{'{'}</span>{'\n'}
                {'    '}<span className="text-indigo-400">"name"</span>: <span className="text-emerald-400">"Vikas"</span>,{'\n'}
                {'    '}<span className="text-indigo-400">"role"</span>: <span className="text-emerald-400">"Full-Stack Engineer"</span>,{'\n'}
                {'    '}<span className="text-indigo-400">"skills"</span>: <span className="text-pink-400">[</span>
                <span className="text-emerald-400">"Javascript"</span>, <span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"React"</span>
                <span className="text-pink-400">]</span>,{'\n'}
                {'    '}<span className="text-indigo-400">"focus"</span>: <span className="text-emerald-400">"Scalable Web Apps"</span>{'\n'}
                <span className="text-pink-400">{'}'}</span>{'\n'}{'\n'}
                <span className="text-blue-400">print</span>(<span className="text-emerald-400">f"Hi, I'm </span>
                <span className="text-amber-400">{'{'}</span><span className="text-slate-300">developer</span>
                <span className="text-pink-400">['name']</span><span className="text-amber-400">{'}'}</span>
                <span className="text-emerald-400">. Welcome!"</span>)
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}