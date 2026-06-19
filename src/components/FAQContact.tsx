import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Phone, MessageSquare, ShieldAlert, Sparkles, Check, Send } from 'lucide-react';

export default function FAQContact() {
  const [activeTab, setActiveTab] = useState<'faq' | 'custom-inquiry' | 'policies'>('faq');
  const [customInquiryDone, setCustomInquiryDone] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Inquiry form fields
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('15 - 30 Guests');
  const [flavorNotes, setFlavorNotes] = useState('');
  const [sketchDetails, setSketchDetails] = useState('');

  const faqs = [
    {
      q: 'Do you offer same-day delivery? How fast does it arrive?',
      a: 'Yes, we specialize in high-speed boutique dispatch. If you order from our popular collections, our delivery agents can hand over your fresh cake in as little as 2 hours within Bangalore, Delhi, and Mumbai. Simply set your delivery pincode in the top location bar to verify.'
    },
    {
      q: 'Can you prepare custom eggless cakes? Are they prepared separately?',
      a: 'We takes safe food preparation exceptionally seriously. Yes! All our cakes offer a "100% Eggless" customization option. We bake our egg-free recipes using pure vegetarian, segregated kitchen utensils and in dedicated baking ovens, completely separate from our egg-sponge ranges.'
    },
    {
      q: 'Can I cancel or reschedule my cake order after ordering?',
      a: 'Since we prepare our signature recipes fresh on-demand for every customer, cancellation requests are fully refunded (100% cash back) if submitted at least 4 hours before your selected delivery slot. Within 4 hours, our bakers have already started hand-detailing your item, so we charge a small 50% waste fee.'
    },
    {
      q: 'How large a wedding cake or custom event cake can I order?',
      a: 'We design custom cakes of any scale! We routinely hand-detail 2-tier and 3-tier majestic wedding cakes weighing anywhere from 3 kg to over 15 kg. Simply navigate to our "Custom Tiers Inquiry" tab, fill in your details, and our chef will email you beautiful custom sketches.'
    },
    {
      q: 'How are cakes transported? Will they arrive in perfect shape?',
      a: 'We have bespoke delivery crates designed specifically for cake transit. Our couriers travel with temperature-insulated cold chambers and specialized suspension frames, ensuring your frosting details and edible structures remain immaculate during local transit.'
    }
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone || !custEmail) {
      alert('Please fill out Name, Phone, and Email coordinates.');
      return;
    }
    setCustomInquiryDone(true);
  };

  const handleResetInquiry = () => {
    setCustName('');
    setCustPhone('');
    setCustEmail('');
    setEventDate('');
    setFlavorNotes('');
    setSketchDetails('');
    setCustomInquiryDone(false);
  };

  return (
    <div id="faq-contact-block" className="max-w-5xl mx-auto px-4 my-16">
      
      {/* Category Tab selectors */}
      <div className="flex justify-center border-b border-[#C5A880]/20 mb-8 gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('faq')}
          className={`py-3 px-2 border-b-2 text-[#2A1B18] transition-colors ${
            activeTab === 'faq' ? 'border-[#2A1B18] font-black' : 'border-transparent text-gray-400 hover:text-[#2A1B18]'
          }`}
        >
          🙋 Frequently Asked Ques
        </button>
        <button
          onClick={() => setActiveTab('custom-inquiry')}
          className={`py-3 px-2 border-b-2 text-[#2A1B18] transition-colors ${
            activeTab === 'custom-inquiry' ? 'border-[#2A1B18] font-black' : 'border-transparent text-gray-400 hover:text-[#2A1B18]'
          }`}
        >
          👑 Custom Tier Inquiries
        </button>
        <button
          onClick={() => setActiveTab('policies')}
          className={`py-3 px-2 border-b-2 text-[#2A1B18] transition-colors ${
            activeTab === 'policies' ? 'border-[#2A1B18] font-black' : 'border-transparent text-gray-400 hover:text-[#2A1B18]'
          }`}
        >
          📜 Refund & Ship policies
        </button>
      </div>

      {/* RENDER CONTENT PANELS */}
      <div className="bg-white border border-[#C5A880]/15 rounded-3xl p-6 sm:p-8 shadow-xs">
        
        {/* PANEL A: FAQS */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="text-left mb-6 border-b border-[#C5A880]/15 pb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1B18]">Patisserie Assistance & FAQ</h3>
              <p className="text-xs text-gray-500 mt-1">Quick answers regarding ingredients, delivery tracking, cancellation and safety.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="border border-[#C5A880]/10 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left p-4 bg-[#FAF6F0]/40 flex justify-between items-center hover:bg-[#FAF6F0] transition-colors"
                  >
                    <span className="font-serif text-sm font-bold text-[#2A1B18] pr-4">{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-[#C5A880] transition-transform ${openFaqIndex === idx ? 'rotate-90' : ''}`} />
                  </button>

                  {openFaqIndex === idx && (
                    <div className="p-4 bg-white border-t border-[#C5A880]/10 text-xs text-gray-600 leading-relaxed font-sans text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Helpline quick-link banner */}
            <div className="mt-8 bg-[#C5A880]/10 border border-[#C5A880]/20 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-left space-y-1">
                <p className="font-bold text-xs text-[#2A1B18]">Have a complex dietary or custom packaging question?</p>
                <p className="text-[11px] text-gray-500 font-sans">Reach our lead patissier helpline anytime from 9 AM to 1 AM.</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href="tel:+1800CAKEPASS"
                  className="flex-1 sm:flex-none text-center bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  📞 Direct Call
                </a>
                <a
                  href="https://wa.me/15550000000?text=Hello%20Choco%20Moko%25!%20I%20have%2520a%2520special%2520dietary%2520request."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none text-center bg-[#128C7E] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        )}

        {/* PANEL B: CUSTOM DESIGNS LEAD CAPTURE */}
        {activeTab === 'custom-inquiry' && (
          <div>
            {!customInquiryDone ? (
              <form onSubmit={handleCustomSubmit} className="space-y-6 text-left">
                <div className="border-b border-[#C5A880]/15 pb-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                    <span className="font-mono text-xs uppercase font-bold text-[#B5945F]">Bespoke Chef Sketches</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1B18]">Design Your Milestone Tiers</h3>
                  <p className="text-xs text-gray-500 mt-1">Planning a massive wedding, anniversary, or corporate banquet? Our award-winning chef creates customized cake geometries matching your theme.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-500 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="e.g. Anand Sen"
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">WhatsApp Phone *</label>
                    <input
                      type="tel"
                      required
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      placeholder="e.g. +91 91111 22222"
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      placeholder="e.g. anand@outlook.com"
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-500 mb-1">Preferred Celebration Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">Anticipated Guest Count</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="15 - 30 Guests">15 - 30 Guests (approx 3kg+ tier)</option>
                      <option value="30 - 60 Guests">30 - 60 Guests / Dual Tier (approx 5kg+)</option>
                      <option value="60 - 150 Guests">60 - 150 Guests / Triple Tier (approx 8kg+)</option>
                      <option value="150+ Banquet Guests">Large Corporate / Ballroom Event (10kg+ custom tier structures)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-500 mb-1">Bespoke Flavor Profile Desired</label>
                    <textarea
                      rows={3}
                      value={flavorNotes}
                      onChange={(e) => setFlavorNotes(e.target.value)}
                      placeholder="e.g. Infused pure passion fruit syrup, light orange cream cheese sponge, sugar flower toppings..."
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">Structure, Theme & Design Specifications</label>
                    <textarea
                      rows={3}
                      value={sketchDetails}
                      onChange={(e) => setSketchDetails(e.target.value)}
                      placeholder="e.g. Royal high-contrast ivory cake with real fresh red roses scaling down the side. Golden edible leaf detailing."
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] font-bold text-xs uppercase tracking-widest py-4 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" /> Forward Inquiry to Lead Patissier
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4 max-w-md mx-auto">
                <div className="w-14 h-14 bg-emerald-15/20 border border-emerald-500 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#2A1B18]">Inquiry Received Perfectly!</h4>
                <p className="text-xs text-gray-600 font-sans leading-relaxed">
                  We have forwarded your notes to our Executive Cake Designer. <strong>We will contact you via WhatsApp or Email within 30 minutes</strong> with initial custom concept sketches and tiered pricing.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleResetInquiry}
                    className="border border-[#C5A880] text-[#2A1B18] hover:bg-[#FAF6F0] text-xs font-bold px-6 py-2 rounded-xl transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PANEL C: LEGAL COMPLIANCES TAB */}
        {activeTab === 'policies' && (
          <div className="space-y-6 text-left text-xs text-stone-700 leading-relaxed max-w-4xl">
            <div className="border-b border-[#C5A880]/15 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#2A1B18]">Merchant Compliance Policies</h3>
              <p className="text-xs text-gray-500 mt-1">Our customer-empowered guarantees regarding refunds, Cancellations and local transport.</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#2A1B18] uppercase tracking-wider">🔄 Cancellation & Cash-back Rules</h4>
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li><strong>Up to 4 hours before slot:</strong> 100% full cash refund processed immediately to source payment.</li>
                  <li><strong>Under 4 hours to designated slot:</strong> 50% refund issued due to custom sponge personalization being already committed in ovens.</li>
                  <li><strong>Transit failure:</strong> If a cake arrives structurally deformed during transit, we immediately offer 100% full re-dispatch or full card refund, no questions asked.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-[#2A1B18] uppercase tracking-wider mt-4">🚚 Shipping Rates & Slot Conditions</h4>
                <p className="mt-1">We deliver daily between 9 AM to 1 AM using temperature controlled vehicles. Deliveries are executed within your designated time slot limits:</p>
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li><strong>Standard Daily slots (12 PM - 4 PM & 5 PM - 8 PM):</strong> 105% FREE.</li>
                  <li><strong>Early Morning slots (9 AM - 12 PM):</strong> Nominal surcharge has an additional $2 lock.</li>
                  <li><strong>Express 2-hr priority processing:</strong> Additional $5 priority courier surcharge is applied.</li>
                  <li><strong>Midnight surprise slots (11:15 PM - 12 AM):</strong> Surcharge of $8 is appended for night-dispatch agents.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-[#2A1B18] uppercase tracking-wider mt-4">🔒 Customer Privacy Commitment</h4>
                <p className="mt-1">Choco Moko Cakes protects your transactional records elegantly. We do not sell card particulars or user phone details. Your phone number is solely processed in order to forward real-time baking coordinates and delivery progress notices.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/15550000000?text=Hello%20Choco%20Moko%20Cakes!%20I%20would%20like%20to%2520inquire%2520about%2520your%252520gourmet%2520cakes."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:opacity-95 transition-transform hover:scale-105 flex items-center justify-center cursor-pointer group"
        title="Direct chat with our pastry team"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all font-sans text-xs font-bold uppercase tracking-wider pl-0 group-hover:pl-2">
          WhatsApp Chat
        </span>
      </a>

    </div>
  );
}
