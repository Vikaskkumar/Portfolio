import { useState, useEffect } from 'react';
import resumePDF from '../assets/resume(vikas).pdf';

const LOCAL_STORAGE_KEY = 'portfolio_sitedata';

const devicon = (name, type = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${type}.svg`;

const defaultSkills = [
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

const defaultData = {
  resume: {
    url: resumePDF,
    name: 'Vikas_Resume.pdf'
  },
  contact: {
    email: 'kvikaskumar040@gmail.com',
    phone: '+91 9057262630',
    location: 'Jaipur, Rajasthan, India',
    whatsapp: '919057262630'
  },
  skills: defaultSkills
};

export function useSiteData() {
  const [siteData, setSiteData] = useState(defaultData);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSiteData({ ...defaultData, ...parsed }); // Merge to ensure new fields are present
      } catch (e) {
        console.error('Failed to parse site data from local storage', e);
        setSiteData(defaultData);
      }
    } else {
      setSiteData(defaultData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
    }
  }, []);

  const updateSiteData = (newData) => {
    const updated = { ...siteData, ...newData };
    setSiteData(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return { siteData, updateSiteData };
}
