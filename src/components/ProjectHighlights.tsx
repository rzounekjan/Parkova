import React from 'react';
import {
  Sparkles,
  Zap,
  Wind,
  Shield,
  Layers,
  Car,
  Trees,
  GraduationCap,
  MapPin,
  Utensils,
  Train,
} from 'lucide-react';

export const ProjectHighlights: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Standards Section */}
      <section id="standards-section">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Prémiové vybavení & Technologie
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mt-3 tracking-tight">
            Vysoký standard provedení bez kompromisů
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Projekt Rezidence Parková je postaven s důrazem na energetickou soběstačnost, ticho a prvotřídní přírodní materiály.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Tepelné čerpadlo & Podlahy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Úsporný systém země-voda s celoplošným podlahovým vytápěním a pasivním chlazením v letních měsících.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Rekuperace s filtrací
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Řízené větrání s rekuperací tepla zajišťuje nepřetržitý přísun čerstvého vzduchu bez pylů a prachu.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Dřevěné podlahy & Okna
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Třívrstvé masivní dubové podlahy, hliníková trojskla a motorické předokenní žaluzie s dálkovým ovládáním.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Garáže s nabíjením EV
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pohodlný vjezd do podzemního podlaží, velkorysé parkovací stání a chytrá příprava pro Wallboxy.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location-section" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
              Klidná adresa v Praze 6
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-3 tracking-tight">
              Břevnov — Harmonické spojení přírody a pulzujícího velkoměsta
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Vyhledávaná rezidenční čtvrť s dostatkem parků, sportovního vyžití a špičkovou infrastrukturou pro rodinný život.
            </p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Trees className="w-4 h-4" />
                </div>
                <span>3 min pěšky do parku Ladronka a obory Hvězda</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Train className="w-4 h-4" />
                </div>
                <span>Tramvajová zastávka 150 m (8 min k metru A Hradčanská)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>Výborné ZŠ, gymnázia i mezinárodní školy v těsné blízkosti</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <span>Vyhlášené pekárny, kavárny a farmářské trhy</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-800/80 rounded-2xl border border-slate-700 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Orientační dojezdové časy
              </span>
              <span className="text-[11px] text-slate-400">Praha 6 - Břevnov</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-2xl font-bold font-mono text-blue-400 block">3 min</span>
                <span className="text-xs text-slate-300">Park Ladronka</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-2xl font-bold font-mono text-blue-400 block">8 min</span>
                <span className="text-xs text-slate-300">Metro Hradčanská</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-2xl font-bold font-mono text-blue-400 block">12 min</span>
                <span className="text-xs text-slate-300">Letiště Václava Havla</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-2xl font-bold font-mono text-blue-400 block">15 min</span>
                <span className="text-xs text-slate-300">Centrum (Václavské nám.)</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-2xl font-bold font-mono text-blue-400 block">5 min</span>
                <span className="text-xs text-slate-300">Nemocnice Motol / UVN</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-2xl font-bold font-mono text-blue-400 block">4 min</span>
                <span className="text-xs text-slate-300">Břevnovský klášter</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
