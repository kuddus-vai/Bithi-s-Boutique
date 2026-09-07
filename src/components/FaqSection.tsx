import React, { useState } from 'react';
import { Sparkles, ChevronDown, MessageCircle, Phone, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('সব প্রশ্ন');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = ['সব প্রশ্ন', 'অর্ডার ও ডেলিভারি', 'পেমেন্ট ও বিকাশ', 'ফেব্রিক ও কোয়ালিটি', 'রিটার্ন ও এক্সচেঞ্জ'];

  const faqs = [
    {
      category: 'অর্ডার ও ডেলিভারি',
      question: '১. ঢাকা ও ঢাকার বাইরে ডেলিভারি চার্জ এবং সময় কত?',
      answer: 'ঢাকার ভিতরে ডেলিভারি চার্জ ৮০ টাকা এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে সারাদেশে ডেলিভারি চার্জ ১৫০ টাকা এবং ২ থেকে ৩ কার্যদিবসের মধ্যে সুন্দরবন/রেডেক্স/স্টেডফাস্টের মাধ্যমে হোম ডেলিভারি করা হয়। ৳৫,০০০ বা তার বেশি অর্ডারে সারা বাংলাদেশে সম্পূর্ণ ফ্রি ডেলিভারি!',
    },
    {
      category: 'অর্ডার ও ডেলিভারি',
      question: '২. আমি কি পার্সেল খুলে দেখে ক্যাশ অন ডেলিভারিতে পেমেন্ট করতে পারব?',
      answer: 'হ্যাঁ, অবশ্যই! ডেলিভারি ম্যানের উপস্থিতিতে আপনি পার্সেলটি খুলে পণ্যের সঠিকতা যাচাই করে মূল্য পরিশোধ (Cash on Delivery) করতে পারবেন। কোনো অসঙ্গতি দেখলে সাথে সাথেই ডেলিভারি ম্যানকে রিটার্ন করতে পারবেন।',
    },
    {
      category: 'পেমেন্ট ও বিকাশ',
      question: '৩. পেমেন্টের কী কী মাধ্যম রয়েছে? বিকাশ বা নগদে কি পরিশোধ করা যায়?',
      answer: 'আমরা ক্যাশ অন ডেলিভারি (COD) ছাড়াও বিকাশ (bKash), নগদ (Nagad), রকেট ও ভিসা/মাস্টারকার্ড অনলাইন ব্যাংকিং গ্রহণ করি। অর্ডারের পর আমাদের অফিশিয়াল মার্চেন্ট নম্বরে সরাসরি ও নিরাপদে পেমেন্ট কনফার্ম করতে পারবেন।',
    },
    {
      category: 'ফেব্রিক ও কোয়ালিটি',
      question: '৪. আপনাদের কাপড়গুলো কি ১০০% অরিজিনাল পাকিস্তানি ব্র্যান্ডের?',
      answer: 'হ্যাঁ, বীথি’স বুটিক (Bithi’s Boutique) ২০১৯ সাল থেকে শুধুমাত্র ১০০% জেনুইন অরিজিনাল Roheenaz Luxury Edition এবং Gulljee Morja ভলিউম সরাসরি ইমপোর্ট করে। কোনো মাস্টার কপি বা রেপ্লিকা আমরা বিক্রি করি না। প্রতিটি স্যুটের সাথে ব্র্যান্ডের অরিজিনাল কার্ড, এমব্রয়ডারি প্যাচ ও প্রিমিয়াম প্যাকেজিং থাকে।',
    },
    {
      category: 'ফেব্রিক ও কোয়ালিটি',
      question: '৫. আনস্টিচড ৩-পিস স্যুটে কী কী ফেব্রিক উপাদান থাকে?',
      answer: 'প্রতিটি সেটে থাকে ৩.০ মিটার হেভি এমব্রয়ডার্ড পিওর সুইস লন ফ্রন্ট ও ব্যাক, ওরগাঞ্জা নেকলাইন ও স্লিভ পাত্তি, ২.৫ মিটার পিওর ডিজিটাল প্রিন্টেড সিল্ক/শিফন ওড়না এবং ২.৫ মিটার পিওর কটন ট্রাউজার পিস।',
    },
    {
      category: 'রিটার্ন ও এক্সচেঞ্জ',
      question: '৬. কাপড়ে কোনো ত্রুটি থাকলে কীভাবে রিটার্ন বা এক্সচেঞ্জ করব?',
      answer: 'পার্সেল পাওয়ার পর কোনো ম্যানুফ্যাকচারিং ত্রুটি বা সমস্যা থাকলে পণ্য হাতে পাওয়ার ৪৮ ঘণ্টার মধ্যে আমাদের হেল্পলাইন বা হোয়াটসঅ্যাপে ছবিসহ জানান। আমরা বিনামূল্যে সম্পূর্ণ এক্সচেঞ্জ বা মানিব্যাক রিফান্ডের নিশ্চয়তা দিই।',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'সব প্রশ্ন' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[#C23330] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>সার্ভিস ও ডেলিভারি তথ্য</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1F1F]">
            সাধারণ জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            অর্ডার, ডেলিভারি ও পেমেন্ট সম্পর্কিত সকল প্রশ্নের স্পষ্ট ও নির্ভরযোগ্য উত্তর
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="আপনার প্রশ্ন বা জিজ্ঞাসা লিখে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-[#C23330] focus:outline-none bg-stone-50/50 shadow-inner"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C23330] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-semibold text-[#1F1F1F] hover:text-[#C23330] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? 'rotate-180 text-[#C23330]' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-12 bg-[#1A1A1E] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold">
              কোনো প্রশ্ন আছে? সরাসরি আমাদের সাথে কথা বলুন!
            </h4>
            <p className="text-xs text-stone-400">
              আমাদের টিম আপনাকে সাইজ সিলেকশন ও দ্রুত অর্ডারে সহায়তা করতে প্রস্তুত।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/8801818935353?text=Hi%20Bithi's%20Boutique,%20I%20have%20an%20inquiry%20regarding%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp চ্যাট (01818-935353)</span>
            </a>

            <a
              href="tel:+8801818935353"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>কল করুন: 01818-935353</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
