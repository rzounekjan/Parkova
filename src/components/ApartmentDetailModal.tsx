import React, { useState, useEffect } from 'react';
import { Apartment } from '../types';
import { formatPrice, formatNumber, RESIDENCE_INFO } from '../data/residenceData';
import { FloorPlanViewer } from './FloorPlanViewer';
import { MortgageCalculator } from './MortgageCalculator';
import { ReservationForm } from './ReservationForm';
import {
  X,
  Maximize2,
  Share2,
  Printer,
  Calendar,
  Layers,
  Compass,
  Zap,
  Car,
  Box,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  FileText,
  Calculator,
  BookmarkPlus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import brokerImg from '../assets/images/broker_ondrej_porner_1788430345409.jpg';

interface ApartmentDetailModalProps {
  apartment: Apartment | null;
  onClose: () => void;
  initialTab?: 'plan' | 'mortgage' | 'reservation';
}

export const ApartmentDetailModal: React.FC<ApartmentDetailModalProps> = ({
  apartment,
  onClose,
  initialTab = 'plan',
}) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'mortgage' | 'reservation'>(
    initialTab
  );

  // Sync initialTab when apartment changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, apartment?.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!apartment) return null;

  const statusBadge = {
    available: { label: 'K dispozici (Volný)', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    reserved: { label: 'Předrezervováno', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
    sold: { label: 'Prodáno', bg: 'bg-slate-100 text-slate-600 border-slate-300' },
  }[apartment.status];

  return (
    <div
      id="apartment-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="apartment-detail-modal-window"
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-blue-600 text-white font-extrabold text-xs rounded-md font-mono shadow-xs">
              {apartment.code}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {apartment.name}
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadge.bg}`}>
                  {statusBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {apartment.floorNumber}. NP • {apartment.disposition} • Rezidence Parková, Praha 6
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Zavřít okno (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Parameters Strip */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-5 sm:px-6 py-3 shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 block">Kupní cena</span>
              <span className="font-extrabold text-blue-600 font-mono text-sm">
                {formatPrice(apartment.price)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Cena za m²</span>
              <span className="font-semibold text-slate-700 font-mono">
                {formatNumber(apartment.pricePerM2)} Kč/m²
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Užitná plocha</span>
              <span className="font-semibold text-slate-900 font-mono">
                {apartment.interiorArea} m²
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">
                {apartment.exteriorType === 'předzahrádka' ? 'Zahrada' : apartment.exteriorType}
              </span>
              <span className="font-semibold text-emerald-800 font-mono">
                {apartment.exteriorArea} m²
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Orientace</span>
              <span className="font-semibold text-slate-900">{apartment.orientation}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Sklep & Garáž</span>
              <span className="font-semibold text-slate-900">
                {apartment.parkingIncluded ? `${apartment.parkingSpaces}x garáž` : 'Možnost dokoupit'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Header */}
        <div className="flex border-b border-slate-200 px-5 sm:px-6 bg-white shrink-0 gap-1 sm:gap-4 overflow-x-auto">
          <button
            id="tab-plan"
            onClick={() => setActiveTab('plan')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'plan'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            Půdorys & Parametry bytu
          </button>

          <button
            id="tab-mortgage"
            onClick={() => setActiveTab('mortgage')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'mortgage'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            Hypoteční kalkulačka
          </button>

          <button
            id="tab-reservation"
            onClick={() => setActiveTab('reservation')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reservation'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            Rezervační formulář
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'plan' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Floor plan schematic */}
              <FloorPlanViewer apartment={apartment} />

              {/* Apartment Description & Key Features */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">
                      Popis jednotky {apartment.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {apartment.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">
                      Standardy a přednosti tohoto bytu
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {apartment.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technical Specifications Sheet */}
                <div className="lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
                    Technické specifikace
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Podlaží:</span>
                      <span className="font-semibold text-slate-800">
                        {apartment.floorNumber}. NP z celkových 4 NP
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Výška stropů:</span>
                      <span className="font-semibold text-slate-800">
                        {apartment.ceilingHeight}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Energetický štítek:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Třída {apartment.energyRating} (Mimořádně úsporná)
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Vytápění:</span>
                      <span className="font-medium text-slate-800 text-right">
                        Podlahové, tepelné čerpadlo
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Sklepní kóje:</span>
                      <span className="font-medium text-slate-800">
                        V ceně ({apartment.cellarArea} m² v 1. PP)
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Garážové stání:</span>
                      <span className="font-medium text-slate-800">
                        {apartment.parkingIncluded
                          ? `${apartment.parkingSpaces}x podzemní stání v ceně`
                          : 'Možnost přikoupení'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      id="btn-goto-mortgage-from-plan"
                      onClick={() => setActiveTab('mortgage')}
                      className="w-full py-2 px-3 bg-white border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calculator className="w-3.5 h-3.5 text-blue-600" />
                      Spočítat hypotéku pro tento byt
                    </button>
                    <button
                      id="btn-goto-reservation-from-plan"
                      onClick={() => setActiveTab('reservation')}
                      className="w-full py-2.5 px-3 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Přejít k rezervaci bytu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mortgage' && (
            <div className="animate-in fade-in duration-200">
              <MortgageCalculator
                initialPrice={apartment.price}
                apartmentCode={apartment.code}
                onApplyForFinancing={() => setActiveTab('reservation')}
              />
            </div>
          )}

          {activeTab === 'reservation' && (
            <div className="animate-in fade-in duration-200">
              <ReservationForm apartment={apartment} />
            </div>
          )}
        </div>

        {/* Modal Bottom Broker Bar */}
        <div className="bg-slate-900 border-t border-slate-800 px-5 sm:px-6 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <img
              src={brokerImg}
              alt="Ondřej Porner - Realitní makléř"
              className="w-9 h-9 rounded-full object-cover border border-blue-400/50"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>{RESIDENCE_INFO.broker.name}</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-400/30">
                  Makléř projektu
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Osobní prohlídky & individuální jednání o ceně
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="btn-call-broker-modal"
              href={`tel:${RESIDENCE_INFO.broker.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESIDENCE_INFO.broker.phone}</span>
            </a>
            <a
              id="btn-email-broker-modal"
              href={`mailto:${RESIDENCE_INFO.broker.email}?subject=Zajem o ${apartment.name}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors border border-slate-700"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Napsat e-mail</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
