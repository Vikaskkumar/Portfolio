import { useState, useEffect } from 'react';
import ecommerceImage from '../assets/e-com.png';
import cgpaImage from '../assets/cgpa-image.png';
import socialImage from '../assets/social2.png';

const LOCAL_STORAGE_KEY = 'portfolio_projects';

// Default hardcoded projects
const defaultProjects = [
  {
    id: '1',
    title: 'Full Stack Social Media Application',
    description:
      'A modern social media platform for developers featuring secure authentication, personalized feeds, follow/unfollow functionality, developer profiles, and interactive post engagement through likes and comments.',
    tech: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
      'Cloudinary',
      'JWT',
      'bcrypt'
    ],
    category: 'fullstack',
    image: socialImage,
    demoUrl: 'https://stark-net-one.vercel.app/',
    githubUrl: 'https://github.com/Vikaskkumar/StarkNet-',
  },
  {
    id: '2',
    title: 'ShopEase - Modern E-Commerce Store',
    description:
      'A responsive e-commerce web application built with React featuring product listings, category filtering, shopping cart functionality, product detail pages, and a streamlined checkout experience. Designed with a clean UI and optimized for performance across all devices.',
    tech: ['React', 'Tailwind CSS', 'React Router', 'Context API', 'Vite'],
    category: 'frontend',
    image: ecommerceImage,
    demoUrl: 'https://e-commerce1-fawn.vercel.app/',
    githubUrl: 'https://github.com/Vikaskkumar/e-commerce1',
  },
  {
    id: '3',
    title: 'CGPA Calculator - Academic Grade Calculator',
    description:
      'A clean and responsive CGPA calculator built with React that allows students to calculate semester-wise and cumulative CGPA with real-time updates, grade-to-point conversion, and an intuitive user interface optimized for quick academic planning.',
    tech: ['Tailwind CSS', 'JavaScript', 'Html'],
    category: 'tools',
    image: cgpaImage,
    demoUrl: 'https://cgpa-calculator-ruddy-sigma.vercel.app/',
    githubUrl: 'https://github.com/Vikaskkumar/cgpa-calculator',
  },
];

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load from local storage or use defaults
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse projects from local storage', e);
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProjects));
    }
  }, []);

  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: Date.now().toString(),
    };
    const updated = [...projects, projectWithId];
    setProjects(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const editProject = (updatedProject) => {
    const updated = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    setProjects(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const setAllProjects = (newProjectsList) => {
    setProjects(newProjectsList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProjectsList));
  };

  return { projects, addProject, editProject, deleteProject, setAllProjects };
}
