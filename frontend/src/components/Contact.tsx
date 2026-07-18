import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Profile } from '../types';

interface ContactProps {
  profile?: Profile | null;
}

export default function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out your name, email, and message.');
      setSubmitStatus('error');
      return;
    }

    setLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error || 'Failed to send message.');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const email = profile?.email || 'onkargaikwad8373@gmail.com';
  const phone = profile?.phone || '+91 83730 49231';
  const location = profile?.location || 'Pune, Maharashtra, India';
  const github = profile?.github || 'https://github.com/onkargaikwad';
  const linkedin = profile?.linkedin || 'https://linkedin.com/in/onkar-gaikwad';

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      {/* Visual background lights */}
      <span className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0f19] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="contact_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">08 / Contact</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            Let's Connect
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact_layout_grid">

          {/* LEFT SIDE: Contact info */}
          <div className="lg:col-span-5 space-y-8 text-left" id="contact_coords_info">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-extrabold heading-text">
                Get In Touch
              </h3>
              <p className="body-text text-sm sm:text-base leading-relaxed">
                Whether it's a job opportunity, a freelance project, or just want to say hi — I'd love to hear from you. Drop me a message and I'll get back to you as soon as I can.
              </p>
            </div>

            <div className="space-y-5" id="coords_list">
              {/* Mail */}
              <div className="flex items-center space-x-4 p-4 rounded-xl glass-card glass-card-hover">
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 border border-white/5">
                  <Mail className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-xs body-text font-mono uppercase tracking-wider">Email</p>
                  <a href={`mailto:${email}`} className="text-sm sm:text-base font-semibold heading-text hover:text-cyan-400 transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 rounded-xl glass-card glass-card-hover">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-white/5">
                  <Phone className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-xs body-text font-mono uppercase tracking-wider">Phone</p>
                  <span className="text-sm sm:text-base font-semibold heading-text">
                    {phone}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 p-4 rounded-xl glass-card glass-card-hover">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-white/5">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-xs body-text font-mono uppercase tracking-wider">Location</p>
                  <span className="text-sm sm:text-base font-semibold heading-text">
                    {location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social channels card */}
            <div className="p-5.5 rounded-2xl glass-card glass-card-hover space-y-3.5">
              <p className="text-xs font-bold uppercase tracking-wider font-mono body-text">Find Me Online</p>
              <div className="flex gap-4">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/30 body-text hover:text-cyan-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-950/40 border border-white/5 hover:border-indigo-500/30 body-text hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Contact form */}
          <div className="lg:col-span-7" id="contact_form_panel">
            <div className="p-6 sm:p-8 rounded-2xl glass-card text-left relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-5" id="interactive_form">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="form_name" className="text-xs font-semibold font-mono body-text uppercase tracking-wide">Your Name *</label>
                    <input
                      type="text"
                      id="form_name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 heading-text placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all focus:bg-slate-950/60"
                      placeholder="e.g. Jane Doe"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="form_email" className="text-xs font-semibold font-mono body-text uppercase tracking-wide">Email *</label>
                    <input
                      type="email"
                      id="form_email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 heading-text placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all focus:bg-slate-950/60"
                      placeholder="e.g. you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form_subject" className="text-xs font-semibold font-mono body-text uppercase tracking-wide">Subject (Optional)</label>
                  <input
                    type="text"
                    id="form_subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 heading-text placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all focus:bg-slate-950/60"
                    placeholder="e.g. Job Inquiry / Project Idea"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form_message" className="text-xs font-semibold font-mono body-text uppercase tracking-wide">Message *</label>
                  <textarea
                    id="form_message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 heading-text placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all resize-none focus:bg-slate-950/60"
                    placeholder="Tell me what's on your mind..."
                    required
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-white text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:opacity-95 shadow-md shadow-indigo-500/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    id="contact_submit_btn"
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {/* Status Alerts */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-2 text-sm"
                    id="contact_alert_success"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold">Message sent!</p>
                      <p className="text-xs mt-1 text-emerald-500/80">Thanks for reaching out. I'll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-2 text-sm"
                    id="contact_alert_error"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold">Couldn't send</p>
                      <p className="text-xs mt-1 text-rose-500/80">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
