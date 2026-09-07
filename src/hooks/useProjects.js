import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ecommerceImage from '../assets/e-com.png';
import cgpaImage from '../assets/cgpa-image.png';
import socialImage from '../assets/social2.png';

// Fallback default projects just in case Supabase is empty initially
const defaultProjects = [
  {
    id: '1',
    title: 'Full Stack Social Media Application',
    description: 'A modern social media platform for developers...',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    category: 'fullstack',
    image: socialImage,
    demoUrl: 'https://stark-net-one.vercel.app/',
    githubUrl: 'https://github.com/Vikaskkumar/StarkNet-',
  },
  {
    id: '2',
    title: 'ShopEase - Modern E-Commerce Store',
    description: 'A responsive e-commerce web application...',
    tech: ['React', 'Tailwind CSS', 'React Router', 'Context API', 'Vite'],
    category: 'frontend',
    image: ecommerceImage,
    demoUrl: 'https://e-commerce1-fawn.vercel.app/',
    githubUrl: 'https://github.com/Vikaskkumar/e-commerce1',
  },
  {
    id: '3',
    title: 'CGPA Calculator - Academic Grade Calculator',
    description: 'A clean and responsive CGPA calculator...',
    tech: ['Tailwind CSS', 'JavaScript', 'Html'],
    category: 'tools',
    image: cgpaImage,
    demoUrl: 'https://cgpa-calculator-ruddy-sigma.vercel.app/',
    githubUrl: 'https://github.com/Vikaskkumar/cgpa-calculator',
  },
];

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedData = data ? data.map(p => ({
        ...p,
        demoUrl: p.demourl,
        githubUrl: p.githuburl
      })) : [];

      setProjects(mappedData);
    } catch (error) {
      console.error('Error fetching projects from Supabase:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (newProject) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: newProject.title,
          description: newProject.description,
          tech: newProject.tech,
          category: newProject.category,
          image: newProject.image,
          demourl: newProject.demoUrl,
          githuburl: newProject.githubUrl
        }])
        .select();

      if (error) throw error;
      
      if (data) {
        const mappedData = { ...data[0], demoUrl: data[0].demourl, githubUrl: data[0].githuburl };
        setProjects(prev => [mappedData, ...prev]);
      }
    } catch (error) {
      console.error('Error adding project to Supabase:', error);
      alert('Failed to add project to database. See console.');
    }
  };

  const editProject = async (updatedProject) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          title: updatedProject.title,
          description: updatedProject.description,
          tech: updatedProject.tech,
          category: updatedProject.category,
          image: updatedProject.image,
          demourl: updatedProject.demoUrl,
          githuburl: updatedProject.githubUrl
        })
        .eq('id', updatedProject.id)
        .select();

      if (error) throw error;
      
      if (data) {
        const mappedData = { ...data[0], demoUrl: data[0].demourl, githubUrl: data[0].githuburl };
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? mappedData : p));
      }
    } catch (error) {
      console.error('Error updating project in Supabase:', error);
      alert('Failed to update project in database. See console.');
    }
  };

  const deleteProject = async (id) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project from Supabase:', error);
      alert('Failed to delete project from database. See console.');
    }
  };

  const setAllProjects = async (newProjectsList) => {
    setProjects(newProjectsList);
    console.warn('Backup imported to local state only. Bulk save to Supabase not implemented yet.');
  };

  return { projects, loading, addProject, editProject, deleteProject, setAllProjects };
}
