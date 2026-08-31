import { useState } from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { Github } from './BrandIcons';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { projects } = useProjects();

  const filters = [
    { id: 'all',       name: 'All' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend',  name: 'Frontend' },
    { id: 'tools',     name: 'Tools & Utilities' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-20 sm:py-24 border-t border-[var(--c-border)] overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[var(--c-surface-2)] text-[var(--c-accent)] font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-[var(--c-border)]">
            <FolderGit2 className="w-3.5 h-3.5" />
            My Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[var(--c-text)]">
            Featured Projects
          </h2>
          <p className="text-[var(--c-text-2)] text-sm sm:text-base">
            A curated selection of applications showcasing my technical expertise and design sensibility.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 sm:mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeFilter === filter.id
                  ? 'bg-[var(--c-accent)] border-[var(--c-accent)] text-white shadow-lg shadow-orange-500/20'
                  : 'bg-[var(--c-surface)] border-[var(--c-border)] text-[var(--c-text-2)] hover:text-[var(--c-text)] hover:border-[var(--c-text-3)]'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col bg-[var(--c-surface)] border border-[var(--c-border)] rounded-2xl overflow-hidden hover:border-[var(--c-text-3)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="block relative overflow-hidden aspect-video border-b border-[var(--c-border)]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-semibold inline-flex items-center gap-1">
                    View Live <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--c-text)] group-hover:text-[var(--c-accent)] transition duration-150 font-display">
                    {project.title}
                  </h3>
                  <p className="text-[var(--c-text-2)] text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold font-mono bg-[var(--c-surface-2)] text-[var(--c-text-2)] border border-[var(--c-border)] px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--c-border)] pt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--c-text-3)] hover:text-[var(--c-text)] transition"
                    >
                      <Github className="w-4 h-4" />
                      Code Repository
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--c-accent)] hover:opacity-80 font-semibold transition"
                    >
                      Live Site
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
