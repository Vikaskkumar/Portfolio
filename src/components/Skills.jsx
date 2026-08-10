import React from 'react';
import { motion } from 'framer-motion';

// SVG Logos & Components for Tech Icons (w-10 h-10 size)
const PythonLogo = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" title="Python">
    <path d="M12.1 2c-2.7 0-2.5 1.2-2.5 1.2v1.5h2.5V5h-3.7S6 4.7 6 7.4s1.2 2.5 1.2 2.5h1v-1.4S8 7.3 9.2 7.3h3v-2.5c0 0 .2-2.8-3.3-2.8zm-.2 20c2.7 0 2.5-1.2 2.5-1.2v-1.5h-2.5V19h3.7s2.2.3 2.2-2.4-1.2-2.5-1.2-2.5h-1v1.4s.2 1.2-1 1.2h-3v2.5c0 0-.2 2.8-3.3 2.8z" fill="#306998" />
    <path d="M11.9 22c2.7 0 2.5-1.2 2.5-1.2v-1.5h-2.5V19h3.7s2.2.3 2.2-2.4-1.2-2.5-1.2-2.5h-1v1.4s.2 1.2-1 1.2h-3v2.5c0 0-.2 2.8-3.3 2.8z" fill="#FFE054" />
  </svg>
);

const TensorFlowLogo = () => (
  <svg className="w-10 h-10 text-[#FF6F00]" viewBox="0 0 24 24" fill="currentColor" title="TensorFlow">
    <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm-1 4.5h2v3h-2v-3zm0 5h2v6h-2v-6z" />
  </svg>
);

const StreamlitLogo = () => (
  <svg className="w-10 h-10 text-[#FF4B4B]" viewBox="0 0 24 24" fill="currentColor" title="Streamlit">
    <path d="M12 2L2 22h20L12 2zm0 6l6 12H6l6-12z" />
  </svg>
);

const AnacondaLogo = () => (
  <svg className="w-10 h-10 text-[#43B02A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" title="Anaconda">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" />
  </svg>
);

const HtmlLogo = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" title="HTML">
    <path d="M5 3h14l-1.3 13.5-5.7 1.5-5.7-1.5L5 3z" fill="#E34F26" />
    <path d="M12 16.5l3.8-1 1-10.5H12v11.5z" fill="#EF652A" />
    <path d="M12 5v2.8h2.6l-.2 3H12v2.8l2 .1-.2 2.5-1.8.5V16.5z" fill="#FFF" />
  </svg>
);

const CssLogo = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" title="CSS">
    <path d="M5 3h14l-1.3 13.5-5.7 1.5-5.7-1.5L5 3z" fill="#1572B6" />
    <path d="M12 16.5l3.8-1 1-10.5H12v11.5z" fill="#33A9DC" />
    <path d="M12 5v2.8h2.6l-.2 3H12v2.8l2 .1-.2 2.5-1.8.5V16.5z" fill="#FFF" />
  </svg>
);

const ReactLogo = () => (
  <svg className="w-10 h-10 text-[#00D8FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" title="React">
    <g transform="translate(12, 12)">
      <ellipse rx="9" ry="3.5" />
      <ellipse rx="9" ry="3.5" transform="rotate(60)" />
      <ellipse rx="9" ry="3.5" transform="rotate(120)" />
      <circle r="1.5" fill="currentColor" />
    </g>
  </svg>
);

const TailwindLogo = () => (
  <svg className="w-10 h-10 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor" title="Tailwind">
    <path d="M12 6.096c-2.667 0-4 1.333-4 4 0 2.666 1.333 4 4 4 2.666 0 4-1.334 4-4 0-2.667-1.334-4-4-4zm-8 8c-2.667 0-4 1.333-4 4s1.333 4 4 4c2.666 0 4-1.333 4-4s-1.334-4-4-4z" />
  </svg>
);

const MaterialUiLogo = () => (
  <svg className="w-10 h-10 text-[#007FFF]" viewBox="0 0 24 24" fill="currentColor" title="Material UI">
    <path d="M0 12l12-12 12 12-12 12z" />
  </svg>
);

const NodeLogo = () => (
  <svg className="w-10 h-10 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" title="Node.js">
    <path d="M12 2a1 1 0 00-.5.1L3.9 6.5a1 1 0 00-.5.9v8.2a1 1 0 00.5.9l7.6 4.4a1 1 0 001 0l7.6-4.4a1 1 0 00.5-.9V7.4a1 1 0 00-.5-.9l-7.6-4.4a1 1 0 00-.5-.1zm-1 6.5c.8 0 1.5.5 1.8 1.2l-1.3.6a1 1 0 01-.5-.3c-.3-.3-.4-.3-.5-.3-.3 0-.5.2-.5.5v3a.5.5 0 00.5.5h.3a1 1 0 01.4-.2l.1-.1.7-1h-1.2V10h3v4.5h-1.5v-1l-.3.2a2 2 0 01-1.3.3c-1.3 0-2.2-1-2.2-2.2v-2.1c0-1.2.9-2.2 2.2-2.2z" />
  </svg>
);

