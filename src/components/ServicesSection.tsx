import React from 'react';
import { Truck, Headset, ShieldCheck, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      step: 'STEP 01',
      icon: Truck,
      title: 'Free and Fast Delivery',
      desc: 'ঢাকা ও সারাদেশে দ্রুত ক্যাশ অন ডেলিভারি। ঢাকা সিটিতে ২৪ ঘণ্টায় এবং ঢাকার বাইরে ২-৩ দিনে পৌঁছে যাবে।',
      badge: 'Cash on Delivery',
    },
    {
      step: 'STEP 02',
      icon: Headset,
      title: '24/7 Customer Service',
      desc: 'হোয়াটসঅ্যাপ ও সরাসরি হটলাইনে ডেডিকেটেড সাপোর্ট। অর্ডার ট্র্যাকিং এবং সাইজ সিলেকশনে সার্বক্ষণিক সহায়তা।',
      badge: 'WhatsApp Support',
    },
    {
      step: 'STEP 03',
      icon: ShieldCheck,
      title: '100% Genuine Guarantee',
      desc: '১০০% অরিজিনাল পাকিস্তানি ব্র্যান্ড Roheenaz এবং Gulljee-এর প্রিমিয়াম সুইস লন ও ডিজিটাল শিফন ফেব্রিক।',
      badge: 'Direct Import',
    },
  ];

  return (
    <section className="py-14 bg-[#F9F8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#C23330] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCELLENCE IN SERVICE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
            Our Premium Services
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1.5">
            নিরাপদ শপিং ও নিরবচ্ছিন্ন গ্রাহক সেবায় বিশ্বস্ত প্রিমিয়াম বুটিক
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-stone-300 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#C23330] bg-[#C23330]/10 px-2.5 py-0.5 rounded-full">
                    {s.step}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    {s.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-stone-100 group-hover:bg-[#C23330] flex items-center justify-center text-stone-800 group-hover:text-white transition-colors duration-300 mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1F1F] mb-2 group-hover:text-[#C23330] transition-colors">
                  {s.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
