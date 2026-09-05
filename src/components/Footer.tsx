import React from 'react';
import { RESIDENCE_INFO } from '../data/residenceData';
import { Phone, Mail, MapPin, ShieldCheck, Award } from 'lucide-react';
import brokerImg from '../assets/images/broker_ondrej_porner_1788430345409.jpg';

interface FooterProps {
  onSelectFloor: (floorNumber: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectFloor }) => {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Broker info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={brokerImg}
                alt="Ondřej Porner"
                className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-white font-bold font-serif text-sm">
                  ONDŘEJ PORNER
                </div>
                <div className="text-[11px] text-blue-400 font-medium">
                  Certifikovaný realitní makléř
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Exkluzivní prodej novostavby Rezidence Parková, Praha 6. Zajištění financování a komplexního právního servisu.
            </p>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Kontaktní údaje
            </h4>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <a
                href={`tel:${RESIDENCE_INFO.broker.phone.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors font-medium text-slate-200"
              >
                {RESIDENCE_INFO.broker.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <a
                href={`mailto:${RESIDENCE_INFO.broker.email}`}
                className="hover:text-white transition-colors"
              >
                {RESIDENCE_INFO.broker.email}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>{RESIDENCE_INFO.broker.address}</span>
            </div>
          </div>

          {/* Col 3: Quick Floor Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Podlaží rezidence
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    onSelectFloor(4);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  4. NP — Střešní Penthousy s terasami
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectFloor(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  3. NP — Rodinné byty s balkony
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectFloor(2);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  2. NP — Slunné byty 1+kk až 4+kk
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectFloor(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  1. NP — Přízemní byty s předzahrádkami
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantee */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Garance makléře
            </h4>
            <div className="flex items-start gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Advokátní úschova finančních prostředků zdarma.</span>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-slate-400">
              <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Certifikace dle zákona č. 39/2020 Sb. o realitním zprostředkování.</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Ondřej Porner Reality • Všechna práva vyhrazena.
          </div>
          <div className="flex gap-4">
            <span>Rezidence Parková, Praha 6</span>
            <span>•</span>
            <span>Všechny ceny jsou uvedeny vč. DPH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