const MongoLogo = () => (
  <svg className="w-10 h-10 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor" title="MongoDB">
    <path d="M12 2C8.5 6.5 7 10 7 13.5c0 3 2.25 5 5 5s5-2 5-5c0-3.5-1.5-7-5-11.5zm0 13c-1.5 0-2-.5-2-1.5s1-2 2-3.5c1 1.5 2 2.5 2 3.5s-.5 1.5-2 1.5z" />
  </svg>
);

const SqlLogo = () => (
  <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" title="SQL">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const GraphQLLogo = () => (
  <svg className="w-10 h-10 text-[#E10098]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" title="GraphQL">
    <polygon points="12 2 22 8 22 16 12 22 2 16 2 8" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const GitLogo = () => (
  <svg className="w-10 h-10 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor" title="Git">
    <path d="M23.3 10.9L13.1.7c-.5-.5-1.3-.5-1.8 0L9.4 2.6l3.2 3.2c.3-.1.7-.2 1.1-.2 1.1 0 2 .9 2 2 0 .4-.1.8-.3 1.1l3.2 3.2c.3-.2.7-.3 1.1-.3 1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2c0-.4.1-.7.3-1l-3.2-3.2c-.3.2-.7.3-1.1.3-1.1 0-2-.9-2-2 0-.4.1-.8.3-1.1L9.6 4.9.7 13.8c-.5.5-.5 1.3 0 1.8l10.2 10.2c.5.5 1.3.5 1.8 0l10.2-10.2c.4-.5.4-1.3.4-1.8M13.2 12c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1" />
  </svg>
);

const GitHubLogo = () => (
  <svg className="w-10 h-10 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="currentColor" title="GitHub">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const DockerLogo = () => (
  <svg className="w-10 h-10 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor" title="Docker">
    <path d="M13.983 8.871h-2.111c-.086 0-.156.07-.156.156v1.956c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V9.027c0-.086-.07-.156-.156-.156zm-2.825 0H9.047c-.086 0-.156.07-.156.156v1.956c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V9.027c0-.086-.07-.156-.156-.156zm-2.825 0H6.221c-.086 0-.156.07-.156.156v1.956c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V9.027c0-.086-.07-.156-.156-.156zm-2.824 0H3.397c-.086 0-.156.07-.156.156v1.956c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V9.027c0-.086-.07-.156-.156-.156zm11.288-2.812h-2.111c-.086 0-.156.07-.156.156V8.17c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V6.215c0-.086-.07-.156-.156-.156zm-2.825 0h-2.111c-.086 0-.156.07-.156.156V8.17c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V6.215c0-.086-.07-.156-.156-.156zm-2.825 0H9.047c-.086 0-.156.07-.156.156V8.17c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V6.215c0-.086-.07-.156-.156-.156zm8.462 0h-2.111c-.086 0-.156.07-.156.156V8.17c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V6.215c0-.086-.07-.156-.156-.156zm-2.824-2.812h-2.111c-.086 0-.156.07-.156.156V5.36c0 .086.07.156.156.156h2.111c.086 0 .156-.07.156-.156V3.56c0-.086-.07-.156-.156-.156zm-17.7 7.078c.062.247.165.485.305.7.37.568.969.969 1.632 1.096.536.103 1.09.07 1.608-.103.518-.172.969-.511 1.282-.958.33-.472.502-1.037.494-1.611 0-.086-.07-.156-.156-.156H1.365a.156.156 0 00-.156.156c0 .321.05.638.148.937z" />
  </svg>
);

const VercelLogo = () => (
  <svg className="w-10 h-10 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor" title="Vercel">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

export default function Skills() {
  const skillsData = [
    {
      category: 'Frontend Development',
      dotColor: '#3b82f6', // Blue
      items: [
        { name: 'HTML', component: HtmlLogo },
        { name: 'CSS', component: CssLogo },
        { name: 'JavaScript', element: <div className="w-10 h-10 bg-[#F7DF1E] text-black font-extrabold flex items-center justify-center rounded text-lg select-none" title="JavaScript">JS</div> },
        { name: 'React', component: ReactLogo },
        { name: 'Tailwind', component: TailwindLogo },
      ]
    },
    {
      category: 'Backend & Database',
      dotColor: '#10b981', // Green
      items: [
        { name: 'Node.js', component: NodeLogo },
        { name: 'Express', element: <div className="w-10 h-10 bg-slate-800 text-white font-bold flex items-center justify-center rounded text-xs select-none" title="Express">EX</div> },
        { name: 'MongoDB', component: MongoLogo },
        { name: 'SQL', component: SqlLogo },
      ]
    },
    {
      category: 'DevOps & Tools',
      dotColor: '#eab308', // Yellow
      items: [
        { name: 'Git', component: GitLogo },
        { name: 'GitHub', component: GitHubLogo },
        { name: 'Vercel', component: VercelLogo },
        { name: 'VS Code', element: <div className="w-10 h-10 bg-[#007ACC] text-white font-black flex items-center justify-center rounded text-[13px] select-none border border-slate-700/30" title="VS Code">VS</div> },
        { name: 'AWS', element: <div className="w-10 h-10 bg-[#232F3E] text-[#FF9900] font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-700/30" title="AWS">AWS</div> },
        { name: 'Azure', element: <div className="w-10 h-10 bg-[#0089D6] text-white font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-700/30" title="Azure">AZ</div> },
        { name: 'Antigravity', element: <div className="w-10 h-10 bg-slate-800 text-white font-black flex items-center justify-center rounded text-[14px] select-none border border-slate-700/30 shadow-[0_0_8px_rgba(168,85,247,0.4)]" title="import antigravity">🚀</div> },
      ]
    },
    {
      category: 'AI & Machine Learning',
      dotColor: '#a855f7', // Purple
      items: [
        { name: 'Python', component: PythonLogo },
        { name: 'NumPy', element: <div className="w-10 h-10 bg-[#4d77cf] text-white font-black flex items-center justify-center rounded text-[13px] select-none border border-slate-700/30" title="NumPy">np</div> },
        { name: 'Pandas', element: <div className="w-10 h-10 bg-[#150458] text-white font-black flex items-center justify-center rounded text-[13px] select-none border border-slate-700/30" title="Pandas">pd</div> },
        { name: 'Matplotlib', element: <div className="w-10 h-10 bg-[#11557c] text-white font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-700/30" title="Matplotlib">plt</div> },
        { name: 'Seaborn', element: <div className="w-10 h-10 bg-[#4cb7a5] text-white font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-700/30" title="Seaborn">sns</div> },
      ]
    },
    {
      category: 'AI Assistants',
      dotColor: '#0ea5e9', // Sky Blue
      items: [
        { name: 'ChatGPT', element: <div className="w-10 h-10 bg-[#10A37F] text-white font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-700/30" title="ChatGPT">GPT</div> },
        { name: 'Claude', element: <div className="w-10 h-10 bg-[#D97757] text-[#FAF8F5] font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-700/30 font-serif" title="Claude">CLD</div> },
        { name: 'Gemini', element: <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-700/30" title="Gemini">GEM</div> },
        { name: 'Grok', element: <div className="w-10 h-10 bg-black text-white font-black flex items-center justify-center rounded text-[11px] select-none border border-slate-500/50 shadow-inner" title="Grok">GRK</div> },
      ]
    },
    {
      category: 'Languages',
      dotColor: '#ef4444', // Red
      items: [
        { name: 'C', element: <div className="w-10 h-10 bg-[#00599C] text-white font-extrabold flex items-center justify-center rounded text-xl select-none" title="C">C</div> },
        { name: 'C++', element: <div className="w-10 h-10 bg-[#00599C] text-white font-extrabold flex items-center justify-center rounded text-sm select-none" title="C++">C++</div> },
        { name: 'Python', component: PythonLogo },
        { name: 'JavaScript', element: <div className="w-10 h-10 bg-[#F7DF1E] text-black font-extrabold flex items-center justify-center rounded text-lg select-none" title="JavaScript">JS</div> },
        { name: 'SQL', element: <div className="w-10 h-10 bg-[#E38C00] text-white font-extrabold flex items-center justify-center rounded text-sm select-none" title="SQL">SQL</div> },
      ]
    }
  ];

  // Upgraded Animation variants for the Popup Effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each card popping up
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.85 }, // Starts lower and slightly smaller
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring", // Gives it the elastic, popup bounce
        stiffness: 110,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <section id="about" className="relative py-28 border-t border-slate-200 dark:border-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Main Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#10162f] dark:text-white select-none">
            Tech Stack & Tools
          </h2>
          <div className="w-16 h-1 bg-[#ffd23f] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tech Stack Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }} // Triggers slightly before scrolling fully into view
        >
          {skillsData.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`p-6 sm:p-8 rounded-3xl border-[2.5px] border-[#10162f] dark:border-slate-800 bg-white dark:bg-[#0c0e17] shadow-[4px_4px_0px_0px_#10162f] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.03)] hover:shadow-[6px_6px_0px_0px_#10162f] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] transition-all transform hover:-translate-y-0.5 ${cat.category === 'Languages' ? 'md:col-span-2' : ''
                }`}
            >
              {/* Card Title with Color Bullet */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-3 h-3 rounded-full inline-block shrink-0 shadow-sm"
                  style={{ backgroundColor: cat.dotColor }}
                ></span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#10162f] dark:text-white tracking-wide">
                  {cat.category}
                </h3>
              </div>

              {/* Grid of Skill Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {cat.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-[#121420] border-[2px] border-[#10162f] dark:border-slate-800/80 shadow-[2px_2px_0px_0px_#10162f] dark:shadow-none hover:shadow-[3px_3px_0px_0px_#10162f] dark:hover:border-slate-700 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 flex items-center justify-center mb-3">
                      {item.element ? item.element : <item.component />}
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center tracking-wide">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}