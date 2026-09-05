import React, { useState } from 'react';
import { FLOORS_DATA, RESIDENCE_INFO, formatPrice } from './data/residenceData';
import { Apartment, FloorInfo } from './types';
import { Header } from './components/Header';
import { InteractiveBuilding } from './components/InteractiveBuilding';
import { ApartmentsList } from './components/ApartmentsList';
import { ApartmentDetailModal } from './components/ApartmentDetailModal';
import { BrokerProfile } from './components/BrokerProfile';
import { ProjectHighlights } from './components/ProjectHighlights';
import { QuickContactModal } from './components/QuickContactModal';
import { Footer } from './components/Footer';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Calendar,
  Layers,
  Award,
  ChevronDown,
} from 'lucide-react';

export default function App() {
  const [selectedFloorNumber, setSelectedFloorNumber] = useState<number>(4);
  const [hoveredFloorNumber, setHoveredFloorNumber] = useState<number | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [modalTab, setModalTab] = useState<'plan' | 'mortgage' | 'reservation'>('plan');
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);

  // Active floor to display in side window is the hovered floor if currently hovering, otherwise selected floor
  const activeFloorNumber = hoveredFloorNumber ?? selectedFloorNumber;
  const activeFloor: FloorInfo =
    FLOORS_DATA.find((f) => f.number === activeFloorNumber) || FLOORS_DATA[0];

  const handleOpenApartmentDetail = (
    apartment: Apartment,
    tab: 'plan' | 'mortgage' | 'reservation' = 'plan'
  ) => {
    setSelectedApartment(apartment);
    setModalTab(tab);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        onOpenQuickContact={() => setIsQuickContactOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
        {/* Project Intro / Sub-Hero Banner */}
        <section className="text-center max-w-3xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Nová komorní rezidence • Pouze 12 bytů v žádané lokalitě Praha 6</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-slate-950">
            {RESIDENCE_INFO.name}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Interaktivní výběr nového domova. Najeďte na podlaží budovy a objevte detailní dispozice 3 bytů na každém patře, přesné půdorysy a okamžitou hypoteční kalkulačku.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Energetická třída A (Mimořádně úsporná)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Tepelné čerpadlo & podlahové topení
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Podzemní garáž a sklep ke každému bytu
            </span>
          </div>
        </section>

        {/* PRIMARY CORE MODULE: Interactive Building + Side Apartments Window */}
        <section id="building-section" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Interactive 4-Story Building Photo */}
            <div className="lg:col-span-7">
              <InteractiveBuilding
                selectedFloorNumber={selectedFloorNumber}
                onSelectFloor={(num) => setSelectedFloorNumber(num)}
                hoveredFloorNumber={hoveredFloorNumber}
                onHoverFloor={(num) => setHoveredFloorNumber(num)}
              />
            </div>

            {/* Right 5 Columns: Adjacent Window with the 3 Apartments on this floor */}
            <div className="lg:col-span-5">
              <ApartmentsList
                floor={activeFloor}
                onSelectApartment={handleOpenApartmentDetail}
              />
            </div>
          </div>
        </section>

        {/* Standards and Equipment Highlights */}
        <ProjectHighlights />

        {/* Real Estate Broker Ondřej Porner Profile & Guarantee */}
        <BrokerProfile />
      </main>

      {/* Footer */}
      <Footer onSelectFloor={(num) => setSelectedFloorNumber(num)} />

      {/* Apartment Detail Window / Modal (Půdorys, Kalkulačka hypotéky, Rezervace) */}
      {selectedApartment && (
        <ApartmentDetailModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
          initialTab={modalTab}
        />
      )}

      {/* Quick Consultation Request Modal */}
      <QuickContactModal
        isOpen={isQuickContactOpen}
        onClose={() => setIsQuickContactOpen(false)}
      />
    </div>
  );
}
