import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { useSiteData } from '../hooks/useSiteData';

export default function Contact() {
  const { siteData } = useSiteData();
  const contactInfo = siteData.contact;
  const [formData, setFormData] = useState({ username: '', email: '', number: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.number.trim()) {
      tempErrors.number = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.number.trim())) {
      tempErrors.number = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAction = (e, method) => {
    e.preventDefault();
    if (!validate()) return;
    const { username, email, number, message } = formData;
    const formattedText = `Hi, I'm ${username}.\n\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(formattedText)}`, '_blank');
    } else if (method === 'email') {
      window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(`Portfolio Contact from ${username}`)}&body=${encodeURIComponent(formattedText)}`;
    }
    setSubmitStatus('success');
    setFormData({ username: '', email: '', number: '', message: '' });
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-[var(--c-surface-2)] border rounded-xl text-sm text-[var(--c-text)] placeholder:text-[var(--c-text-3)] outline-none transition focus:border-[var(--c-accent)] focus:ring-2 focus:ring-[var(--c-accent)]/20 ${
      errors[field] ? 'border-rose-500' : 'border-[var(--c-border)]'
    }`;

  const infoCards = [
    {
      icon: Mail,
      colorClass: 'text-blue-500',
      bgStyle: { background: 'rgba(59,130,246,0.1)' },
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      sub: 'Response within 24 hours',
    },
    {
      icon: MapPin,
      colorClass: 'text-purple-500',
      bgStyle: { background: 'rgba(168,85,247,0.1)' },
      label: 'Location',
      value: contactInfo.location,
      sub: 'Open to remote opportunities',
    },
    {
      icon: Phone,
      colorClass: 'text-emerald-500',
      bgStyle: { background: 'rgba(16,185,129,0.1)' },
      label: 'Phone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`,
      sub: 'Mon – Fri, 9am – 6pm IST',
    },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-24 border-t border-[var(--c-border)] overflow-hidden text-left">


      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[var(--c-surface-2)] text-[var(--c-accent)] font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-[var(--c-border)]">
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[var(--c-text)]">
            Let's Collaborate
          </h2>
          <p className="text-[var(--c-text-2)] text-sm sm:text-base">
            Have a project idea or a position to fill? Drop me a message and I'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {infoCards.map(({ icon: Icon, colorClass, bgStyle, label, value, href, sub }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-2xl hover:border-[var(--c-text-3)] transition-colors"
              >
                <div className="p-3 rounded-xl shrink-0" style={bgStyle}>
                  <Icon className={`w-5 h-5 ${colorClass}`} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-[var(--c-text-3)] uppercase tracking-widest">{label}</h4>
                  {href ? (
                    <a href={href} className={`text-[var(--c-text)] font-medium hover:${colorClass} transition text-sm`}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-[var(--c-text)] font-medium text-sm">{value}</p>
                  )}
                  <p className="text-xs text-[var(--c-text-3)]">{sub}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold rounded-2xl transition-all text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Connect directly on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--c-surface)] border border-[var(--c-border)] rounded-2xl p-8">
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="username" className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Name</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className={inputClass('username')} placeholder="John Doe" />
                    {errors.username && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.username}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass('email')} placeholder="john@example.com" />
                    {errors.email && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="number" className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Phone</label>
                  <input type="tel" id="number" name="number" value={formData.number} onChange={handleInputChange} className={inputClass('number')} placeholder="+91 9876543210" />
                  {errors.number && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.number}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[var(--c-text-2)] uppercase tracking-wider">Message</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} className={`${inputClass('message')} resize-none`} placeholder="Tell me about your project..." />
                  {errors.message && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                </div>

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Redirecting… Your message has been processed!
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <button
                    type="button"
                    onClick={(e) => handleAction(e, 'email')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[var(--c-accent)] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-orange-500/20"
                  >
                    <Mail className="w-4 h-4" />
                    Send via Email
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleAction(e, 'whatsapp')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
