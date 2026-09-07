import React from 'react';
import { Sparkles, MessageCircle, Instagram, Facebook, MapPin, Phone, Mail, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenTracking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenTracking }) => {
  return (
    <footer className="bg-[#141416] text-[#FCFAF7] border-t border-stone-800">
      {/* Top 4 Highlights Strip */}
      <div className="border-b border-stone-800 py-8 bg-[#18181B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C23330]/10 text-[#FF5A57] flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-xs sm:text-sm text-white">ক্যাশ অন ডেলিভারি</h5>
                <p className="text-[11px] text-stone-400">ঢাকা ও সারাদেশে হোম ডেলিভারি</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C23330]/10 text-[#FF5A57] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-xs sm:text-sm text-white">ফ্রি হোম ডেলিভারি</h5>
                <p className="text-[11px] text-stone-400">৳৫,০০০+ টাকার সকল অর্ডারে</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C23330]/10 text-[#FF5A57] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-xs sm:text-sm text-white">১০০% অরিজিনাল</h5>
                <p className="text-[11px] text-stone-400">Roheenaz ও Gulljee ব্র্যান্ডেড</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C23330]/10 text-[#FF5A57] flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-xs sm:text-sm text-white">সহজ এক্সচেঞ্জ পলিসি</h5>
                <p className="text-[11px] text-stone-400">৪৮ ঘণ্টার নির্ভরযোগ্য সহায়তা</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Bithi's <span className="text-[#FFC766] italic font-normal">Boutique</span>
            </span>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              ২০১৯ সাল থেকে বাংলাদেশি ফ্যাশন অনুরাগীদের জন্য ১০০% অথেনটিক পাকিস্তানি লাক্সারি লন ও ব্রাইডাল ফ্যাশন। সরাসরি অরিজিনাল প্রস্তুতকারক থেকে ইমপোর্টকৃত এক্সক্লুসিভ কালেকশন।
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/bithi0974"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors"
                aria-label="Facebook: bithi0974"
                title="Facebook: bithi0974"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/bithis.boutique"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-colors"
                aria-label="Instagram: bithis.boutique"
                title="Instagram: @bithis.boutique"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801818935353"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                aria-label="WhatsApp: 01818-935353"
                title="WhatsApp: 01818-935353"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[11px] text-stone-400 space-y-0.5 pt-1">
              <p className="text-stone-300 font-medium">IG: <a href="https://instagram.com/bithis.boutique" target="_blank" rel="noopener noreferrer" className="text-[#FFC766] hover:underline">@bithis.boutique</a></p>
              <p className="text-stone-300 font-medium">FB: <a href="https://www.facebook.com/bithi0974" target="_blank" rel="noopener noreferrer" className="text-[#FFC766] hover:underline">fb.com/bithi0974</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              কালেকশন সমূহ
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#catalog" className="hover:text-[#FFC766] transition-colors">
                  Roheenaz Luxury Edition (10 Sets)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#FFC766] transition-colors">
                  Morja Vol. 7 by Gulljee (7 Sets)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#FFC766] transition-colors">
                  Pure Swiss Lawn 3-Piece
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#FFC766] transition-colors">
                  Embroidered Chiffon & Silk
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#FFC766] transition-colors">
                  Festive Wedding Collection
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              কাস্টমার সাপোর্ট
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  type="button"
                  onClick={onOpenTracking}
                  className="hover:text-[#FFC766] transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-[#FF5A57]" />
                  <span className="text-[#FF5A57] font-semibold">লাইভ পার্সেল ট্র্যাকিং (Order Tracking)</span>
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFC766] transition-colors">
                  সাধারণ জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FFC766] transition-colors">
                  ডেলিভারি চার্জ ও সময়সূচী
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FFC766] transition-colors">
                  সহজ এক্সচেঞ্জ ও রিটার্ন পলিসি
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801818935353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFC766] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>হোয়াটসঅ্যাপ হটলাইন (01818-935353)</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFC766] transition-colors">
                  আমাদের শতভাগ জেনুইন প্রতিশ্রুতি
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Payments */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              যোগাযোগ ও পেমেন্ট
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5A57] flex-shrink-0 mt-0.5" />
                <span>হাউজ ১২, রোড ৫, গুলশান-২, ঢাকা-১২১২, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+8801818935353" className="hover:text-white font-mono">
                  +880 1818-935353
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:support@bithisboutique.com" className="hover:text-white">
                  support@bithisboutique.com
                </a>
              </div>
            </div>

            {/* Payment methods badges */}
            <div className="pt-3">
              <span className="text-[10px] text-stone-400 block mb-2 uppercase tracking-wider">
                স্বীকৃত পেমেন্ট মেথড:
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="px-2 py-1 rounded bg-[#E2136E] text-white">bKash</span>
                <span className="px-2 py-1 rounded bg-[#F7931E] text-white">Nagad</span>
                <span className="px-2 py-1 rounded bg-stone-700 text-white">COD</span>
                <span className="px-2 py-1 rounded bg-[#1A1F71] text-white">VISA</span>
                <span className="px-2 py-1 rounded bg-[#EB001B] text-white">Mastercard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2019-2026 Bithi's Boutique. Est. 24 Apr 2019 • 7+ Years of Trust. Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Designed for Luxury Ethnic Fashion Lovers</span>
            <span className="text-stone-600">•</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-300 hover:text-amber-400 flex items-center gap-1 cursor-pointer font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
