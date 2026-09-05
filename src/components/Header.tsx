import React from 'react';
import { RESIDENCE_INFO } from '../data/residenceData';
import { Phone, MessageSquare, Building2, Calendar, MapPin, Sparkles } from 'lucide-react';
import brokerImg from '../assets/images/broker_ondrej_porner_1788430345409.jpg';

interface HeaderProps {
  onOpenQuickContact: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuickContact,
  onScrollToSection,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar with address & status */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span>{RESIDENCE_INFO.address}</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
            • Kolaudace {RESIDENCE_INFO.completionDate} • Pouze 12 prémiových bytů
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${RESIDENCE_INFO.broker.phone.replace(/\s+/g, '')}`}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline text-slate-300 font-normal">Volejte makléři:</span> {RESIDENCE_INFO.broker.phone}
          </a>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Broker identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-lg shadow-xs shrink-0 border border-slate-800">
            <span className="text-white font-bold text-base tracking-tight font-serif">OP</span>
          </div>
          <img
            src={brokerImg}
            alt="Ondřej Porner - Realitní makléř"
            className="w-9 h-9 rounded-full object-cover border border-blue-500/40 shadow-xs hidden sm:block"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-950 font-serif">
                ONDŘEJ PORNER
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                Makléř
              </span>
            </div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className="text-slate-900 font-semibold">{RESIDENCE_INFO.name}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal">Exkluzivní prodej</span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            onClick={() => onScrollToSection('building-section')}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer"
          >
            Výběr podlaží & bytů
          </button>
          <button
            onClick={() => onScrollToSection('standards-section')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Standardy rezidence
          </button>
          <button
            onClick={() => onScrollToSection('broker-section')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Ondřej Porner
          </button>
          <button
            onClick={() => onScrollToSection('location-section')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Lokalita Praha 6
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            id="header-btn-whatsapp"
            href={`https://wa.me/${RESIDENCE_INFO.broker.phone.replace(/[^0-9]/g, '')}?text=Dobry%20den,%20mam%20zajem%20o%20byty%20v%20Rezidenci%20Parkova`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <button
            id="header-btn-call-consultation"
            onClick={onOpenQuickContact}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>Sjednat prohlídku</span>
          </button>
        </div>
      </div>
    </header>
  );
};
