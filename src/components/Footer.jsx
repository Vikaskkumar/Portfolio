import { ArrowUp, Mail, Shield } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  const socials = [
    { href: 'https://github.com/Vikas-kumar-kumawat', Icon: Github },
    { href: 'https://www.linkedin.com/in/vikas-kumar-kumawat-bb477629a/', Icon: Linkedin },
    { href: 'https://twitter.com', Icon: Twitter },
    { href: 'mailto:kvikaskumar040@gmail.com', Icon: Mail },
  ];

  return (
    <footer className="bg-[var(--c-surface)] border-t border-[var(--c-border)] py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Branding */}
        <div className="text-left space-y-1.5">
          <h3 className="text-lg font-black font-display text-[var(--c-text)]">Vikas.</h3>
          <p className="text-xs text-[var(--c-text-3)]">
            &copy; {year} Vikas Kumar. Built with React & Tailwind CSS.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-[10px] text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition"
          >
            <Shield className="w-3 h-3" />
            Admin Login
          </Link>
        </div>

        {/* Center: Socials */}
        <div className="flex items-center gap-4">
          {socials.map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="p-2 rounded-lg text-[var(--c-text-3)] hover:text-[var(--c-accent)] hover:bg-[var(--c-surface-2)] transition-all"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="group p-3 rounded-full bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-text-3)] hover:text-[var(--c-text)] hover:border-[var(--c-text-3)] transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 transition group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
