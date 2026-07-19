import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, LogOut, LayoutGrid, MessageSquare, Briefcase, 
  Settings, Award, Sparkles, BookOpen, Upload, Trash2, Edit3, 
  PlusCircle, FileText, Check, AlertTriangle, Eye, ShieldCheck, Terminal, Star
} from 'lucide-react';
import { Project, Skill, Education, Experience, ExtraCurricular, Certification, ContactMessage, VisitorLog, DashboardStats, Profile } from '../types';

interface DashboardProps {
  onClose: () => void;
  onRefreshAllData: () => void;
  allProjects: Project[];
  allSkills: Skill[];
  allEducations: Education[];
  allExperiences: Experience[];
  allExtraCurriculars: ExtraCurricular[];
  allCertifications: Certification[];
  profile: Profile | null;
}

export default function Dashboard({ 
  onClose, 
  onRefreshAllData,
  allProjects,
  allSkills,
  allEducations,
  allExperiences,
  allExtraCurriculars,
  allCertifications,
  profile
}: DashboardProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  const checkAuthResponse = async (resp: Response): Promise<boolean> => {
    if (resp.status === 401) {
      const currentToken = localStorage.getItem('admin_token');
      if (currentToken) {
        localStorage.removeItem('admin_token');
        setToken(null);
        alert('Your admin session has expired or is invalid. Please log in again.');
      }
      return false;
    }
    return true;
  };

  // Active admin module tab
  type ActiveTab = 'overview' | 'messages' | 'projects' | 'skills' | 'education' | 'experience' | 'extracurricular' | 'certifications' | 'resume' | 'profile';
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Aggregated Stats
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Message logs
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Project Editor States
  const [selectedProject, setSelectedProject] = useState<Partial<Project> | null>(null);
  const [projectEditorAction, setProjectEditorAction] = useState<'idle' | 'create' | 'edit'>('idle');
  const [projSubmitting, setProjSubmitting] = useState(false);
  const [fetchingScreenshot, setFetchingScreenshot] = useState(false);
  const [uploadingProjImage, setUploadingProjImage] = useState(false);

  // Skill Editor States
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', proficiency: 80 });
  const [skillSubmitting, setSkillSubmitting] = useState(false);

  // Education Editor States
  const [selectedEducation, setSelectedEducation] = useState<Partial<Education> | null>(null);
  const [educationEditorAction, setEducationEditorAction] = useState<'idle' | 'create' | 'edit'>('idle');
  const [eduSubmitting, setEduSubmitting] = useState(false);

  // Certification Editor States
  const [selectedCert, setSelectedCert] = useState<Partial<Certification> | null>(null);
  const [certEditorAction, setCertEditorAction] = useState<'idle' | 'create' | 'edit'>('idle');
  const [certSubmitting, setCertSubmitting] = useState(false);

  // Experience Editor States
  const [selectedExperience, setSelectedExperience] = useState<Partial<Experience> | null>(null);
  const [experienceEditorAction, setExperienceEditorAction] = useState<'idle' | 'create' | 'edit'>('idle');
  const [expSubmitting, setExpSubmitting] = useState(false);

  // Extra-Curricular Editor States
  const [selectedExtraCurricular, setSelectedExtraCurricular] = useState<Partial<ExtraCurricular> | null>(null);
  const [extraCurricularEditorAction, setExtraCurricularEditorAction] = useState<'idle' | 'create' | 'edit'>('idle');
  const [extraCurricularSubmitting, setExtraCurricularSubmitting] = useState(false);

  // Profile Editor States
  const [profileForm, setProfileForm] = useState<Partial<Profile>>({});
  const [profileSubmitting, setProfileSubmitting] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarSuccess, setAvatarSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileForm(profile);
    }
  }, [profile]);

  // Load backend stats
  const fetchDashboardStats = async (adminToken: string) => {
    setLoadingStats(true);
    try {
      const resp = await fetch('/api/analytics/dashboard', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (resp.ok) {
        const data = await resp.json();
        setStats(data);
      } else {
        await checkAuthResponse(resp);
      }
    } catch (e) {
      console.error('Failed to load dashboard statistics', e);
    } finally {
      setLoadingStats(false);
    }
  };

  // Load Contact submissions
  const fetchContactMessages = async (adminToken: string) => {
    setLoadingMessages(true);
    try {
      const resp = await fetch('/api/contact', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (resp.ok) {
        const data = await resp.json();
        setMessages(data);
      } else {
        await checkAuthResponse(resp);
      }
    } catch (e) {
      console.error('Failed to pull messages queue.', e);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardStats(token);
      fetchContactMessages(token);
    }
  }, [token]);

  // LOGIN REQUEST
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoadingLogin(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error || 'Login authorization failed.');
      }

      localStorage.setItem('admin_token', resJson.token);
      setToken(resJson.token);
    } catch (err: any) {
      setLoginError(err.message || 'Incorrect password.');
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    onClose();
  };

  // DELETE MESSAGE
  const handleDeleteMessage = async (msgId: string) => {
    if (!token) return;
    if (!confirm('Are you confident you want to delete this contact message?')) return;

    try {
      const resp = await fetch(`/api/contact/${msgId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        setMessages(prev => prev.filter(m => m._id !== msgId));
        // Refresh counter
        fetchDashboardStats(token);
      } else {
        const errObj = await resp.json().catch(() => ({}));
        alert(errObj.error || `Failed to delete message (HTTP ${resp.status})`);
      }
    } catch (e: any) {
      alert(`Network error deleting message: ${e.message}`);
    }
  };

  // ADD PROJECT
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedProject) return;
    setProjSubmitting(true);

    try {
      const isEdit = projectEditorAction === 'edit';
      const url = isEdit ? `/api/projects/${selectedProject._id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedProject)
      });

      if (response.ok) {
        setProjectEditorAction('idle');
        setSelectedProject(null);
        fetchDashboardStats(token);
        onRefreshAllData(); // reload on landing
      } else {
        const isAuthOk = await checkAuthResponse(response);
        if (isAuthOk) {
          const errorData = await response.json();
          alert(errorData.error || 'Project save action failed.');
        }
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProjSubmitting(false);
    }
  };

  const handleAutoFetchScreenshot = async () => {
    const liveDemoLink = selectedProject?.liveDemoLink;
    if (!liveDemoLink || !liveDemoLink.startsWith('http')) {
      alert('Please enter a valid live demo URL starting with http:// or https:// first.');
      return;
    }
    setFetchingScreenshot(true);
    try {
      const targetUrl = encodeURIComponent(liveDemoLink);
      const resp = await fetch(`https://api.microlink.io/?url=${targetUrl}&screenshot=true`);
      if (!resp.ok) {
        throw new Error('Failed to capture website screenshot');
      }
      const resData = await resp.json();
      if (resData.status === 'success' && resData.data.screenshot?.url) {
        const screenshotUrl = resData.data.screenshot.url;
        setSelectedProject(prev => prev ? { ...prev, projectImage: screenshotUrl } : null);
      } else {
        throw new Error('No screenshot URL found in response');
      }
    } catch (err: any) {
      alert(`Could not fetch screenshot: ${err.message || 'Make sure the website is public.'}`);
    } finally {
      setFetchingScreenshot(false);
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploadingProjImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/projects/upload-image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        const resData = await response.json();
        setSelectedProject(prev => prev ? { ...prev, projectImage: resData.imageUrl } : null);
      } else {
        const errObj = await response.json().catch(() => ({}));
        const isAuthOk = await checkAuthResponse(response);
        if (isAuthOk) {
          alert(errObj.error || 'Failed to upload project image.');
        }
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred uploading image.');
    } finally {
      setUploadingProjImage(false);
    }
  };

  // DELETE PROJECT
  const handleDeleteProject = async (pId: string) => {
    if (!token) return;
    if (!confirm('Are you absolute you want to delete this project mapping?')) return;

    try {
      const resp = await fetch(`/api/projects/${pId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const isAuthOk = await checkAuthResponse(resp);
        if (isAuthOk) {
          const errObj = await resp.json().catch(() => ({}));
          alert(errObj.error || `Failed to delete project (HTTP ${resp.status})`);
        }
      }
    } catch (e: any) {
      alert(`Network error deleting project: ${e.message}`);
    }
  };

  const handleHighlightProject = async (pId: string) => {
    if (!token) return;

    try {
      const resp = await fetch(`/api/projects/${pId}/highlight`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const isAuthOk = await checkAuthResponse(resp);
        if (isAuthOk) {
          const errObj = await resp.json().catch(() => ({}));
          alert(errObj.error || `Failed to highlight project (HTTP ${resp.status})`);
        }
      }
    } catch (e: any) {
      alert(`Network error highlighting project: ${e.message}`);
    }
  };

  // ADD SKILL
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSkillSubmitting(true);

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSkill)
      });

      if (response.ok) {
        setNewSkill({ name: '', category: 'Frontend', proficiency: 80 });
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const isAuthOk = await checkAuthResponse(response);
        if (isAuthOk) {
          const errObj = await response.json().catch(() => ({}));
          alert(errObj.error || 'Failed to add skill.');
        }
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setSkillSubmitting(false);
    }
  };

  // DELETE SKILL
  const handleDeleteSkill = async (sId: string) => {
    if (!token) return;
    try {
      const resp = await fetch(`/api/skills/${sId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const isAuthOk = await checkAuthResponse(resp);
        if (isAuthOk) {
          const errObj = await resp.json().catch(() => ({}));
          alert(errObj.error || `Failed to delete skill (HTTP ${resp.status})`);
        }
      }
    } catch (e: any) {
      alert(`Network error deleting skill: ${e.message}`);
    }
  };

  // ADD or UPDATE EDUCATION
  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedEducation) return;
    setEduSubmitting(true);

    try {
      const isEdit = educationEditorAction === 'edit';
      const url = isEdit ? `/api/education/${selectedEducation._id}` : '/api/education';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedEducation)
      });

      if (response.ok) {
        setEducationEditorAction('idle');
        setSelectedEducation(null);
        fetchDashboardStats(token);
        onRefreshAllData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Education save action failed.');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setEduSubmitting(false);
    }
  };

  // DELETE EDUCATION
  const handleDeleteEducation = async (eId: string) => {
    if (!token) return;
    if (!confirm('Are you absolute you want to delete this education entry?')) return;

    try {
      const resp = await fetch(`/api/education/${eId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const errObj = await resp.json().catch(() => ({}));
        alert(errObj.error || `Failed to delete education (HTTP ${resp.status})`);
      }
    } catch (e: any) {
      alert(`Network error deleting education: ${e.message}`);
    }
  };

  // ADD or UPDATE CERTIFICATION
  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedCert) return;
    setCertSubmitting(true);

    try {
      const isEdit = certEditorAction === 'edit';
      const url = isEdit ? `/api/certifications/${selectedCert._id}` : '/api/certifications';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedCert)
      });

      if (response.ok) {
        setCertEditorAction('idle');
        setSelectedCert(null);
        fetchDashboardStats(token);
        onRefreshAllData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Certification save action failed.');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCertSubmitting(false);
    }
  };

  // DELETE CERTIFICATION
  const handleDeleteCert = async (cId: string) => {
    if (!token) return;
    if (!confirm('Are you absolute you want to delete this certificate?')) return;

    try {
      const resp = await fetch(`/api/certifications/${cId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const errObj = await resp.json().catch(() => ({}));
        alert(errObj.error || `Failed to delete certification (HTTP ${resp.status})`);
      }
    } catch (e: any) {
      alert(`Network error deleting certification: ${e.message}`);
    }
  };

  // RESUME MULTER UPLOAD
  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !uploadFile) return;

    setUploading(true);
    setUploadSuccess(false);
    setUploadError('');

    const formData = new FormData();
    formData.append('resume', uploadFile);

    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const resJson = await response.json();
      if (response.ok) {
        setUploadSuccess(true);
        setUploadFile(null);
      } else {
        throw new Error(resJson.error || 'Failed to complete PDF upload.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error occurred.');
    } finally {
      setUploading(false);
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedExperience) return;
    setExpSubmitting(true);

    try {
      const isEdit = experienceEditorAction === 'edit';
      const url = isEdit ? `/api/experience/${selectedExperience._id}` : '/api/experience';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedExperience)
      });

      if (response.ok) {
        setExperienceEditorAction('idle');
        setSelectedExperience(null);
        fetchDashboardStats(token);
        onRefreshAllData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Experience save action failed.');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setExpSubmitting(false);
    }
  };

  const handleDeleteExperience = async (expId: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this experience entry?')) return;

    try {
      const resp = await fetch(`/api/experience/${expId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const errObj = await resp.json().catch(() => ({}));
        alert(errObj.error || `Failed to delete experience (HTTP ${resp.status})`);
      }
    } catch (e: any) {
      alert(`Network error deleting experience: ${e.message}`);
    }
  };

  const handleExtraCurricularSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedExtraCurricular) return;
    setExtraCurricularSubmitting(true);

    try {
      const isEdit = extraCurricularEditorAction === 'edit';
      const url = isEdit ? `/api/extracurricular/${selectedExtraCurricular._id}` : '/api/extracurricular';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedExtraCurricular)
      });

      if (response.ok) {
        setExtraCurricularEditorAction('idle');
        setSelectedExtraCurricular(null);
        fetchDashboardStats(token);
        onRefreshAllData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Extra-Curricular save action failed.');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setExtraCurricularSubmitting(false);
    }
  };

  const handleDeleteExtraCurricular = async (extraId: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this extra-curricular entry?')) return;

    try {
      const resp = await fetch(`/api/extracurricular/${extraId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resp.ok) {
        onRefreshAllData();
        fetchDashboardStats(token);
      } else {
        const errObj = await resp.json().catch(() => ({}));
        alert(errObj.error || `Failed to delete extra-curricular (HTTP ${resp.status})`);
      }
    } catch (e: any) {
      alert(`Network error deleting extra-curricular: ${e.message}`);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setProfileSubmitting(true);
    setProfileSuccess(false);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      if (response.ok) {
        setProfileSuccess(true);
        onRefreshAllData();
        setTimeout(() => setProfileSuccess(false), 3000);
      } else {
        const isAuthOk = await checkAuthResponse(response);
        if (isAuthOk) {
          const err = await response.json();
          alert(err.error || 'Failed to save profile details.');
        }
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProfileSubmitting(false);
    }
  };

  const handleAvatarUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !avatarFile) return;
    setAvatarUploading(true);
    setAvatarSuccess(false);

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const response = await fetch('/api/profile/photo', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setAvatarSuccess(true);
        setAvatarFile(null);
        const resData = await response.json();
        setProfileForm(prev => ({ ...prev, avatarUrl: resData.avatarUrl }));
        onRefreshAllData();
        setTimeout(() => setAvatarSuccess(false), 3000);
      } else {
        const resJson = await response.json();
        alert(resJson.error || 'Failed to upload avatar.');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred.');
    } finally {
      setAvatarUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* TOP PANEL */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span className="font-display font-extrabold text-white tracking-tight">Admin System Engine</span>
            {token && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold font-mono">
                SECURE CONSOLE ACTIVE
              </span>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="p-1 px-3 text-xs bg-slate-800 hover:bg-slate-755 text-slate-300 rounded border border-slate-700 transition"
          >
            Collapse [Esc]
          </button>
        </div>

        {/* SECURE BLOCK CHECK */}
        {!token ? (
          /* LOGIN PANEL FORM SCREEN */
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0c0f1d] overflow-y-auto">
            <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 text-left relative shadow-xl">
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-10 blur-lg pointer-events-none" />
              
              <div className="text-center space-y-2 relative">
                <div className="w-12 h-12 bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-extrabold text-white">Administrative Portal</h3>
                <p className="text-xs text-slate-400 font-sans">
                  Secure gate verifying JWT tokens and encrypted logins to access operational metrics.
                </p>
              </div>



              <form onSubmit={handleLoginSubmit} className="space-y-4 relative">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase">User Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase">Credentials Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
                    required
                  />
                </div>

                {loginError && (
                  <div className="flex items-start gap-1.5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loadingLogin}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider transition hover:opacity-95 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  {loadingLogin ? 'Authorizing Console...' : 'Log In Admin'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* FULL PANEL CONSOLE - VISITOR TRACKERS & RESOURCE MANAGEMENT */
          <div className="flex-1 flex overflow-hidden">
            {/* LEFT SIDE TAB PANEL */}
            <div className="w-48 sm:w-64 bg-slate-950 border-r border-slate-850 flex flex-col justify-between p-3.5" id="admin_navigation">
              <div className="space-y-1.5 text-left">
                <span className="block px-3 text-[10px] font-bold text-slate-500 font-mono tracking-wider uppercase mb-3">Management Options</span>
                
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'overview' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Console Metrics
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'messages' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Client Inbox
                  {messages.length > 0 && (
                    <span className="ml-auto bg-cyan-400 text-slate-950 font-sans font-extrabold text-[10px] px-1.5 py-0.5 rounded">
                      {messages.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'projects' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Manage Projects
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'skills' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Manage Skills
                </button>

                <button
                  onClick={() => setActiveTab('education')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'education' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Manage Education
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'experience' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Manage Experience
                </button>

                <button
                  onClick={() => setActiveTab('extracurricular')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'extracurricular' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  Manage Extra-Curricular
                </button>

                <button
                  onClick={() => setActiveTab('certifications')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'certifications' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  Manage Certifications
                </button>

                <button
                  onClick={() => setActiveTab('resume')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'resume' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Replace PDF Resume
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full max-w-full text-nowrap truncate px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left ${
                    activeTab === 'profile' ? 'bg-indigo-600/20 text-cyan-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Manage Profile
                </button>
              </div>

              {/* LOGOUT SECURE ACTION */}
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 flex items-center gap-2.5 transition text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout console
              </button>
            </div>

            {/* TAB CONTENTS (Scroll container) */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#0a0d17] text-left">
              
              {/* TAB 1: OVERVIEW & TRAFFICS */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in" id="tab_overview_content">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Telemetry & Operational Metrics</h3>
                    <button 
                      onClick={() => fetchDashboardStats(token)} 
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      Refresh statistics
                    </button>
                  </div>

                  {/* Operational counts widgets */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="block text-2xl font-bold text-cyan-400 font-mono">
                        {stats ? stats.totalVisitors : '...'}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Total Visitors</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="block text-2xl font-bold text-indigo-400 font-mono">
                        {stats ? stats.totalContactMessages : '...'}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Form Messages</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="block text-2xl font-bold text-purple-400 font-mono">
                        {stats ? stats.totalProjects : '...'}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Projects Loaded</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="block text-2xl font-bold text-emerald-400 font-mono">
                        {stats ? stats.totalSkills : '...'}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Skills Registered</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="block text-2xl font-bold text-pink-400 font-mono">
                        {stats ? stats.totalEducation : '...'}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Education Milestones</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="block text-2xl font-bold text-teal-400 font-mono">
                        {stats ? stats.totalExtraCurricular : '...'}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Extra-Curriculars</span>
                    </div>
                  </div>

                  {/* VISITOR LOG TABLE */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800/80 overflow-hidden">
                    <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Visitor Session Logs (Last 30 Visits)</p>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                        LIVE ANALYTICS ACTIVE
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-nowrap text-xs text-slate-300">
                        <thead className="bg-slate-950/50 text-slate-500 font-mono uppercase font-bold border-b border-slate-850">
                          <tr>
                            <th className="px-5 py-3 text-left">Visitor Index</th>
                            <th className="px-5 py-3 text-left">Device OS</th>
                            <th className="px-5 py-3 text-left">Browser</th>
                            <th className="px-5 py-3 text-left">Region Country</th>
                            <th className="px-5 py-3 text-right">Registered Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850">
                          {stats && stats.visitorLogs && stats.visitorLogs.length > 0 ? (
                            stats.visitorLogs.map((log, listId) => (
                              <tr key={log._id || listId} className="hover:bg-slate-850/20">
                                <td className="px-5 py-3 font-mono text-slate-500">#{listId + 1}</td>
                                <td className="px-5 py-3 font-medium text-slate-200">{log.device}</td>
                                <td className="px-5 py-3 text-slate-400">{log.browser}</td>
                                <td className="px-5 py-3 text-cyan-400 font-semibold">{log.country}</td>
                                <td className="px-5 py-3 text-right text-slate-500 font-mono">
                                  {new Date(log.visitTime).toLocaleString()}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="px-5 py-8 text-center text-slate-500 italic">No visits registered on current database engine yet. Try inspecting from another browser tab!</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: INBOX MESSAGE LOGS */}
              {activeTab === 'messages' && (
                <div className="space-y-6 animate-fade-in" id="tab_messages_content">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Client Conversations Queue</h3>
                    <span className="text-xs text-slate-500">
                      Matches communications fetched from the database pipeline.
                    </span>
                  </div>

                  <div className="space-y-4" id="admin_messages_inbox_list">
                    {loadingMessages ? (
                      <p className="text-slate-500 italic">Loading conversation data...</p>
                    ) : messages.length > 0 ? (
                      messages.map((msg) => (
                        <div key={msg._id} className="p-5.5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 relative">
                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-550 hover:text-white text-rose-400 transition"
                            title="Delete submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="text-xs sm:text-sm text-left space-y-1">
                            <p className="text-slate-500 font-mono">From: <span className="text-white font-sans font-bold">{msg.name}</span> &lt;{msg.email}&gt;</p>
                            <p className="text-slate-500 font-mono">Subject: <span className="text-slate-300 font-sans font-medium">{msg.subject}</span></p>
                          </div>

                          <div className="p-4 rounded-lg bg-slate-950 border border-slate-850 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pre-line">
                            {msg.message}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 rounded-xl bg-slate-900/50 border border-slate-800 border-dashed text-center text-slate-500">
                        No contact messages registered yet. Messages created via the Contact form will stream here instantly!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: PROJECT CREATION/DELETER */}
              {activeTab === 'projects' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Project Registries Console</h3>
                    {projectEditorAction === 'idle' && (
                      <button
                        onClick={() => {
                          setSelectedProject({ title: '', description: '', techStack: [], features: [], githubLink: '', liveDemoLink: '', projectImage: '', featured: false });
                          setProjectEditorAction('create');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Create Project
                      </button>
                    )}
                  </div>

                  {projectEditorAction !== 'idle' && selectedProject ? (
                    /* PROJECT FORM EDITOR */
                    <form onSubmit={handleProjectSubmit} className="p-6 rounded-xl bg-slate-900 border border-slate-850 space-y-4">
                      <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold">
                        {projectEditorAction === 'create' ? 'Registering New Showcase' : `Adjusting: ${selectedProject.title}`}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Project Title *</label>
                          <input
                            type="text"
                            value={selectedProject.title || ''}
                            onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. Smart Queue Manager"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Image Banner Link / Source</label>
                          <input
                            type="text"
                            value={selectedProject.projectImage || ''}
                            onChange={(e) => setSelectedProject({ ...selectedProject, projectImage: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="Unsplash picture URL or uploaded path"
                          />
                          <div className="flex flex-wrap gap-2 pt-0.5">
                            <button
                              type="button"
                              onClick={handleAutoFetchScreenshot}
                              disabled={fetchingScreenshot}
                              className="px-2.5 py-1.5 rounded bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 text-[10px] font-bold uppercase transition disabled:opacity-50 cursor-pointer"
                            >
                              {fetchingScreenshot ? 'Fetching Screenshot...' : 'Auto-Fetch from Demo Link'}
                            </button>
                            <label className="px-2.5 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:text-cyan-300 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5" />
                              {uploadingProjImage ? 'Uploading...' : 'Upload Image File'}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleProjectImageUpload}
                                className="hidden"
                                disabled={uploadingProjImage}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Short Overview Description *</label>
                        <textarea
                          rows={3}
                          value={selectedProject.description || ''}
                          onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                          placeholder="Provide a functional summary or focus zone..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Tech Stack (comma separated) *</label>
                          <input
                            type="text"
                            value={selectedProject.techStack?.join(', ') || ''}
                            onChange={(e) => setSelectedProject({ ...selectedProject, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. React, Node.js, MongoDB"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Features Bullets (comma separated) *</label>
                          <input
                            type="text"
                            value={selectedProject.features?.join(', ') || ''}
                            onChange={(e) => setSelectedProject({ ...selectedProject, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. Adaptive state changes, real-time syncs"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Source GitHub Link</label>
                          <input
                            type="text"
                            value={selectedProject.githubLink || ''}
                            onChange={(e) => setSelectedProject({ ...selectedProject, githubLink: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="https://github.com/..."
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Production Demo Link</label>
                          <input
                            type="text"
                            value={selectedProject.liveDemoLink || ''}
                            onChange={(e) => setSelectedProject({ ...selectedProject, liveDemoLink: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 py-2">
                        <input
                          type="checkbox"
                          id="form_proj_featured"
                          checked={selectedProject.featured || false}
                          onChange={(e) => setSelectedProject({ ...selectedProject, featured: e.target.checked })}
                          className="w-4 h-4 text-cyan-500 rounded bg-slate-950 border-slate-800 focus:outline-none focus:ring-0 focus:ring-offset-0"
                        />
                        <label htmlFor="form_proj_featured" className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Highlight as Flagship Featured project</label>
                      </div>

                      <div className="pt-2 flex gap-4">
                        <button
                          type="submit"
                          disabled={projSubmitting}
                          className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase"
                        >
                          {projSubmitting ? 'Saving...' : 'Save Registry'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setProjectEditorAction('idle'); setSelectedProject(null); }}
                          className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-bold uppercase"
                        >
                          Bypass
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* LIST CURRENT PROJECTS WITH EDITOR TRIGGERS */
                    <div className="grid grid-cols-1 gap-4" id="manage_projects_list">
                      {allProjects.map((proj) => (
                        <div key={proj._id} className="p-4 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-between text-left">
                          <div>
                            <p className="font-display font-extrabold text-white">{proj.title}</p>
                            <p className="text-xs text-slate-500 truncate max-w-lg mt-1 font-sans">{proj.description}</p>
                          </div>
                          
                          <div className="flex space-x-3.5 ml-4 shrink-0">
                            <button
                              onClick={() => handleHighlightProject(proj._id)}
                              className={`p-1 px-2.5 text-xs font-bold rounded flex items-center gap-1 transition ${
                                proj.featured
                                  ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                                  : 'bg-slate-850 hover:bg-slate-750 text-slate-400 hover:text-slate-200'
                              }`}
                              title={proj.featured ? 'Flagship Showcase Project' : 'Highlight as Flagship Project'}
                            >
                              <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-current' : ''}`} />
                              {proj.featured ? 'Flagship' : 'Showcase'}
                            </button>
                            <button
                              onClick={() => { setSelectedProject(proj); setProjectEditorAction('edit'); }}
                              className="p-1 px-2.5 text-xs bg-slate-850 hover:bg-slate-750 text-cyan-400 font-bold rounded flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj._id)}
                              className="p-1 px-2.5 text-xs bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 font-bold rounded flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: SKILL INJECTION & METER ADJUSTER */}
              {activeTab === 'skills' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-display font-extrabold text-white">Skills Matrix Adjuster</h3>

                  {/* Add skill fast mini-form */}
                  <form onSubmit={handleSkillSubmit} className="p-5 rounded-xl bg-slate-900 border border-slate-850 flex flex-wrap items-end gap-4 text-left">
                    <div className="flex-1 min-w-[200px] space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Skill Name</label>
                      <input
                        type="text"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                        placeholder="e.g. TypeScript"
                        required
                      />
                    </div>

                    <div className="space-y-1 shrink-0 w-44">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Category</label>
                      <select
                        value={newSkill.category}
                        onChange={(e: any) => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none"
                      >
                        <option value="Programming Languages">Programming Languages</option>
                        <option value="Frontend">Frontend Code</option>
                        <option value="Backend">Backend Orchestration</option>
                        <option value="Database">Database Structures</option>
                        <option value="Tools & Platforms">Tools & Platforms</option>
                        <option value="Currently Learning">Exploring</option>
                      </select>
                    </div>

                    <div className="w-24 space-y-1 shrink-0">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Pro %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newSkill.proficiency}
                        onChange={(e) => setNewSkill({ ...newSkill, proficiency: Number(e.target.value) || 80 })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={skillSubmitting}
                      className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Inject Skill
                    </button>
                  </form>

                  {/* List registered skills categorized */}
                  <div className="space-y-4" id="manage_skills_list">
                    {allSkills.map((sk) => (
                      <div key={sk._id} className="p-3 px-4.5 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-between text-xs text-left text-slate-350">
                        <div>
                          <span className="font-bold text-white text-sm">{sk.name}</span>
                          <span className="ml-3 px-2 py-0.5 rounded bg-slate-950 text-slate-500">{sk.category}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-mono text-cyan-400 text-sm font-semibold">{sk.proficiency}%</span>
                          <button
                            onClick={() => handleDeleteSkill(sk._id)}
                            className="p-1 rounded bg-rose-500/10 hover:bg-rose-550 hover:text-white text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 5 EDUCATION MANAGEMENT GRAPH */}
              {activeTab === 'education' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Education Milestones Console</h3>
                    {educationEditorAction === 'idle' && (
                      <button
                        onClick={() => {
                          setSelectedEducation({ degree: '', collegeName: '', university: '', duration: '', cgpaOrPercentage: '' });
                          setEducationEditorAction('create');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Create Entry
                      </button>
                    )}
                  </div>

                  {educationEditorAction !== 'idle' && selectedEducation ? (
                    /* EDUCATION FORM EDITOR */
                    <form onSubmit={handleEducationSubmit} className="p-6 rounded-xl bg-slate-900 border border-slate-850 space-y-4">
                      <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold">
                        {educationEditorAction === 'create' ? 'Registering New Education Entry' : `Adjusting Entry: ${selectedEducation.degree}`}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Degree Name (e.g. B.E. in Computer Science) *</label>
                          <input
                            type="text"
                            value={selectedEducation.degree || ''}
                            onChange={(e) => setSelectedEducation({ ...selectedEducation, degree: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. Bachelor of Engineering in AI & Data Science"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">College Name *</label>
                          <input
                            type="text"
                            value={selectedEducation.collegeName || ''}
                            onChange={(e) => setSelectedEducation({ ...selectedEducation, collegeName: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. College of Engineering, Pune"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">University / Board *</label>
                          <input
                            type="text"
                            value={selectedEducation.university || ''}
                            onChange={(e) => setSelectedEducation({ ...selectedEducation, university: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. SPPU"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Duration / Year span *</label>
                          <input
                            type="text"
                            value={selectedEducation.duration || ''}
                            onChange={(e) => setSelectedEducation({ ...selectedEducation, duration: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. 2022 - 2026"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">CGPA / Percentage *</label>
                        <input
                          type="text"
                          value={selectedEducation.cgpaOrPercentage || ''}
                          onChange={(e) => setSelectedEducation({ ...selectedEducation, cgpaOrPercentage: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                          placeholder="e.g. 9.12 CGPA or 88%"
                          required
                        />
                      </div>

                      <div className="pt-2 flex gap-4">
                        <button
                          type="submit"
                          disabled={eduSubmitting}
                          className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase"
                        >
                          {eduSubmitting ? 'Saving...' : 'Save Registry'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setEducationEditorAction('idle'); setSelectedEducation(null); }}
                          className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-bold uppercase"
                        >
                          Bypass
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* LIST CURRENT EDUCATION ENTRIES WITH EDITOR TRIGGERS */
                    <div className="grid grid-cols-1 gap-4" id="manage_education_list">
                      {allEducations.map((edu) => (
                        <div key={edu._id} className="p-4 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-between text-left">
                          <div>
                            <p className="font-display font-extrabold text-white">{edu.degree}</p>
                            <p className="text-xs text-slate-400 mt-1 font-sans">{edu.collegeName} ({edu.university})</p>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{edu.duration} | Grade: {edu.cgpaOrPercentage}</p>
                          </div>

                          <div className="flex space-x-3.5 ml-4 shrink-0">
                            <button
                              onClick={() => { setSelectedEducation(edu); setEducationEditorAction('edit'); }}
                              className="p-1 px-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEducation(edu._id)}
                              className="p-1 px-2.5 text-xs bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 font-bold rounded flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {allEducations.length === 0 && (
                        <p className="text-xs text-slate-500 italic py-4">No education milestones registered yet.</p>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 5.5: EXPERIENCE MANAGEMENT */}
              {activeTab === 'experience' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Experience Timeline Console</h3>
                    {experienceEditorAction === 'idle' && (
                      <button
                        onClick={() => {
                          setSelectedExperience({ position: '', company: '', duration: '', description: '', achievements: [], type: 'Internship' });
                          setExperienceEditorAction('create');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Create Entry
                      </button>
                    )}
                  </div>

                  {experienceEditorAction !== 'idle' && selectedExperience ? (
                    /* EXPERIENCE FORM EDITOR */
                    <form onSubmit={handleExperienceSubmit} className="p-6 rounded-xl bg-slate-900 border border-slate-850 space-y-4">
                      <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold">
                        {experienceEditorAction === 'create' ? 'Registering New Experience Entry' : `Adjusting Entry: ${selectedExperience.position}`}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Job Position Title *</label>
                          <input
                            type="text"
                            value={selectedExperience.position || ''}
                            onChange={(e) => setSelectedExperience({ ...selectedExperience, position: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. Full Stack Developer Intern"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Company / Organization Name *</label>
                          <input
                            type="text"
                            value={selectedExperience.company || ''}
                            onChange={(e) => setSelectedExperience({ ...selectedExperience, company: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. RightShift Infotech"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Duration / Period *</label>
                          <input
                            type="text"
                            value={selectedExperience.duration || ''}
                            onChange={(e) => setSelectedExperience({ ...selectedExperience, duration: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. Jan 2025 - Feb 2025"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Role Type *</label>
                          <select
                            value={selectedExperience.type || 'Internship'}
                            onChange={(e) => setSelectedExperience({ ...selectedExperience, type: e.target.value as any })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm focus:outline-none"
                          >
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Personal">Personal Project</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Extra-Curricular">Extra-Curricular</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">General Description Summary *</label>
                        <textarea
                          value={selectedExperience.description || ''}
                          onChange={(e) => setSelectedExperience({ ...selectedExperience, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm resize-none"
                          placeholder="Briefly describe your duties and team coordination"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Key Achievements (One per line) *</label>
                        <textarea
                          value={selectedExperience.achievements ? selectedExperience.achievements.join('\n') : ''}
                          onChange={(e) => setSelectedExperience({ ...selectedExperience, achievements: e.target.value.split('\n').filter(line => line.trim().length > 0) })}
                          rows={4}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm resize-none"
                          placeholder="Developed response layout using React&#10;Collaborated with team leads to ship features"
                          required
                        />
                      </div>

                      <div className="pt-2 flex gap-4">
                        <button
                          type="submit"
                          disabled={expSubmitting}
                          className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-955 font-bold text-xs uppercase"
                        >
                          {expSubmitting ? 'Saving...' : 'Save Entry'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setExperienceEditorAction('idle'); setSelectedExperience(null); }}
                          className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-755 text-slate-300 border border-slate-700 text-xs font-bold uppercase"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* LIST CURRENT EXPERIENCE ENTRIES WITH EDITOR TRIGGERS */
                    <div className="grid grid-cols-1 gap-4" id="manage_experience_list">
                      {allExperiences.map((exp) => (
                        <div key={exp._id} className="p-4 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-between text-left">
                          <div>
                            <p className="font-display font-extrabold text-white">{exp.position}</p>
                            <p className="text-xs text-slate-400 mt-1 font-sans">{exp.company} | <span className="text-cyan-400 font-semibold">{exp.type}</span></p>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{exp.duration}</p>
                          </div>

                          <div className="flex space-x-3.5 ml-4 shrink-0">
                            <button
                              onClick={() => { setSelectedExperience(exp); setExperienceEditorAction('edit'); }}
                              className="p-1 px-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteExperience(exp._id)}
                              className="p-1 px-2.5 text-xs bg-rose-500/10 hover:bg-rose-550 hover:text-white text-rose-400 font-bold rounded flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {allExperiences.length === 0 && (
                        <p className="text-xs text-slate-500 italic py-4">No experience entries registered yet.</p>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 5.8: EXTRA-CURRICULAR MANAGEMENT */}
              {activeTab === 'extracurricular' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Extra-Curricular timeline console</h3>
                    {extraCurricularEditorAction === 'idle' && (
                      <button
                        onClick={() => {
                          setSelectedExtraCurricular({ activity: '', organization: '', duration: '', description: '', achievements: [] });
                          setExtraCurricularEditorAction('create');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Create Entry
                      </button>
                    )}
                  </div>

                  {extraCurricularEditorAction !== 'idle' && selectedExtraCurricular ? (
                    /* EXTRA-CURRICULAR FORM EDITOR */
                    <form onSubmit={handleExtraCurricularSubmit} className="p-6 rounded-xl bg-slate-900 border border-slate-855 space-y-4">
                      <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold">
                        {extraCurricularEditorAction === 'create' ? 'Registering New Extra-Curricular Entry' : `Adjusting Entry: ${selectedExtraCurricular.activity}`}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Activity/Role Title *</label>
                          <input
                            type="text"
                            value={selectedExtraCurricular.activity || ''}
                            onChange={(e) => setSelectedExtraCurricular({ ...selectedExtraCurricular, activity: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. NSS Volunteer"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Organization Name *</label>
                          <input
                            type="text"
                            value={selectedExtraCurricular.organization || ''}
                            onChange={(e) => setSelectedExtraCurricular({ ...selectedExtraCurricular, organization: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. National Service Scheme (NSS)"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Duration / Period *</label>
                        <input
                          type="text"
                          value={selectedExtraCurricular.duration || ''}
                          onChange={(e) => setSelectedExtraCurricular({ ...selectedExtraCurricular, duration: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm"
                          placeholder="e.g. 2023 - 2025"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">General Description Summary *</label>
                        <textarea
                          value={selectedExtraCurricular.description || ''}
                          onChange={(e) => setSelectedExtraCurricular({ ...selectedExtraCurricular, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm resize-none"
                          placeholder="Briefly describe your duties and community engagement"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Key Details (One per line) *</label>
                        <textarea
                          value={selectedExtraCurricular.achievements ? selectedExtraCurricular.achievements.join('\n') : ''}
                          onChange={(e) => setSelectedExtraCurricular({ ...selectedExtraCurricular, achievements: e.target.value.split('\n').filter(line => line.trim().length > 0) })}
                          rows={4}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white placeholder-slate-700 text-sm resize-none"
                          placeholder="Organized community services&#10;Volunteered at local shelter programs"
                          required
                        />
                      </div>

                      <div className="pt-2 flex gap-4">
                        <button
                          type="submit"
                          disabled={extraCurricularSubmitting}
                          className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-955 font-bold text-xs uppercase"
                        >
                          {extraCurricularSubmitting ? 'Saving...' : 'Save Entry'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setExtraCurricularEditorAction('idle'); setSelectedExtraCurricular(null); }}
                          className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-755 text-slate-300 border border-slate-700 text-xs font-bold uppercase"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* LIST CURRENT EXTRA-CURRICULAR ENTRIES WITH EDITOR TRIGGERS */
                    <div className="grid grid-cols-1 gap-4" id="manage_extracurricular_list">
                      {allExtraCurriculars.map((extra) => (
                        <div key={extra._id} className="p-4 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-between text-left">
                          <div>
                            <p className="font-display font-extrabold text-white">{extra.activity}</p>
                            <p className="text-xs text-slate-400 mt-1 font-sans">{extra.organization}</p>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{extra.duration}</p>
                          </div>

                          <div className="flex space-x-3.5 ml-4 shrink-0">
                            <button
                              onClick={() => { setSelectedExtraCurricular(extra); setExtraCurricularEditorAction('edit'); }}
                              className="p-1 px-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteExtraCurricular(extra._id)}
                              className="p-1 px-2.5 text-xs bg-rose-500/10 hover:bg-rose-550 hover:text-white text-rose-400 font-bold rounded flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {allExtraCurriculars.length === 0 && (
                        <p className="text-xs text-slate-500 italic py-4">No extracurricular activities registered yet.</p>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 6: CERTIFICATION MANAGEMENT */}
              {activeTab === 'certifications' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Certifications Console</h3>
                    {certEditorAction === 'idle' && (
                      <button
                        onClick={() => {
                          setSelectedCert({ name: '', issuingOrganization: '', date: '', credentialLink: '' });
                          setCertEditorAction('create');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Create Entry
                      </button>
                    )}
                  </div>

                  {certEditorAction !== 'idle' && selectedCert ? (
                    /* CERTIFICATE FORM EDITOR */
                    <form onSubmit={handleCertSubmit} className="p-6 rounded-xl bg-slate-900 border border-slate-850 space-y-4">
                      <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold">
                        {certEditorAction === 'create' ? 'Registering New Certification' : `Adjusting Certification: ${selectedCert.name}`}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Certification Name *</label>
                          <input
                            type="text"
                            value={selectedCert.name || ''}
                            onChange={(e) => setSelectedCert({ ...selectedCert, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. AWS Certified Cloud Practitioner"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Issuing Organization *</label>
                          <input
                            type="text"
                            value={selectedCert.issuingOrganization || ''}
                            onChange={(e) => setSelectedCert({ ...selectedCert, issuingOrganization: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. Amazon Web Services (AWS)"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Issue Date *</label>
                          <input
                            type="text"
                            value={selectedCert.date || ''}
                            onChange={(e) => setSelectedCert({ ...selectedCert, date: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. Dec 2025"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Credential URL</label>
                          <input
                            type="text"
                            value={selectedCert.credentialLink || ''}
                            onChange={(e) => setSelectedCert({ ...selectedCert, credentialLink: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 text-sm"
                            placeholder="e.g. https://credly.com/..."
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex gap-4">
                        <button
                          type="submit"
                          disabled={certSubmitting}
                          className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase"
                        >
                          {certSubmitting ? 'Saving...' : 'Save Registry'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setCertEditorAction('idle'); setSelectedCert(null); }}
                          className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-bold uppercase"
                        >
                          Bypass
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* LIST CURRENT CERTIFICATES WITH EDITOR TRIGGERS */
                    <div className="grid grid-cols-1 gap-4" id="manage_certifications_list">
                      {allCertifications.map((cert) => (
                        <div key={cert._id} className="p-4 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-between text-left">
                          <div>
                            <p className="font-display font-extrabold text-white">{cert.name}</p>
                            <p className="text-xs text-slate-400 mt-1 font-sans">{cert.issuingOrganization}</p>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{cert.date}</p>
                          </div>

                          <div className="flex space-x-3.5 ml-4 shrink-0">
                            <button
                              onClick={() => { setSelectedCert(cert); setCertEditorAction('edit'); }}
                              className="p-1 px-2.5 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCert(cert._id)}
                              className="p-1 px-2.5 text-xs bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 font-bold rounded flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {allCertifications.length === 0 && (
                        <p className="text-xs text-slate-500 italic py-4">No certifications registered yet.</p>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 5: PDF RESUME UPLOADER */}
              {activeTab === 'resume' && (
                <div className="space-y-6 animate-fade-in" id="tab_resume_content">
                  <h3 className="text-xl font-display font-extrabold text-white">Replace Resume Documents</h3>
                  
                  <div className="p-6 rounded-xl bg-slate-900 border border-slate-850 space-y-6 text-left" id="resume_upload_panel">
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      Upload your compiled, single-paged PDF profile file here. The file will overwrite `/public/uploads/resume.pdf` and immediately power both direct downloads and full-window displays.
                    </p>

                    <form onSubmit={handleResumeUpload} className="space-y-4">
                      <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl p-8 text-center transition relative bg-slate-950/20" id="resume_drag_and_drop_card">
                        <input
                          type="file"
                          accept=".pdf"
                          id="file_uploader"
                          onChange={(e) => e.target.files && setUploadFile(e.target.files[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                          <Upload className="w-10 h-10 text-slate-500 mx-auto" />
                          <p className="text-sm font-bold text-white">
                            {uploadFile ? uploadFile.name : 'Choose or Drag PDF here'}
                          </p>
                          <p className="text-xs text-slate-500">Only PDF files under 10MB accepted.</p>
                        </div>
                      </div>

                      {uploadSuccess && (
                        <div className="p-3 text-xs rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5 justify-center">
                          <Check className="w-4 h-4" />
                          <span>PDF Resume written successfully! Stream checks initialized.</span>
                        </div>
                      )}

                      {uploadError && (
                        <div className="p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-1.5 justify-center">
                          <AlertTriangle className="w-4 h-4 text-nowrap" />
                          <span>{uploadError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={uploading || !uploadFile}
                        className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 text-xs font-bold tracking-wider uppercase cursor-pointer"
                      >
                        {uploading ? 'Writing PDF Stream...' : 'Commit Upload'}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 6: PROFILE MANAGER */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-fade-in" id="tab_profile_content">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-extrabold text-white">Manage Profile Details</h3>
                    <p className="text-xs text-slate-500">Edit your name, bio, social media profiles, and metrics.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT PANEL: General Profile and Avatar Upload */}
                    <div className="lg:col-span-4 space-y-6">
                      {/* Profile Photo Card */}
                      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Profile Photo</h4>
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-32 h-32 rounded-full border-2 border-indigo-500/20 overflow-hidden bg-slate-950 flex items-center justify-center relative">
                            {profileForm.avatarUrl ? (
                              <img src={profileForm.avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-3xl font-extrabold text-slate-600">No Image</span>
                            )}
                          </div>

                          <form onSubmit={handleAvatarUpload} className="w-full space-y-3">
                            <div className="relative border border-dashed border-slate-800 hover:border-indigo-500/30 rounded-lg p-4 text-center cursor-pointer bg-slate-950/20">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files && setAvatarFile(e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                              <p className="text-xs text-slate-400 font-semibold truncate">
                                {avatarFile ? avatarFile.name : 'Select Image File'}
                              </p>
                            </div>

                            {avatarSuccess && (
                              <p className="text-[10px] text-emerald-400 text-center">Photo updated successfully!</p>
                            )}

                            <button
                              type="submit"
                              disabled={avatarUploading || !avatarFile}
                              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold uppercase transition active:scale-95 cursor-pointer"
                            >
                              {avatarUploading ? 'Uploading...' : 'Upload Photo'}
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Info warning */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
                        <p className="font-bold text-cyan-400 flex items-center gap-1.5 font-mono uppercase">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          Design System Sync
                        </p>
                        <p>Changes saved here will immediately refresh the frontend components. Make sure to double check contact numbers and links before submitting.</p>
                      </div>
                    </div>

                    {/* RIGHT PANEL: Details Forms */}
                    <div className="lg:col-span-8">
                      <form onSubmit={handleProfileSubmit} className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6 text-left">
                        {/* SECTION 1: Personal Details */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-2">Personal Details</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Full Name *</label>
                              <input
                                type="text"
                                value={profileForm.name || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Professional Title *</label>
                              <input
                                type="text"
                                value={profileForm.title || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Location *</label>
                              <input
                                type="text"
                                value={profileForm.location || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Email Coordinates *</label>
                              <input
                                type="email"
                                value={profileForm.email || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Phone Coordinates *</label>
                              <input
                                type="text"
                                value={profileForm.phone || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">GitHub Link *</label>
                              <input
                                type="text"
                                value={profileForm.github || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">LinkedIn Link *</label>
                              <input
                                type="text"
                                value={profileForm.linkedin || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Instagram Link (Optional)</label>
                              <input
                                type="text"
                                value={profileForm.instagram || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* SECTION 2: About Me Section details */}
                        <div className="space-y-4 pt-4">
                          <h4 className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-2">Hero & About Me Section Details</h4>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Hero Bio Summary *</label>
                            <textarea
                              value={profileForm.bio || ''}
                              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                              rows={3}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm resize-none"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">About Header *</label>
                            <input
                              type="text"
                              value={profileForm.aboutHeading || ''}
                              onChange={(e) => setProfileForm({ ...profileForm, aboutHeading: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">About Paragraph 1 *</label>
                              <textarea
                                value={profileForm.aboutText1 || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutText1: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm resize-none"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">About Paragraph 2 *</label>
                              <textarea
                                value={profileForm.aboutText2 || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutText2: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm resize-none"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Metric: score (CGPA) *</label>
                              <input
                                type="text"
                                value={profileForm.metricCgpa || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, metricCgpa: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Metric: projects *</label>
                              <input
                                type="text"
                                value={profileForm.metricProjects || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, metricProjects: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide">Metric: year *</label>
                              <input
                                type="text"
                                value={profileForm.metricYear || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, metricYear: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* SECTION 3: Card Details */}
                        <div className="space-y-4 pt-4">
                          <h4 className="text-xs font-bold text-purple-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-2">About Section Side Cards</h4>
                          
                          {/* Card 1 */}
                          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                            <h5 className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">Card 1 Details</h5>
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={profileForm.aboutCard1Title || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutCard1Title: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                                placeholder="Card 1 Title"
                                required
                              />
                              <textarea
                                value={profileForm.aboutCard1Desc || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutCard1Desc: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                                placeholder="Card 1 Description"
                                required
                              />
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                            <h5 className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">Card 2 Details</h5>
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={profileForm.aboutCard2Title || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutCard2Title: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                                placeholder="Card 2 Title"
                                required
                              />
                              <textarea
                                value={profileForm.aboutCard2Desc || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutCard2Desc: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                                placeholder="Card 2 Description"
                                required
                              />
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                            <h5 className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">Card 3 Details</h5>
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={profileForm.aboutCard3Title || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutCard3Title: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                                placeholder="Card 3 Title"
                                required
                              />
                              <textarea
                                value={profileForm.aboutCard3Desc || ''}
                                onChange={(e) => setProfileForm({ ...profileForm, aboutCard3Desc: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                                placeholder="Card 3 Description"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {profileSuccess && (
                          <div className="p-3 text-xs rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center font-semibold">
                            Profile details saved successfully! Sync updates completed.
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={profileSubmitting}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-500 hover:to-indigo-650 text-slate-950 text-xs font-bold tracking-wider uppercase cursor-pointer"
                        >
                          {profileSubmitting ? 'Saving Details...' : 'Save Profile Details'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
