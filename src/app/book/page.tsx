"use client";
import Link from "next/link";
import { useState } from "react";

export default function BookClass() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<"zoom" | "in_person">("zoom");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isValid = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) return false;
    const emailOk = /.+@.+\..+/.test(email);
    return emailOk;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    
    setIsSubmitting(true);
    
    try {
      const subject = encodeURIComponent(`New Booking Request: ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Mode: ${mode === "zoom" ? "Zoom (online)" : "In-Person"}\n\nDetails: ${message || "(none)"}`
      );
      
      // Open email client
      window.location.href = `mailto:adamissac08@gmail.com?subject=${subject}&body=${body}`;
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle" style={{top: '14%', left: '12%', animationDelay: '0s'}}></div>
        <div className="particle" style={{top: '28%', left: '82%', animationDelay: '2s'}}></div>
        <div className="particle" style={{top: '64%', left: '24%', animationDelay: '4s'}}></div>
        <div className="particle" style={{top: '82%', left: '72%', animationDelay: '6s'}}></div>
        <div className="particle" style={{top: '44%', left: '52%', animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/80 backdrop-blur-sm border-b border-white/20 py-6">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-3xl font-bold glow-text slide-in-left">
              <Link href="/" className="hover:text-blue-400 transition-colors duration-300">
                Adam's Alphabet
              </Link>
            </div>
            <div className="space-x-8 slide-in-right">
              <Link href="/" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">Home</Link>
              <Link href="/mathematics" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">Mathematics</Link>
              <Link href="/about" className="hover:text-blue-400 transition-all duration-300 hover:glow-text">About Me</Link>
              <Link href="/book" className="text-blue-400 hover:glow-text transition-all duration-300">Book a Class</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 glow-text slide-in-top">Book a Class</h1>
            <p className="text-gray-300 text-lg slide-in-bottom">
              Schedule a session with Adam — choose Zoom or in-person.
            </p>
          </div>

          <form onSubmit={onSubmit} className={`bg-black/40 backdrop-blur-sm rounded-2xl p-8 glow-border card-hover space-y-6 slide-in-bottom ${isValid() ? 'border-green-500/30' : ''}`}>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
              />
              {name && !name.trim() && (
                <p className="text-red-400 text-xs mt-1">Name is required</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
                {email && !/.+@.+\..+/.test(email) && (
                  <p className="text-red-400 text-xs mt-1">Please enter a valid email</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Phone <span className="text-red-400">*</span>
                </label>
                <input
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                  required
                />
                {phone && !phone.trim() && (
                  <p className="text-red-400 text-xs mt-1">Phone number is required</p>
                )}
              </div>
            </div>

            <div>
              <span className="block text-sm text-gray-300 mb-2">Preferred Mode</span>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mode" value="zoom" checked={mode === 'zoom'} onChange={() => setMode('zoom')} />
                  <span>Zoom (online)</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mode" value="in_person" checked={mode === 'in_person'} onChange={() => setMode('in_person')} />
                  <span>In-Person</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Details (optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Preferred dates/times, grade level, topics, location, etc."
              />
            </div>

            <button
              type="submit"
              disabled={!isValid() || isSubmitting}
              className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? "Opening Email..." : "Send Booking Request"}
            </button>

            {showSuccess && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <p className="text-green-300">
                    Email client opened! Please send the email to complete your booking request.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm text-gray-400">
              <p>
                By submitting, your email client will open with a prefilled message to <span className="text-gray-200">adamissac08@gmail.com</span>.
              </p>
              <p className="text-xs">
                <strong>Note:</strong> Make sure to actually send the email from your email client to complete the booking request.
              </p>
            </div>
          </form>

          <div className="text-center mt-10">
            <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">← Back to Home</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-white/20 py-12 mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-in-bottom">
            <div className="fade-in stagger-1">
              <h3 className="text-xl font-semibold mb-4 glow-text">Adam's Alphabet</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Free educational resources for students who need extra help with mathematics.
              </p>
            </div>
            <div className="fade-in stagger-2">
              <h3 className="text-xl font-semibold mb-4 glow-text">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</Link></li>
                <li><Link href="/mathematics" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Mathematics</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About Me</Link></li>
              </ul>
            </div>
            <div className="fade-in stagger-3">
              <h3 className="text-xl font-semibold mb-4 glow-text">Contact</h3>
              <div className="text-sm text-gray-300 space-y-3">
                <p className="flex items-center">
                  <span className="mr-2">📧</span>
                  adamissac08@gmail.com
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📺</span>
                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                    YouTube Channel
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-gray-400 fade-in stagger-4">
            <p>This website is intended for extra help and is not limited to students in Georgia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


