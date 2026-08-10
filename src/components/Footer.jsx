import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Copyright */}
        <div className="text-left space-y-1">
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">Vikas.</h3>
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Vikas. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:scale-105">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:scale-105">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:scale-105">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:contact@vikas.dev" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:scale-105">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <div>
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition duration-150"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 transition group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
