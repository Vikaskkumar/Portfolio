import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useSiteData } from '../hooks/useSiteData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit2, Trash2, ArrowLeft,
  Image as ImageIcon, Link as LinkIcon,
  LayoutGrid, Download, Upload, Sun, Moon, Shield,
  FileText, Phone, Wrench, FolderGit2, Save,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { Github } from '../components/BrandIcons';

const fieldClass =
  'w-full px-4 py-3 rounded-xl bg-[var(--c-surface-2)] border border-[var(--c-border)] ' +
  'text-[var(--c-text)] placeholder:text-[var(--c-text-3)] ' +
  'focus:ring-2 focus:ring-[var(--c-accent)]/50 focus:border-[var(--c-accent)] outline-none transition text-sm';

export default function Admin({ theme, toggleTheme }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [alertMsg, setAlertMsg] = useState(null);

  const showAlert = (msg, type = 'success') => {
    setAlertMsg({ text: msg, type });
    setTimeout(() => setAlertMsg(null), 3000);
  };

  /* ── Hooks ──────────────────────────────────────────── */
  const { projects, addProject, editProject, deleteProject, setAllProjects } = useProjects();
  const { siteData, updateSiteData } = useSiteData();

  /* ── Project Form State ─────────────────────────────── */
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '', description: '', tech: '', category: 'fullstack', image: '', demoUrl: '', githubUrl: '',
  });

  /* ── Site Data Form State ───────────────────────────── */
  const [contactData, setContactData] = useState(siteData?.contact || { email: '', phone: '', location: '', whatsapp: '' });
  const [skillsJson, setSkillsJson] = useState(() => JSON.stringify(siteData?.skills || [], null, 2));

  // Sync state if siteData updates from local storage
  useEffect(() => {
    setContactData(siteData?.contact || { email: '', phone: '', location: '', whatsapp: '' });
    setSkillsJson(JSON.stringify(siteData?.skills || [], null, 2));
  }, [siteData]);

  /* ── Backup helpers ─────────────────────────────────── */
  const handleExport = () => {
    const backup = { projects, siteData };
    const uri = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', uri);
    a.setAttribute('download', 'portfolio_backup.json');
    a.click();
    showAlert('Backup exported successfully');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.projects) setAllProjects(data.projects);
        if (data.siteData) updateSiteData(data.siteData);
        showAlert('Backup imported successfully');
      } catch { showAlert('Error reading backup file', 'error'); }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  /* ── Auth ───────────────────────────────────────────── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'vikas7742') setIsAuthenticated(true);
    else showAlert('Incorrect password', 'error');
  };

  /* ── Project helpers ────────────────────────────────── */
  const openAddForm = () => {
    setProjectFormData({ title: '', description: '', tech: '', category: 'fullstack', image: '', demoUrl: '', githubUrl: '' });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (project) => {
    setProjectFormData({ 
      ...project, 
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : (project.tech || '') 
    });
    setEditingId(project.id);
    setIsFormOpen(true);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const techArray = typeof projectFormData.tech === 'string' 
      ? projectFormData.tech.split(',').map(t => t.trim()).filter(Boolean) 
      : (projectFormData.tech || []);
    
    const data = { ...projectFormData, tech: techArray };
    if (editingId) {
      editProject({ ...data, id: editingId });
      showAlert('Project updated successfully');
    } else {
      addProject(data);
      showAlert('Project added successfully');
    }
    setIsFormOpen(false);
  };

  /* ── Site Data helpers ──────────────────────────────── */
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSiteData({ resume: { url: reader.result, name: file.name } });
      showAlert('Resume updated successfully');
    };
    reader.readAsDataURL(file);
  };

  const saveContactInfo = (e) => {
    e.preventDefault();
    updateSiteData({ contact: contactData });
    showAlert('Contact info saved successfully');
  };

  const saveSkills = () => {
    try {
      const parsed = JSON.parse(skillsJson);
      updateSiteData({ skills: parsed });
      showAlert('Skills configuration saved');
    } catch (e) {
      showAlert('Invalid JSON format. Check syntax.', 'error');
    }
  };


  /* ── Lock screen ────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--c-bg)] relative overflow-hidden">
        {/* Background blobs for premium feel */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--c-accent)]/10 blur-[100px]" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[var(--c-surface)]/80 backdrop-blur-xl border border-[var(--c-border)] rounded-3xl shadow-2xl p-8 z-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--c-surface-2)] border border-[var(--c-border)] mb-5 shadow-inner">
              <Shield className="w-8 h-8 text-[var(--c-accent)]" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--c-text)] mb-2 tracking-tight">Admin Access</h1>
            <p className="text-sm text-[var(--c-text-3)]">Enter your credentials to manage the portfolio</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className={fieldClass}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[var(--c-accent)] to-orange-500 hover:opacity-90 text-white font-bold rounded-xl transition shadow-lg shadow-orange-500/25"
            >
              Authenticate
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm font-medium text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
          </div>
        </motion.div>

        {/* Global Alerts */}
        <AnimatePresence>
          {alertMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md font-medium text-sm ${
                alertMsg.type === 'error' 
                  ? 'bg-red-500/10 border-red-500/20 text-red-500'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
              }`}
            >
              {alertMsg.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              {alertMsg.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ── Dashboard ──────────────────────────────────────── */
  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'tools', label: 'Tools & Skills', icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] pb-20 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[var(--c-accent)]/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
        >
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--c-text-3)] hover:text-[var(--c-accent)] mb-3 transition">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--c-text)]">
              Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-[var(--c-surface)] rounded-xl border border-[var(--c-border)] p-1 shadow-sm">
              <button onClick={toggleTheme} className="p-2.5 rounded-lg text-[var(--c-text-2)] hover:text-[var(--c-text)] hover:bg-[var(--c-surface-2)] transition" title="Toggle theme">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <div className="w-[1px] h-6 bg-[var(--c-border)] self-center mx-1" />
              <button onClick={handleExport} className="p-2.5 rounded-lg text-[var(--c-text-2)] hover:text-[var(--c-text)] hover:bg-[var(--c-surface-2)] transition" title="Export Backup">
                <Download className="w-4 h-4" />
              </button>
              <label className="p-2.5 rounded-lg text-[var(--c-text-2)] hover:text-[var(--c-text)] hover:bg-[var(--c-surface-2)] transition cursor-pointer" title="Import Backup">
                <Upload className="w-4 h-4" />
                <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>
            </div>
            {activeTab === 'projects' && (
              <button onClick={openAddForm} className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[var(--c-accent)] to-orange-500 hover:opacity-90 text-white font-bold rounded-xl transition shadow-lg shadow-orange-500/25">
                <Plus className="w-5 h-5" /> Add Project
              </button>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-3 mb-8 pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[var(--c-accent)] text-white shadow-lg shadow-[var(--c-accent)]/20'
                  : 'bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-2)] hover:border-[var(--c-text-3)] hover:text-[var(--c-text)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* === PROJECTS TAB === */}
            {activeTab === 'projects' && (
              <div className="bg-[var(--c-surface)]/80 backdrop-blur-md rounded-3xl border border-[var(--c-border)] overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[var(--c-surface-2)]/50 border-b border-[var(--c-border)] text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider">
                        <th className="px-6 py-4">Project</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 hidden md:table-cell">Links</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project, idx) => (
                        <motion.tr 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={project.id} 
                          className="border-b border-[var(--c-border)] hover:bg-[var(--c-surface-2)]/50 transition group"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-12 rounded-xl overflow-hidden border border-[var(--c-border)] hidden sm:block shrink-0 shadow-sm">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                              </div>
                              <div>
                                <div className="font-bold text-[var(--c-text)] text-sm mb-0.5">{project.title}</div>
                                <div className="text-xs text-[var(--c-text-3)] truncate max-w-[200px] sm:max-w-xs font-medium">
                                  {Array.isArray(project.tech) ? project.tech.join(', ') : (project.tech || '')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--c-surface-2)] text-[var(--c-text-2)] border border-[var(--c-border)] capitalize">
                              {project.category}
                            </span>
                          </td>
                          <td className="px-6 py-5 hidden md:table-cell">
                            <div className="flex items-center gap-3">
                              {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[var(--c-surface-2)] text-[var(--c-text-3)] hover:text-[var(--c-accent)] hover:bg-[var(--c-accent)]/10 transition border border-transparent hover:border-[var(--c-accent)]/20" title="Demo">
                                  <LinkIcon className="w-4 h-4" />
                                </a>
                              )}
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[var(--c-surface-2)] text-[var(--c-text-3)] hover:text-[var(--c-text)] hover:bg-[var(--c-text)]/10 transition border border-transparent hover:border-[var(--c-text)]/20" title="GitHub">
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => openEditForm(project)} className="p-2.5 rounded-xl text-[var(--c-text-3)] hover:text-blue-500 hover:bg-blue-500/10 transition border border-transparent hover:border-blue-500/20" title="Edit"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => { if (window.confirm('Delete this project?')) { deleteProject(project.id); showAlert('Project deleted'); } }} className="p-2.5 rounded-xl text-[var(--c-text-3)] hover:text-red-500 hover:bg-red-500/10 transition border border-transparent hover:border-red-500/20" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                      {projects.length === 0 && (
                        <tr>
                          <td colSpan="4" className="py-20 text-center text-[var(--c-text-3)]">
                            <LayoutGrid className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="font-medium">No projects yet. Add your first one!</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* === RESUME TAB === */}
            {activeTab === 'resume' && (
              <div className="max-w-2xl bg-[var(--c-surface)]/80 backdrop-blur-md rounded-3xl border border-[var(--c-border)] p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-2 text-[var(--c-text)]">Manage Resume</h2>
                <p className="text-sm text-[var(--c-text-3)] mb-8 font-medium">Upload a new PDF to update the resume link on the Hero section.</p>
                
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[var(--c-surface-2)] border border-[var(--c-border)] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--c-accent)]/10 flex items-center justify-center border border-[var(--c-accent)]/20">
                        <FileText className="text-[var(--c-accent)] w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[var(--c-text)] mb-0.5">Current Resume</p>
                        <p className="text-xs font-medium text-[var(--c-text-3)]">{siteData?.resume?.name || 'No resume uploaded'}</p>
                      </div>
                    </div>
                    {siteData?.resume?.url && (
                      <a href={siteData.resume.url} download={siteData.resume.name} className="inline-flex justify-center items-center px-4 py-2 bg-[var(--c-surface)] rounded-xl text-sm font-bold text-[var(--c-text)] hover:text-[var(--c-accent)] border border-[var(--c-border)] transition shadow-sm">
                        Download PDF
                      </a>
                    )}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider mb-3">Upload New Resume (PDF)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleResumeUpload}
                      className={`${fieldClass} file:mr-4 file:py-2 file:px-5 file:rounded-xl file:border file:border-[var(--c-border)] file:text-xs file:font-bold file:bg-[var(--c-surface)] file:text-[var(--c-text)] hover:file:bg-[var(--c-surface-2)] file:transition cursor-pointer file:cursor-pointer`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* === CONTACT INFO TAB === */}
            {activeTab === 'contact' && (
              <form onSubmit={saveContactInfo} className="max-w-2xl bg-[var(--c-surface)]/80 backdrop-blur-md rounded-3xl border border-[var(--c-border)] p-8 space-y-6 shadow-xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2 text-[var(--c-text)]">Contact Information</h2>
                  <p className="text-sm text-[var(--c-text-3)] font-medium">Update the details shown in the Contact section and Footer.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Email Address</label>
                    <input type="email" value={contactData?.email || ''} onChange={e => setContactData({...contactData, email: e.target.value})} className={fieldClass} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Phone Number (Display)</label>
                    <input type="text" value={contactData?.phone || ''} onChange={e => setContactData({...contactData, phone: e.target.value})} className={fieldClass} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Location</label>
                  <input type="text" value={contactData?.location || ''} onChange={e => setContactData({...contactData, location: e.target.value})} className={fieldClass} required />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">WhatsApp Number (For links)</label>
                  <input type="text" value={contactData?.whatsapp || ''} onChange={e => setContactData({...contactData, whatsapp: e.target.value})} className={fieldClass} placeholder="e.g. 919057262630" required />
                  <p className="text-xs font-medium text-[var(--c-text-3)] ml-1">Include country code without the + sign.</p>
                </div>

                <div className="pt-4 border-t border-[var(--c-border)]">
                  <button type="submit" className="inline-flex items-center gap-2 bg-[var(--c-accent)] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg shadow-[var(--c-accent)]/20">
                    <Save className="w-5 h-5" /> Save Contact Info
                  </button>
                </div>
              </form>
            )}

            {/* === TOOLS & SKILLS TAB === */}
            {activeTab === 'tools' && (
              <div className="bg-[var(--c-surface)]/80 backdrop-blur-md rounded-3xl border border-[var(--c-border)] p-8 shadow-xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-[var(--c-text)]">Tools & Skills Editor</h2>
                  <p className="text-sm text-[var(--c-text-3)] font-medium">Edit the JSON configuration for the Tools section. Use Devicon identifiers for icons.</p>
                </div>
                
                <textarea
                  value={skillsJson}
                  onChange={(e) => setSkillsJson(e.target.value)}
                  className="w-full h-[500px] p-5 rounded-2xl bg-[#0b0f19]/80 backdrop-blur-md text-[#a5b4fc] font-mono text-sm border border-[var(--c-border)] focus:ring-2 focus:ring-[var(--c-accent)]/50 outline-none resize-y leading-relaxed shadow-inner"
                  spellCheck="false"
                />

                <div className="pt-6">
                  <button onClick={saveSkills} className="inline-flex items-center gap-2 bg-[var(--c-accent)] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg shadow-[var(--c-accent)]/20">
                    <Save className="w-5 h-5" /> Save Skills JSON
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Global Alerts inside app body */}
        <AnimatePresence>
          {alertMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl font-bold text-sm ${
                alertMsg.type === 'error' 
                  ? 'bg-red-500/10 border-red-500/30 text-red-500'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
              }`}
            >
              {alertMsg.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              {alertMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-[var(--c-surface)] max-w-3xl w-full rounded-3xl shadow-2xl border border-[var(--c-border)] my-8 overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-[var(--c-border)] flex justify-between items-center bg-[var(--c-surface-2)]/50">
                  <h2 className="text-xl font-bold text-[var(--c-text)]">
                    {editingId ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button onClick={() => setIsFormOpen(false)} className="text-[var(--c-text-3)] hover:text-[var(--c-text)] hover:bg-[var(--c-border)] p-2 rounded-xl transition">✕</button>
                </div>

                <form onSubmit={handleProjectSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Title</label>
                      <input required type="text" value={projectFormData.title} onChange={e => setProjectFormData({ ...projectFormData, title: e.target.value })} className={fieldClass} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Category</label>
                      <select value={projectFormData.category} onChange={e => setProjectFormData({ ...projectFormData, category: e.target.value })} className={fieldClass}>
                        <option value="fullstack">Full Stack</option>
                        <option value="frontend">Frontend</option>
                        <option value="tools">Tools & Utilities</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Description</label>
                    <textarea required rows="4" value={projectFormData.description} onChange={e => setProjectFormData({ ...projectFormData, description: e.target.value })} className={`${fieldClass} resize-none`} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Tech Stack (comma separated)</label>
                    <input required type="text" value={projectFormData.tech} onChange={e => setProjectFormData({ ...projectFormData, tech: e.target.value })} className={fieldClass} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Project Image</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-3.5 w-5 h-5 text-[var(--c-text-3)]" />
                      <input type="file" accept="image/*" onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setProjectFormData({ ...projectFormData, image: reader.result });
                            reader.readAsDataURL(file);
                          }
                        }} className={`${fieldClass} pl-12 file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-[var(--c-border)] file:text-xs file:font-bold file:bg-[var(--c-surface)] file:text-[var(--c-text)] hover:file:bg-[var(--c-surface-2)] file:transition cursor-pointer`} />
                    </div>
                    {projectFormData.image && <p className="text-xs font-bold text-emerald-500 ml-1">✓ Image ready</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">Demo URL</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-[var(--c-text-3)]" />
                        <input required type="url" value={projectFormData.demoUrl} onChange={e => setProjectFormData({ ...projectFormData, demoUrl: e.target.value })} className={`${fieldClass} pl-12`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--c-text-3)] uppercase tracking-wider ml-1">GitHub URL</label>
                      <div className="relative">
                        <Github className="absolute left-4 top-3.5 w-5 h-5 text-[var(--c-text-3)]" />
                        <input required type="url" value={projectFormData.githubUrl} onChange={e => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })} className={`${fieldClass} pl-12`} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-[var(--c-border)]">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 rounded-xl font-bold text-[var(--c-text-2)] hover:bg-[var(--c-surface-2)] transition border border-transparent hover:border-[var(--c-border)]">Cancel</button>
                    <button type="submit" className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--c-accent)] to-orange-500 hover:opacity-90 shadow-lg shadow-orange-500/25 transition">{editingId ? 'Save Changes' : 'Create Project'}</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
