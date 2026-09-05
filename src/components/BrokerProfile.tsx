import React, { useState } from 'react';
import { RESIDENCE_INFO } from '../data/residenceData';
import brokerImg from '../assets/images/broker_ondrej_porner_1788430345409.jpg';
import {
  Phone,
  Mail,
  MapPin,
  Award,
  ShieldCheck,
  CheckCircle,
  MessageSquare,
  Send,
  Calendar,
  Clock,
} from 'lucide-react';

export const BrokerProfile: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setIsSent(true);
  };

  return (
    <div id="broker-section" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column: Broker Portrait & Credentials (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative mb-5">
            <img
              src={brokerImg}
              alt="Ondřej Porner - Certifikovaný realitní makléř"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover shadow-md border-4 border-white ring-1 ring-slate-200"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 border border-blue-500">
              <Award className="w-4 h-4 text-white" />
              <span>12 let zkušeností</span>
            </div>
          </div>

          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            Váš osobní makléř projektu
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif tracking-tight mb-1">
            {RESIDENCE_INFO.broker.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-4">
            {RESIDENCE_INFO.broker.title}
          </p>

          <blockquote className="italic text-xs sm:text-sm text-slate-600 border-l-2 border-blue-600 pl-3 mb-6 leading-relaxed">
            „{RESIDENCE_INFO.broker.motto}“
          </blockquote>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start w-full">
            <a
              id="broker-call-link"
              href={`tel:${RESIDENCE_INFO.broker.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{RESIDENCE_INFO.broker.phone}</span>
            </a>
            <a
              id="broker-email-link"
              href={`mailto:${RESIDENCE_INFO.broker.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors border border-slate-200"
            >
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <span>{RESIDENCE_INFO.broker.email}</span>
            </a>
          </div>
        </div>

        {/* Right column: Broker Guarantees & Direct Message Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-3">
              Proč řešit koupi bytu přímo s Ondřejem Pornerem?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">
                    Bezpečný právní servis
                  </strong>
                  Advokátní úschova kupní ceny a revize smluv renomovanou advokátní kanceláří v ceně.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">
                    Záruka nejnižší hypotéky
                  </strong>
                  Nezávislé porovnání nabídek 14 bank se slevou na úrokové sazbě pro klienty rezidence.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">
                    Přímý kontakt s developerem
                  </strong>
                  Možnost klientských změn v dispozici a výběru materiálů podlah a obkladů.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">
                    Flexibilní termíny prohlídek
                  </strong>
                  Osobní prohlídky stavby i vzorových materiálů včetně víkendů a podvečerů.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Consultation Form Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Nezávazná konzultace či dotaz k projektu
              </h5>
              <span className="text-[11px] text-emerald-700 font-medium">
                Odpověď garantována do 24 hodin
              </span>
            </div>

            {isSent ? (
              <div className="p-4 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Děkujeme! Zpráva byla odeslána. Makléř Ondřej Porner se vám brzy ozve.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Vaše jméno *"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="p-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefon *"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="p-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="p-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dotaz na konkrétní byt, harmonogram či financování..."
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    className="flex-1 p-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    id="btn-send-broker-inquiry"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Odeslat</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
