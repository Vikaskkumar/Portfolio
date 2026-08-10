import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-200 dark:border-slate-900 overflow-hidden text-left">
      {/* Glow effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-indigo-200/50 dark:border-indigo-500/20">
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Let's Collaborate
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Have an exciting project idea, a position to fill, or just want to say hello? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="gradient-border-card p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Email</h4>
                <a href="mailto:contact@vikas.dev" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">
                  contact@vikas.dev
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400">Response within 24 hours</p>
              </div>
            </div>

            <div className="gradient-border-card p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Location</h4>
                <p className="text-slate-700 dark:text-slate-200 font-medium">Bengaluru, Karnataka, India</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Open to hybrid/remote setups</p>
              </div>
            </div>

            <div className="gradient-border-card p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Phone</h4>
                <a href="tel:+919876543210" className="text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition font-medium">
                  +91 98765 43210
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mon - Fri, 9am - 6pm IST</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="gradient-border-card p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-500 dark:text-slate-400">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-950 border rounded-xl text-sm text-slate-900 dark:text-slate-200 outline-none transition focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 ${
                        errors.name ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-500 dark:text-slate-400">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-950 border rounded-xl text-sm text-slate-900 dark:text-slate-200 outline-none transition focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 ${
                        errors.email ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-500 dark:text-slate-400">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-950 border rounded-xl text-sm text-slate-900 dark:text-slate-200 outline-none transition focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 ${
                      errors.subject ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-500 dark:text-slate-400">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-950 border rounded-xl text-sm text-slate-900 dark:text-slate-200 outline-none transition focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 resize-none ${
                      errors.message ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="Describe your project idea in detail..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Feedback */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Thank you! Your message has been sent successfully. I will get back to you soon.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/15"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
