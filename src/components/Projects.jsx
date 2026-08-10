import { useState } from 'react';
import { ExternalLink, FolderGit2, Layers } from 'lucide-react';
import { Github } from './BrandIcons';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'tools', name: 'Tools & Utilities' },
  ];

  const projectsData = [
    {
      title: 'DevFlow - Developer Community Q&A',
      description: 'A modern, full-stack Q&A platform for developers. Features voting, advanced search, tag systems, developer profiles, and rich markdown formatting.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      category: 'fullstack',
      image: '/images/portfolio1.png',
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    },
    {
      title: 'NovaCrypto - Live Trading Dashboard',
      description: 'Real-time cryptocurrency analytics platform. Integrates charts, price indicators, market cap rankings, and order-book visuals powered by external APIs.',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Chart.js', 'CoinGecko API'],
      category: 'frontend',
      image: '/images/portfolio2.1.png',
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    },
    {
      title: 'ZenTask - Collaborative Workspaces',
      description: 'A visual task organizer with team workspace integrations. Includes drag-and-drop boards, socket-driven chat, task assignees, and progress visual analytics.',
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io'],
      category: 'fullstack',
      image: '/images/portfolio3.png',
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    },
    {
      title: 'GitScout - GitHub Analyzer Tool',
      description: 'Repository analytics tool designed to inspect developer accounts. Measures code composition metrics, star ratings, commit volumes, and recent activity.',
      tech: ['React', 'GitHub API', 'Tailwind CSS', 'Context API'],
      category: 'tools',
      image: '/images/portfolio4.png',
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 border-t border-slate-200 dark:border-slate-900 overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-purple-200/50 dark:border-purple-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            My Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            A curated selection of applications that showcase my technical expertise, backend architecture skills, and eye for frontend design.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeFilter === filter.id
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col gradient-border-card rounded-2xl overflow-hidden hover:border-purple-500/30 dark:hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden aspect-video border-b border-slate-200 dark:border-slate-800/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback visual in case files fail to load
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 text-left">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition duration-150 tracking-wide font-display">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5 justify-start">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold font-mono bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/60 pt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition duration-150"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition duration-150"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
