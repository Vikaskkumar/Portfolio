import { motion } from 'framer-motion';

const devicon = (name, type = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`;

const categories = [
  {
    label: 'Frontend',
    emoji: '🎨',
    color: '#3b82f6',
    skills: [
      { name: 'HTML5',      icon: devicon('html5') },
      { name: 'CSS3',       icon: devicon('css3') },
      { name: 'JavaScript', icon: devicon('javascript') },
      { name: 'React',      icon: devicon('react') },
      { name: 'Tailwind',   icon: devicon('tailwindcss', 'plain') },
      { name: 'Vite',       icon: devicon('vitejs', 'plain') },
    ],
  },
  {
    label: 'Backend & DB',
    emoji: '⚙️',
    color: '#10b981',
    skills: [
      { name: 'Node.js',    icon: devicon('nodejs', 'plain') },
      { name: 'Express',    icon: devicon('express', 'original') },
      { name: 'MongoDB',    icon: devicon('mongodb', 'plain') },
      { name: 'MySQL',      icon: devicon('mysql', 'plain') },
      { name: 'PostgreSQL', icon: devicon('postgresql', 'plain') },
    ],
  },
  {
    label: 'AI & Data',
    emoji: '🧠',
    color: '#a855f7',
    skills: [
      { name: 'Python',       icon: devicon('python', 'plain') },
      { name: 'NumPy',        icon: devicon('numpy', 'plain') },
      { name: 'Pandas',       icon: devicon('pandas', 'plain') },
      { name: 'TensorFlow',   icon: devicon('tensorflow', 'plain') },
      { name: 'Scikit-learn', icon: devicon('scikitlearn', 'plain') },
    ],
  },
  {
    label: 'DevOps & Tools',
    emoji: '🛠️',
    color: '#f59e0b',
    skills: [
      { name: 'Git',     icon: devicon('git', 'plain') },
      { name: 'GitHub',  icon: devicon('github', 'original') },
      { name: 'Docker',  icon: devicon('docker', 'plain') },
      { name: 'VS Code', icon: devicon('vscode', 'plain') },
      { name: 'Postman', icon: devicon('postman', 'plain') },
      { name: 'Vercel',  icon: devicon('vercel', 'plain') },
    ],
  },
  {
    label: 'Languages',
    emoji: '💻',
    color: '#ef4444',
    skills: [
      { name: 'C',          icon: devicon('c', 'plain') },
      { name: 'C++',        icon: devicon('cplusplus', 'plain') },
      { name: 'Python',     icon: devicon('python', 'plain') },
      { name: 'JavaScript', icon: devicon('javascript', 'plain') },
    ],
  },
  {
    label: 'AI Assistants',
    emoji: '🤖',
    color: '#0ea5e9',
    skills: [
      { name: 'ChatGPT', custom: { bg: '#10A37F',                                text: 'GPT' } },
      { name: 'Claude',  custom: { bg: '#D97757',                                text: 'AI'  } },
      { name: 'Gemini',  custom: { bg: 'linear-gradient(135deg,#4285F4,#9C27B0)',text: '✦'   } },
      { name: 'Grok',    custom: { bg: '#111',                                   text: 'xAI' } },
    ],
  },
];

/* ─── animations ───────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.38, delay: i * 0.08 } }),
};

const pillAnim = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: (i) => ({ opacity: 1, scale: 1, transition: { duration: 0.28, delay: i * 0.045 } }),
};

/* ─── Skill pill ────────────────────────────────────────────── */
function SkillPill({ skill, custom }) {
  return (
    <motion.div
      variants={pillAnim}
      custom={custom}
      whileHover={{ y: -4, scale: 1.07 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl
                 bg-[var(--c-surface)] border border-[var(--c-border)]
                 hover:border-[var(--c-text-3)] hover:shadow-md
                 transition-all duration-200 cursor-default group"
    >
      <div className="w-11 h-11 flex items-center justify-center">
        {skill.custom ? (
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center
                       font-black text-xs text-white select-none shadow-sm"
            style={{ background: skill.custom.bg }}
          >
            {skill.custom.text}
          </div>
        ) : (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-11 h-11 object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
      </div>
      <span className="text-[10px] font-semibold text-[var(--c-text-3)]
                       group-hover:text-[var(--c-text)] transition-colors
                       text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ─── Category card ─────────────────────────────────────────── */
function CategoryCard({ cat, cardIndex }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={cardIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="bg-[var(--c-surface-2)] border border-[var(--c-border)]
                 rounded-3xl p-7 hover:border-[var(--c-text-3)]
                 transition-colors duration-200"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: cat.color + '18' }}
        >
          {cat.emoji}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[var(--c-text)]">{cat.label}</h3>
          <div className="w-8 h-[2px] rounded-full mt-1" style={{ background: cat.color }} />
        </div>
      </div>

      {/* Pills */}
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cat.skills.map((skill, i) => (
          <SkillPill key={skill.name} skill={skill} custom={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function Skills() {
  return (
    <section id="about" className="relative py-24 sm:py-28 border-t border-[var(--c-border)] overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-1/4  w-72 h-72 bg-blue-500/5   rounded-full blur-3xl" />
        <div className="absolute bottom-0  right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-[var(--c-accent)] font-semibold
                       text-xs uppercase tracking-widest mb-5
                       bg-[var(--c-surface-2)] border border-[var(--c-border)]
                       px-4 py-1.5 rounded-full"
          >
            ⚡ My Arsenal
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--c-text)]"
          >
            Tech Stack &amp;{' '}
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              Tools
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-4 text-[var(--c-text-2)] max-w-lg mx-auto text-sm sm:text-base leading-relaxed"
          >
            Technologies I use to bring ideas to life — from pixels to servers to data pipelines.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.label} cat={cat} cardIndex={i} />
          ))}
        </div>

      </div>
    </section>
  );
}