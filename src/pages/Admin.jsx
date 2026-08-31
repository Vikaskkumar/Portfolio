import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useSiteData } from '../hooks/useSiteData';
import {
  Plus, Edit2, Trash2, ArrowLeft,
  Image as ImageIcon, Link as LinkIcon,
  LayoutGrid, Download, Upload, Sun, Moon, Shield,
  FileText, Phone, Wrench, FolderGit2, Save
} from 'lucide-react';
import { Github } from '../components/BrandIcons';

const fieldClass =
  'w-full px-4 py-2.5 rounded-xl bg-[var(--c-surface-2)] border border-[var(--c-border)] ' +
  'text-[var(--c-text)] placeholder:text-[var(--c-text-3)] ' +
  'focus:ring-2 focus:ring-[var(--c-accent)]/30 focus:border-[var(--c-accent)] outline-none transition text-sm';

export default function Admin({ theme, toggleTheme }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

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
  const [contactData, setContactData] = useState(siteData.contact);
  const [skillsJson, setSkillsJson] = useState(() => JSON.stringify(siteData.skills, null, 2));

  /* ── Backup helpers ─────────────────────────────────── */
  const handleExport = () => {
    const backup = { projects, siteData };
    const uri = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', uri);
    a.setAttribute('download', 'portfolio_backup.json');
    a.click();
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
        alert('Backup imported successfully!');
      } catch { alert('Error reading backup file.'); }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  /* ── Auth ───────────────────────────────────────────── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'vikas7742') setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  /* ── Project helpers ────────────────────────────────── */
  const openAddForm = () => {
    setProjectFormData({ title: '', description: '', tech: '', category: 'fullstack', image: '', demoUrl: '', githubUrl: '' });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (project) => {
    setProjectFormData({ ...project, tech: project.tech.join(', ') });
    setEditingId(project.id);
    setIsFormOpen(true);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const data = { ...projectFormData, tech: projectFormData.tech.split(',').map(t => t.trim()).filter(Boolean) };
    if (editingId) editProject({ ...data, id: editingId });
    else addProject(data);
    setIsFormOpen(false);
  };

  /* ── Site Data helpers ──────────────────────────────── */
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSiteData({ resume: { url: reader.result, name: file.name } });
      alert('Resume updated successfully!');
    };
    reader.readAsDataURL(file);
  };

  const saveContactInfo = (e) => {
    e.preventDefault();
    updateSiteData({ contact: contactData });
    alert('Contact info saved!');
  };

  const saveSkills = () => {
    try {
      const parsed = JSON.parse(skillsJson);
      updateSiteData({ skills: parsed });
      alert('Skills configuration saved!');
    } catch (e) {
      alert('Invalid JSON format. Please check your syntax.');
    }
  };


  /* ── Lock screen ────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--c-bg)]">
        <div className="max-w-md w-full bg-[var(--c-surface)] border border-[var(--c-border)] rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--c-surface-2)] border border-[var(--c-border)] mb-4">
              <Shield className="w-6 h-6 text-[var(--c-accent)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--c-text)] mb-1">Admin Access</h1>
            <p className="text-sm text-[var(--c-text-3)]">Enter your password to manage site</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={fieldClass}
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[var(--c-accent)] hover:opacity-90 text-white font-semibold rounded-xl transition"
            >
              Login
            </button>
          </form>
          <div className="mt-5 text-center">
            <Link to="/" className="text-sm text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
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
    <div className="min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-[var(--c-text-3)] hover:text-[var(--c-accent)] mb-2 transition">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--c-text)]">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-2)] hover:text-[var(--c-text)] transition" title="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={handleExport} className="p-2.5 rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-2)] hover:text-[var(--c-text)] transition" title="Export Backup">
              <Download className="w-4 h-4" />
            </button>
            <label className="p-2.5 rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-2)] hover:text-[var(--c-text)] transition cursor-pointer" title="Import Backup">
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </label>
            {activeTab === 'projects' && (
              <button onClick={openAddForm} className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[var(--c-accent)] hover:opacity-90 text-white font-semibold rounded-xl transition shadow-lg shadow-orange-500/20">
                <Plus className="w-4 h-4" /> Add Project
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-[var(--c-border)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[var(--c-surface)] border-t border-x border-[var(--c-border)] text-[var(--c-accent)]'
                  : 'text-[var(--c-text-2)] hover:bg-[var(--c-surface-2)] hover:text-[var(--c-text)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        
        {/* === PROJECTS TAB === */}
        {activeTab === 'projects' && (
          <div className="bg-[var(--c-surface)] rounded-2xl border border-[var(--c-border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--c-surface-2)] border-b border-[var(--c-border)] text-xs font-semibold text-[var(--c-text-3)] uppercase tracking-wider">
                    <th className="px-5 py-3.5">Project</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5 hidden md:table-cell">Links</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project.id} className="border-b border-[var(--c-border)] hover:bg-[var(--c-surface-2)] transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-10 rounded-lg overflow-hidden border border-[var(--c-border)] hidden sm:block shrink-0">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-semibold text-[var(--c-text)] text-sm">{project.title}</div>
                            <div className="text-xs text-[var(--c-text-3)] truncate max-w-[200px] sm:max-w-xs">{project.tech.join(', ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--c-surface-2)] text-[var(--c-text-2)] border border-[var(--c-border)] capitalize">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-3">
                          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition" title="Demo"><LinkIcon className="w-4 h-4" /></a>
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[var(--c-text-3)] hover:text-[var(--c-accent)] transition" title="GitHub"><Github className="w-4 h-4" /></a>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => openEditForm(project)} className="p-2 rounded-lg text-[var(--c-text-3)] hover:text-blue-500 hover:bg-blue-500/10 transition" title="Edit"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => { if (window.confirm('Delete this project?')) deleteProject(project.id); }} className="p-2 rounded-lg text-[var(--c-text-3)] hover:text-red-500 hover:bg-red-500/10 transition" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-16 text-center text-[var(--c-text-3)]">
                        <LayoutGrid className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>No projects yet. Add your first one!</p>
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
          <div className="max-w-2xl bg-[var(--c-surface)] rounded-2xl border border-[var(--c-border)] p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Manage Resume</h2>
            <p className="text-sm text-[var(--c-text-2)] mb-6">Upload a new PDF to update the resume link on the Hero section.</p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[var(--c-surface-2)] border border-[var(--c-border)] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FileText className="text-[var(--c-accent)]" />
                  <div>
                    <p className="font-semibold text-sm">Current Resume</p>
                    <p className="text-xs text-[var(--c-text-3)]">{siteData.resume.name}</p>
                  </div>
                </div>
                <a href={siteData.resume.url} download={siteData.resume.name} className="text-xs font-semibold text-[var(--c-text)] hover:text-[var(--c-accent)] transition">
                  Download
                </a>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider mb-2">Upload New Resume (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  className={`${fieldClass} file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--c-surface)] file:text-[var(--c-text)] hover:file:bg-[var(--c-border)]`}
                />
              </div>
            </div>
          </div>
        )}

        {/* === CONTACT INFO TAB === */}
        {activeTab === 'contact' && (
          <form onSubmit={saveContactInfo} className="max-w-2xl bg-[var(--c-surface)] rounded-2xl border border-[var(--c-border)] p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Contact Information</h2>
              <p className="text-sm text-[var(--c-text-2)]">Update the details shown in the Contact section and Footer.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Email Address</label>
                <input type="email" value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} className={fieldClass} required />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Phone Number (Display)</label>
                <input type="text" value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} className={fieldClass} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Location</label>
              <input type="text" value={contactData.location} onChange={e => setContactData({...contactData, location: e.target.value})} className={fieldClass} required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">WhatsApp Number (For links)</label>
              <input type="text" value={contactData.whatsapp} onChange={e => setContactData({...contactData, whatsapp: e.target.value})} className={fieldClass} placeholder="e.g. 919057262630" required />
              <p className="text-xs text-[var(--c-text-3)]">Include country code without the + sign.</p>
            </div>

            <div className="pt-2">
              <button type="submit" className="inline-flex items-center gap-2 bg-[var(--c-accent)] hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl transition">
                <Save className="w-4 h-4" /> Save Contact Info
              </button>
            </div>
          </form>
        )}

        {/* === TOOLS & SKILLS TAB === */}
        {activeTab === 'tools' && (
          <div className="bg-[var(--c-surface)] rounded-2xl border border-[var(--c-border)] p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Tools & Skills Editor</h2>
              <p className="text-sm text-[var(--c-text-2)]">Edit the JSON configuration for the Tools section. Use Devicon identifiers for icons.</p>
            </div>
            
            <textarea
              value={skillsJson}
              onChange={(e) => setSkillsJson(e.target.value)}
              className="w-full h-[500px] p-4 rounded-xl bg-[#0b0f19] text-[#a5b4fc] font-mono text-sm border border-[var(--c-border)] focus:ring-2 focus:ring-[var(--c-accent)]/30 outline-none resize-y"
              spellCheck="false"
            />

            <div>
              <button onClick={saveSkills} className="inline-flex items-center gap-2 bg-[var(--c-accent)] hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl transition">
                <Save className="w-4 h-4" /> Save Skills JSON
              </button>
            </div>
          </div>
        )}

        {/* Project Form Modal (Reused) */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-[var(--c-surface)] max-w-3xl w-full rounded-2xl shadow-2xl border border-[var(--c-border)] my-8">
              <div className="p-5 border-b border-[var(--c-border)] flex justify-between items-center">
                <h2 className="text-lg font-bold text-[var(--c-text)]">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={() => setIsFormOpen(false)} className="text-[var(--c-text-3)] hover:text-[var(--c-text)] transition text-xl leading-none">✕</button>
              </div>

              <form onSubmit={handleProjectSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Title</label>
                    <input required type="text" value={projectFormData.title} onChange={e => setProjectFormData({ ...projectFormData, title: e.target.value })} className={fieldClass} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Category</label>
                    <select value={projectFormData.category} onChange={e => setProjectFormData({ ...projectFormData, category: e.target.value })} className={fieldClass}>
                      <option value="fullstack">Full Stack</option>
                      <option value="frontend">Frontend</option>
                      <option value="tools">Tools & Utilities</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Description</label>
                  <textarea required rows="4" value={projectFormData.description} onChange={e => setProjectFormData({ ...projectFormData, description: e.target.value })} className={`${fieldClass} resize-none`} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Tech Stack (comma separated)</label>
                  <input required type="text" value={projectFormData.tech} onChange={e => setProjectFormData({ ...projectFormData, tech: e.target.value })} className={fieldClass} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Project Image</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-[var(--c-text-3)]" />
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setProjectFormData({ ...projectFormData, image: reader.result });
                          reader.readAsDataURL(file);
                        }
                      }} className={`${fieldClass} pl-9 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--c-surface-2)] file:text-[var(--c-text-2)]`} />
                  </div>
                  {projectFormData.image && <p className="text-xs text-emerald-500">✓ Image ready</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Demo URL</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-[var(--c-text-3)]" />
                      <input required type="url" value={projectFormData.demoUrl} onChange={e => setProjectFormData({ ...projectFormData, demoUrl: e.target.value })} className={`${fieldClass} pl-9`} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">GitHub URL</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3 w-4 h-4 text-[var(--c-text-3)]" />
                      <input required type="url" value={projectFormData.githubUrl} onChange={e => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })} className={`${fieldClass} pl-9`} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[var(--c-border)]">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-[var(--c-text-2)] hover:bg-[var(--c-surface-2)] transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[var(--c-accent)] hover:opacity-90 shadow-lg shadow-orange-500/20 transition">{editingId ? 'Save Changes' : 'Create Project'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
