import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#B38F27] font-bold">Get In Touch</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2623]">Visit Our Flagship or Chat With Us</h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Have questions about custom sizing, bridal appointments, or international dispatch? We are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EADBC8] shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2C2623] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C2623]">Flagship Boutique</h4>
                  <p className="text-xs text-gray-600 mt-1">House 12, Road 5, Gulshan-2, Dhaka-1212, Bangladesh</p>
                  <p className="text-[11px] text-stone-500 font-medium mt-1">Serving clients since 24 Apr 2019 (7+ Years of Trust)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2C2623] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C2623]">WhatsApp & Phone Hotline</h4>
                  <p className="text-xs text-gray-600 mt-1">01818-935353 (+880 1818-935353)</p>
                  <a
                    href="https://wa.me/8801818935353?text=Hi%20Bithi's%20Boutique,%20I%20need%20assistance%20with..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline mt-2"
                  >
                    <span>Chat on WhatsApp (01818-935353)</span> →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2C2623] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C2623]">Store Hours & Online Orders</h4>
                  <p className="text-xs text-gray-600 mt-1">Saturday – Friday: 10:00 AM – 10:00 PM BST (Dhaka Time)</p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <a
                      href="https://www.facebook.com/bithi0974"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      FB: bithi0974
                    </a>
                    <span className="text-stone-300">•</span>
                    <a
                      href="https://instagram.com/bithis.boutique"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:underline font-semibold"
                    >
                      IG: @bithis.boutique
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#EADBC8] shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-4 animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#2C2623]">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out to Bithi's Boutique. Our style consultant will connect with you via WhatsApp (01818-935353) within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[#2C2623] text-white text-xs font-bold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#2C2623]">Send Us a Direct Inquiry</h3>
                <p className="text-xs text-gray-500">Fill in your details below and our team will get back to you promptly.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#2C2623]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Roy"
                      className="w-full text-xs bg-[#FCFAF7] border border-[#EADBC8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#2C2623]">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01818-935353"
                      className="w-full text-xs bg-[#FCFAF7] border border-[#EADBC8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#2C2623]">Your Message or Outfit Inquiry</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention item names, custom sizing requests, or event dates..."
                    className="w-full text-xs bg-[#FCFAF7] border border-[#EADBC8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#2C2623] text-[#FCFAF7] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#B38F27] transition-all shadow-lg"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
