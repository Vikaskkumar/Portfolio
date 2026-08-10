import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navLinks]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#fcf2e8] dark:bg-[#0f1423] border-b-[2.5px] border-[#10162f] dark:border-slate-800 py-3 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        {/* Codecademy-Inspired Blocky Logo */}
        <a 
          href="#home" 
          className="inline-flex items-center font-display font-black text-xs sm:text-sm tracking-wider uppercase border-[2.5px] border-[#10162f] dark:border-white overflow-hidden rounded-lg"
        >
          <span className="bg-[#10162f] dark:bg-white text-white dark:text-[#10162f] px-2 py-1">VIKAS</span>
          <span className="bg-[#ffd23f] text-[#10162f] px-2 py-1">DEV</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-bold">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a 
                href={link.href} 
                className={`transition-colors duration-200 relative py-1 ${
                  activeSection === link.id 
                    ? 'text-[#306998] dark:text-[#ffe054]' 
                    : 'text-[#10162f]/80 dark:text-slate-300 hover:text-[#306998] dark:hover:text-[#ffe054]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#306998] dark:bg-[#ffe054] rounded-full"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Theme Toggle & Action Button (Neobrutalist) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-[#1e2438] border-[2px] border-[#10162f] dark:border-white text-[#10162f] dark:text-white shadow-[2px_2px_0px_0px_#10162f] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:shadow-[3px_3px_0px_0px_#10162f] dark:hover:shadow-[3px_3px_0px_0px_#ffffff] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-1 bg-[#ffe054] hover:bg-[#ffd23f] text-[#10162f] font-bold text-xs px-4 py-2 border-[2px] border-[#10162f] dark:border-white shadow-[2px_2px_0px_0px_#10162f] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:shadow-[3px_3px_0px_0px_#10162f] dark:hover:shadow-[3px_3px_0px_0px_#ffffff] rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-[#1e2438] border-[2px] border-[#10162f] dark:border-white text-[#10162f] dark:text-white shadow-[2px_2px_0px_0px_#10162f] dark:shadow-[2px_2px_0px_0px_#ffffff] transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#10162f] dark:text-slate-300 hover:text-[#306998] dark:hover:text-[#ffe054] transition"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#fcf2e8] dark:bg-[#0f1423] border-b-[2.5px] border-[#10162f] dark:border-slate-800 flex flex-col p-6 space-y-4 shadow-lg">
          <ul className="flex flex-col space-y-3 text-left">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`block py-1.5 text-sm font-bold transition ${
                    activeSection === link.id 
                      ? 'text-[#306998] dark:text-[#ffe054] pl-2 border-l-4 border-[#306998] dark:border-[#ffe054]' 
                      : 'text-[#10162f]/80 dark:text-slate-300 hover:text-[#306998]'
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
            className="w-full inline-flex items-center justify-center gap-1 bg-[#ffe054] hover:bg-[#ffd23f] text-[#10162f] font-bold py-2.5 border-[2px] border-[#10162f] dark:border-white shadow-[2px_2px_0px_0px_#10162f] dark:shadow-[2px_2px_0px_0px_#ffffff] rounded-lg transition"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}