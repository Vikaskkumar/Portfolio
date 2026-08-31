import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home',     href: '#home',     id: 'home' },
    { label: 'About',    href: '#about',    id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact',  href: '#contact',  id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    });
    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--c-surface)]/90 backdrop-blur-md border-b border-[var(--c-border)] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <a
          href="#home"
          className="inline-flex items-center gap-1 font-display font-black text-xl tracking-tighter"
        >
          <span className="text-[var(--c-text)]">Vikas</span>
          <span className="text-[var(--c-accent)]">.</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-[var(--c-accent)]'
                    : 'text-[var(--c-text-2)] hover:text-[var(--c-text)]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-[var(--c-accent)] rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-lg bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-text-2)] hover:text-[var(--c-text)] hover:border-[var(--c-text-3)] transition-all"
            title="Admin Dashboard"
          >
            <Shield className="w-4 h-4" />
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-text-2)] hover:text-[var(--c-text)] hover:border-[var(--c-text-3)] transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-[var(--c-accent)] hover:opacity-90 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            Let's Connect
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/admin"
            className="p-2 rounded-lg bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-text-2)] transition-all"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-text-2)] transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[var(--c-text-2)] hover:text-[var(--c-text)] transition"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[var(--c-surface)] border-b border-[var(--c-border)] px-6 py-5 space-y-4 shadow-lg">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm font-semibold transition ${
                    activeSection === link.id
                      ? 'text-[var(--c-accent)] pl-3 border-l-4 border-[var(--c-accent)]'
                      : 'text-[var(--c-text-2)] hover:text-[var(--c-text)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-[var(--c-accent)] text-white font-bold py-2.5 px-4 rounded-lg transition"
          >
            Let's Connect
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}