import React, { useState } from 'react';
import { Apartment } from '../types';
import {
  Ruler,
  Armchair,
  Check,
  Sparkles,
  Info,
  Compass,
  Layers,
  Sparkle
} from 'lucide-react';

interface GardenResidenceFloorPlanProps {
  apartment: Apartment;
  activeRoomIndex: number | null;
  onSelectRoom: (index: number | null) => void;
  zoomLevel: number;
}

interface RoomSpec {
  code: string;
  name: string;
  area: number;
  dimensions: string;
  flooring: string;
  features: string[];
  type: 'living' | 'bedroom' | 'bathroom' | 'hall' | 'exterior' | 'storage';
}

const ROOM_SPECS: Record<number, RoomSpec> = {
  0: {
    code: '1.1.01',
    name: 'Obývací p. + kk kuchyňským koutem',
    area: 36.8,
    dimensions: '6,50 × 5,66 m',
    flooring: 'Dubová třívrstvá prkna Bauwerk, matný lak',
    features: [
      'Kuchyňský ostrůvek s varnou zónou a 3 barovými místy',
      'Přímý výstup na krytou terasu francouzskými dveřmi (150/200)',
      'Velkoformátová východní prosklená stěna šířky 5,5 m (100/100)',
      'Jídelní kout pro 6 osob a relaxační sedací zóna s TV stěnou',
      'Příprava pro skrytou digestoř a podlahové teplovodní vytápění'
    ],
    type: 'living'
  },
  1: {
    code: '1.1.02',
    name: 'Ložnice',
    area: 16.2,
    dimensions: '5,50 × 3,00 m',
    flooring: 'Dubová prkna s akustickou tlumící podložkou',
    features: [
      'Prostor pro manželské dvoulůžko s nočními stolky',
      'Přímý privátní vstup do šatny (4,5 m²) a koupelny en-suite',
      'Jižní okno (160/130) s výhledem a předokenními žaluziemi',
      'TV instalace a nezávislá regulace teploty'
    ],
    type: 'bedroom'
  },
  2: {
    code: '1.1.03',
    name: 'Pokoj (dětský pokoj / pracovna)',
    area: 13.9,
    dimensions: '3,90 × 3,60 m',
    flooring: 'Dubová třívrstvá prkna Bauwerk',
    features: [
      'Dvě vestavné šatní skříně (podél levé a horní stěny)',
      'Pracovní stůl s přirozeným denním světlem pod oknem (190/130)',
      'Lůžko s úložným prostorem',
      'Strukturovaná kabeláž Cat.6A pro vysokorychlostní internet'
    ],
    type: 'bedroom'
  },
  3: {
    code: '1.1.04',
    name: 'Terasa',
    area: 14.5,
    dimensions: '6,50 × 2,50 m',
    flooring: 'Dřevěný decking z termojasanu s protiskluzovou úpravou',
    features: [
      'Zastřešená část s venkovním salonním sezením a stolkem',
      'Venkovní jídelní stůl se 4 křesly',
      'Bezpečnostní skleněné zábradlí s nerezovým madlem',
      'Venkovní mrazuvzdorná zásuvka 230V a nezámrzný zahradní kohout',
      'Přímé propojení s obývacím pokojem'
    ],
    type: 'exterior'
  },
  4: {
    code: '1.1.05',
    name: 'Koupelna en-suite',
    area: 6.1,
    dimensions: '3,90 × 2,00 m',
    flooring: 'Velkoformátový gres 120×60 cm, protiskluz R10',
    features: [
      'Privátní koupelna přístupná přímo přes šatnu z ložnice',
      'Prostorný walk-in sprchový kout s podlahovým žlabem a sklem',
      'Komfortní smaltovaná vana Kaldewei 180×80 cm',
      'Závěsné WC, umyvadlo se skříňkou a otopný žebřík',
      'Denní světlo přes světlík / okno (100/150)'
    ],
    type: 'bathroom'
  },
  5: {
    code: '1.1.06',
    name: 'Koupelna',
    area: 5.3,
    dimensions: '2,50 × 2,10 m',
    flooring: 'Velkoformátová rektifikovaná keramická dlažba',
    features: [
      'Sprchový kout šířky 2100 mm s posuvnou zástěnou',
      'Umyvadlo s baterií Hansgrohe a zrcadlem s LED podsvícením',
      'Vyhrazená nika 1260 mm pro pračku a sušičku',
      'Okno pro přirozené větrání a denní světlo (100/150)'
    ],
    type: 'bathroom'
  },
  6: {
    code: '1.1.07',
    name: 'Šatna',
    area: 4.5,
    dimensions: '3,20 × 1,40 m',
    flooring: 'Dubová třívrstvá prkna Bauwerk',
    features: [
      'Průchozí šatna (walk-in closet) mezi ložnicí a koupelnou en-suite',
      'Oboustranný vestavný policový systém s šatními tyčemi',
      'Čistá šířka komunikační uličky 1400 mm dle projektu',
      'Automatické LED osvětlení spínané pohybovým čidlem'
    ],
    type: 'storage'
  },
  7: {
    code: '1.1.08',
    name: 'WC',
    area: 2.1,
    dimensions: '1,70 × 1,26 m',
    flooring: 'Velkoformátová keramická dlažba',
    features: [
      'Samostatná toaleta pro hosty přístupná z centrální chodby',
      'Závěsný klozet se skrytým splachovacím modulem Geberit',
      'Kompaktní designové umyvátko s teplou a studenou vodou',
      'Nucené tiché odvětrání s časovým doběhem'
    ],
    type: 'bathroom'
  },
  8: {
    code: '1.1.09',
    name: 'Chodba / předsíň',
    area: 9.6,
    dimensions: '5,20 × 1,90 m',
    flooring: 'Velkoformátová dlažba / dřevěná prkna',
    features: [
      'Centrální páteř bytu spojující všechny zóny',
      'Bezpečnostní protipožární vstupní dveře třídy 3 (NEXT)',
      'Nika pro vestavěnou šatní skříň na kabáty a botník',
      'Videotelefon a centrální ovládací panel chytré domácnosti'
    ],
    type: 'hall'
  }
};

export const GardenResidenceFloorPlan: React.FC<GardenResidenceFloorPlanProps> = ({
  apartment,
  activeRoomIndex,
  onSelectRoom,
  zoomLevel
}) => {
  // Layer toggles
  const [showFurniture, setShowFurniture] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showFlooring, setShowFlooring] = useState<boolean>(true);

  const selectedSpec = activeRoomIndex !== null ? ROOM_SPECS[activeRoomIndex] : null;

  const getRoomFill = (index: number, defaultFill: string) => {
    const isSelected = activeRoomIndex === index;
    if (isSelected) {
      return 'fill-blue-500/20 stroke-blue-600 stroke-[2.5]';
    }
    return `${defaultFill} hover:fill-blue-400/15 transition-all duration-200 cursor-pointer`;
  };

  return (
    <div className="w-full flex flex-col gap-4 select-none">
      {/* Interactive Toolbar for Layers */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
        <div className="flex items-center gap-1.5 font-medium text-slate-900">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Vrstvy architektonického výkresu:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setShowFurniture(!showFurniture)}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
              showFurniture
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
            title="Zobrazit/skrýt nábytek a zařizovací předměty"
          >
            <Armchair className="w-3.5 h-3.5" />
            <span>Nábytek</span>
          </button>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
              showDimensions
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
            title="Zobrazit/skrýt kóty a rozměry dle výkresu"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Kóty (mm)</span>
          </button>

          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
              showLabels
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
            title="Zobrazit/skrýt popisky a výměry místností"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Popisky</span>
          </button>

          <button
            onClick={() => setShowFlooring(!showFlooring)}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
              showFlooring
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
            title="Zobrazit/skrýt textury podlah (dřevo, dlažba, terasa)"
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>Podlahy</span>
          </button>

          {activeRoomIndex !== null && (
            <button
              onClick={() => onSelectRoom(null)}
              className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 font-medium transition-colors ml-1"
            >
              Zrušit výběr
            </button>
          )}
        </div>
      </div>

      {/* Main SVG Floor Plan Canvas */}
      <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex items-center justify-center p-2 sm:p-4 min-h-[480px]">
        {/* Subtle architectural grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Blueprint Stamp & Scale in Top-Left */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg p-2 text-[11px] text-slate-600 shadow-2xs z-10 hidden sm:block">
          <div className="font-bold text-slate-900 tracking-wide uppercase text-[10px]">Rezidence Park Hostivař</div>
          <div className="text-slate-500">Byt 1.1 — Garden Residence (3+kk)</div>
          <div className="text-blue-700 font-semibold mt-0.5">Celková plocha: 109,0 m² (vč. terasy)</div>
        </div>

        {/* Vector SVG Graphic */}
        <div
          className="w-full flex items-center justify-center transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 1000 730"
            className="w-full max-w-[940px] h-auto drop-shadow-xs"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Wooden Decking pattern for Terrace */}
              <pattern id="terraceDecking" width="10" height="24" patternUnits="userSpaceOnUse">
                <rect width="10" height="24" fill="#f8fafc" />
                <line x1="0" y1="0" x2="10" y2="0" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="12" x2="10" y2="12" stroke="#e2e8f0" strokeWidth="0.7" />
              </pattern>

              {/* Parquet Wood pattern for living & bedrooms */}
              <pattern id="woodFlooring" width="28" height="14" patternUnits="userSpaceOnUse">
                <rect width="28" height="14" fill="#fefefe" />
                <path d="M0,0 L28,0 M0,7 L28,7 M0,14 L28,14 M14,0 L14,7 M0,7 L0,14 M28,7 L28,14" stroke="#f1f5f9" strokeWidth="0.75" />
              </pattern>

              {/* Bathroom Tile pattern */}
              <pattern id="bathTile" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#f8fafc" />
                <rect width="20" height="20" fill="none" stroke="#e2e8f0" strokeWidth="0.7" />
              </pattern>

              {/* Arrow marker for CAD dimension lines */}
              <marker id="cadTick" markerWidth="6" markerHeight="6" refX="3" refY="3">
                <line x1="1" y1="5" x2="5" y2="1" stroke="#475569" strokeWidth="1.2" />
              </marker>
            </defs>

            {/* ================================================================= */}
            {/* 1. ROOM BACKGROUNDS / INTERACTIVE POLYGONS                        */}
            {/* ================================================================= */}
            <g id="room-polygons">
              {/* Room 4: Koupelna en-suite (top-left) */}
              <rect
                x="110"
                y="80"
                width="220"
                height="140"
                className={getRoomFill(4, showFlooring ? 'fill-[url(#bathTile)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(4)}
              />

              {/* Room 6: Šatna (middle-left) */}
              <rect
                x="110"
                y="226"
                width="160"
                height="144"
                className={getRoomFill(6, showFlooring ? 'fill-[url(#woodFlooring)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(6)}
              />

              {/* Room 1: Ložnice (bottom-left) */}
              <rect
                x="110"
                y="376"
                width="240"
                height="164"
                className={getRoomFill(1, showFlooring ? 'fill-[url(#woodFlooring)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(1)}
              />

              {/* Room 5: Koupelna (top-center) */}
              <rect
                x="336"
                y="80"
                width="134"
                height="140"
                className={getRoomFill(5, showFlooring ? 'fill-[url(#bathTile)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(5)}
              />

              {/* Room 7: WC (center-middle) */}
              <rect
                x="470"
                y="146"
                width="65"
                height="100"
                className={getRoomFill(7, showFlooring ? 'fill-[url(#bathTile)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(7)}
              />

              {/* Room 2: Pokoj (bottom-center) */}
              <rect
                x="356"
                y="310"
                width="214"
                height="230"
                className={getRoomFill(2, showFlooring ? 'fill-[url(#woodFlooring)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(2)}
              />

              {/* Room 8: Chodba / Předsíň (central spine) */}
              <polygon
                points="276,226 350,226 350,370 276,370"
                className={getRoomFill(8, showFlooring ? 'fill-[url(#woodFlooring)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(8)}
              />
              <polygon
                points="336,226 470,226 470,304 356,304 356,226"
                className={getRoomFill(8, showFlooring ? 'fill-[url(#woodFlooring)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(8)}
              />
              <polygon
                points="470,80 570,80 570,304 540,304 540,146 470,146"
                className={getRoomFill(8, showFlooring ? 'fill-[url(#woodFlooring)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(8)}
              />

              {/* Room 0: Obývací p. + kk kuchyňským koutem (right side) */}
              <rect
                x="576"
                y="80"
                width="354"
                height="460"
                className={getRoomFill(0, showFlooring ? 'fill-[url(#woodFlooring)]' : 'fill-slate-50/50')}
                onClick={() => onSelectRoom(0)}
              />

              {/* Room 3: Terasa (bottom-right) */}
              <rect
                x="576"
                y="546"
                width="354"
                height="144"
                className={getRoomFill(3, showFlooring ? 'fill-[url(#terraceDecking)]' : 'fill-amber-50/40')}
                onClick={() => onSelectRoom(3)}
              />
            </g>

            {/* ================================================================= */}
            {/* 2. ARCHITECTURAL WALLS & PARTITIONS (SOLID CAD LINES)             */}
            {/* ================================================================= */}
            <g id="walls" className="pointer-events-none">
              {/* Outer Perimeter Walls (Thick black/dark slate masonry) */}
              {/* Top Exterior Wall with window cutouts */}
              <rect x="94" y="64" width="852" height="16" fill="#1e293b" />
              {/* Left Exterior Wall */}
              <rect x="94" y="64" width="16" height="492" fill="#1e293b" />
              {/* Bottom Exterior Wall (Ložnice & Pokoj) */}
              <rect x="94" y="540" width="482" height="16" fill="#1e293b" />
              {/* Right Exterior Wall (Living room) */}
              <rect x="930" y="64" width="16" height="492" fill="#1e293b" />
              {/* Living room bottom wall (between Living and Terrace) */}
              <rect x="560" y="540" width="386" height="16" fill="#1e293b" />

              {/* Interior Load-bearing & Partition Walls */}
              {/* Vertical wall between En-suite/Ložnice and Center Hallway/Pokoj */}
              <rect x="340" y="226" width="10" height="314" fill="#334155" />
              <rect x="328" y="80" width="8" height="146" fill="#334155" />

              {/* Vertical wall between Center Hallway/Pokoj and Living room */}
              <rect x="568" y="80" width="8" height="460" fill="#334155" />

              {/* Horizontal wall between En-suite (top) and Šatna */}
              <rect x="110" y="220" width="220" height="6" fill="#475569" />

              {/* Horizontal wall between Šatna and Ložnice */}
              <rect x="110" y="370" width="230" height="6" fill="#475569" />

              {/* Wall between Koupelna 5.3 and Hallway/WC */}
              <rect x="466" y="80" width="4" height="166" fill="#475569" />
              <rect x="336" y="220" width="134" height="6" fill="#475569" />

              {/* Wall around WC 2.1 */}
              <rect x="470" y="246" width="65" height="5" fill="#475569" />
              <rect x="535" y="146" width="5" height="105" fill="#475569" />

              {/* Horizontal wall between Hallway and Pokoj 13.9 */}
              <rect x="350" y="304" width="220" height="6" fill="#475569" />

              {/* Wall cutout for washer niche 1260 in hallway/koupelna */}
              <rect x="470" y="80" width="65" height="6" fill="#475569" />

              {/* Terrace Boundary / Railing */}
              <rect x="576" y="686" width="354" height="4" fill="#475569" />
              <rect x="576" y="546" width="4" height="144" fill="#475569" />
              <rect x="926" y="546" width="4" height="144" fill="#475569" />
              {/* Glass balustrade line */}
              <line x1="580" y1="688" x2="926" y2="688" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 2" opacity="0.8" />
              <line x1="578" y1="550" x2="578" y2="688" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 2" opacity="0.8" />
              <line x1="928" y1="550" x2="928" y2="688" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 2" opacity="0.8" />
            </g>

            {/* ================================================================= */}
            {/* 3. WINDOWS AND EXTERIOR GLAZING (with sill lines)                */}
            {/* ================================================================= */}
            <g id="windows" className="pointer-events-none">
              {/* Window in Koupelna en-suite (100/150) */}
              <rect x="175" y="64" width="75" height="16" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
              <line x1="175" y1="72" x2="250" y2="72" stroke="#0284c7" strokeWidth="2" />
              <text x="212" y="58" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">100/150</text>

              {/* Window in Koupelna 5.3 (100/150) */}
              <rect x="365" y="64" width="70" height="16" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
              <line x1="365" y1="72" x2="435" y2="72" stroke="#0284c7" strokeWidth="2" />
              <text x="400" y="58" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">100/150</text>

              {/* Window in Ložnice (160/130) */}
              <rect x="170" y="540" width="95" height="16" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
              <line x1="170" y1="548" x2="265" y2="548" stroke="#0284c7" strokeWidth="2" />
              <text x="217" y="568" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">160/130</text>

              {/* Window in Pokoj (190/130) */}
              <rect x="390" y="540" width="105" height="16" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
              <line x1="390" y1="548" x2="495" y2="548" stroke="#0284c7" strokeWidth="2" />
              <text x="442" y="568" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">190/130</text>

              {/* Large East Facade Glazing in Living Room (5500 mm, 100/100) */}
              <rect x="930" y="140" width="16" height="340" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
              <line x1="938" y1="140" x2="938" y2="480" stroke="#0284c7" strokeWidth="2.5" />
              {/* Glass mullions */}
              <line x1="930" y1="225" x2="946" y2="225" stroke="#334155" strokeWidth="1.5" />
              <line x1="930" y1="310" x2="946" y2="310" stroke="#334155" strokeWidth="1.5" />
              <line x1="930" y1="395" x2="946" y2="395" stroke="#334155" strokeWidth="1.5" />
              <text x="962" y="315" textAnchor="middle" transform="rotate(90 962 315)" className="text-[9px] fill-slate-500 font-mono">5500 (100/100)</text>

              {/* Double French Terrace Doors (150/200) in Living Room */}
              <rect x="585" y="540" width="85" height="16" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
              <line x1="585" y1="548" x2="670" y2="548" stroke="#0284c7" strokeWidth="2" />
              {/* Door swing arc to terrace */}
              <path d="M585,556 A42,42 0 0,0 627,598" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M670,556 A42,42 0 0,1 628,598" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
              <text x="628" y="534" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono">150/200</text>
            </g>

            {/* ================================================================= */}
            {/* 4. INTERIOR DOORS AND SWING ARCS                                  */}
            {/* ================================================================= */}
            <g id="doors" className="pointer-events-none">
              {/* Door to Ložnice from Hallway */}
              <path d="M340,430 A50,50 0 0,1 290,380" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="340" y1="430" x2="290" y2="380" stroke="#334155" strokeWidth="1.5" />

              {/* Door to Šatna from Ložnice */}
              <path d="M230,370 A45,45 0 0,0 275,415" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="230" y1="370" x2="275" y2="415" stroke="#334155" strokeWidth="1.5" />

              {/* Door to Koupelna en-suite from Šatna */}
              <path d="M230,220 A45,45 0 0,1 275,175" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="230" y1="220" x2="275" y2="175" stroke="#334155" strokeWidth="1.5" />

              {/* Door to Koupelna 5.3 from Hallway */}
              <path d="M430,220 A45,45 0 0,0 385,175" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="430" y1="220" x2="385" y2="175" stroke="#334155" strokeWidth="1.5" />

              {/* Door to WC 2.1 from Hallway (opens outwards) */}
              <path d="M470,230 A40,40 0 0,1 510,270" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="470" y1="230" x2="510" y2="270" stroke="#334155" strokeWidth="1.5" />

              {/* Door to Pokoj 13.9 from Hallway */}
              <path d="M420,304 A45,45 0 0,1 375,349" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="420" y1="304" x2="375" y2="349" stroke="#334155" strokeWidth="1.5" />

              {/* Main Entrance Door into Apartment (Hallway) */}
              <line x1="500" y1="72" x2="560" y2="72" stroke="#e11d48" strokeWidth="3" />
              <path d="M500,80 A60,60 0 0,0 560,140" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="530" y="60" textAnchor="middle" className="text-[9px] fill-rose-600 font-bold">VSTUP 1.1</text>
            </g>

            {/* ================================================================= */}
            {/* 5. FURNITURE & FIXTURES (TOGGLEABLE)                             */}
            {/* ================================================================= */}
            {showFurniture && (
              <g id="furniture" className="pointer-events-none transition-opacity duration-200">
                {/* ----------------- KOUPELNA EN-SUITE (6.1 m²) ----------------- */}
                {/* Walk-in Shower Top-Left */}
                <rect x="116" y="86" width="60" height="55" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
                <line x1="116" y1="86" x2="176" y2="141" stroke="#cbd5e1" strokeWidth="0.8" />
                <circle cx="146" cy="113" r="4" fill="#64748b" />
                <path d="M176,86 L176,141" stroke="#0284c7" strokeWidth="1.8" />

                {/* Bathtub Bottom-Left (180x80) */}
                <rect x="116" y="155" width="95" height="58" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <rect x="122" y="161" width="83" height="46" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="132" cy="184" r="3.5" fill="#64748b" />

                {/* Toilet on Top Wall */}
                <rect x="270" y="86" width="30" height="14" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                <path d="M273,100 C273,122 297,122 297,100 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />

                {/* Washbasin Vanity on Right Wall */}
                <rect x="295" y="135" width="28" height="50" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <ellipse cx="308" cy="160" rx="10" ry="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="316" cy="160" r="2.5" fill="#64748b" />

                {/* Radiator Ladder */}
                <rect x="220" y="195" width="28" height="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="225" y1="195" x2="225" y2="203" stroke="#64748b" strokeWidth="0.8" />
                <line x1="230" y1="195" x2="230" y2="203" stroke="#64748b" strokeWidth="0.8" />
                <line x1="235" y1="195" x2="235" y2="203" stroke="#64748b" strokeWidth="0.8" />
                <line x1="240" y1="195" x2="240" y2="203" stroke="#64748b" strokeWidth="0.8" />

                {/* ----------------- ŠATNA (4.5 m²) ----------------- */}
                {/* Left Wardrobe Rack */}
                <rect x="114" y="232" width="38" height="132" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <line x1="133" y1="232" x2="133" y2="364" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                {/* Hanger marks */}
                {[245, 270, 295, 320, 345].map((y) => (
                  <path key={`hang-l-${y}`} d={`M120,${y} L133,${y - 4} L146,${y}`} fill="none" stroke="#64748b" strokeWidth="0.8" />
                ))}

                {/* Right Wardrobe Rack */}
                <rect x="228" y="232" width="38" height="132" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <line x1="247" y1="232" x2="247" y2="364" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                {[245, 270, 295, 320, 345].map((y) => (
                  <path key={`hang-r-${y}`} d={`M234,${y} L247,${y - 4} L260,${y}`} fill="none" stroke="#64748b" strokeWidth="0.8" />
                ))}

                {/* Central Corridor dimension 1400 */}
                <line x1="152" y1="298" x2="228" y2="298" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="190" y="294" textAnchor="middle" className="text-[8px] fill-blue-600 font-mono font-medium">1400</text>

                {/* ----------------- LOŽNICE (16.2 m²) ----------------- */}
                {/* Double Bed with Pillows and Blanket */}
                <rect x="120" y="385" width="135" height="130" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
                {/* Headboard */}
                <rect x="116" y="385" width="8" height="130" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                {/* 2 Pillows */}
                <rect x="128" y="395" width="32" height="42" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                <rect x="128" y="455" width="32" height="42" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                {/* Folded Blanket */}
                <path d="M175,385 L175,515" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M195,385 L195,515" stroke="#cbd5e1" strokeWidth="1" />

                {/* Nightstands */}
                <rect x="116" y="358" width="22" height="22" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
                <circle cx="127" cy="369" r="3" fill="#cbd5e1" />
                <rect x="116" y="520" width="22" height="18" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
                <circle cx="127" cy="529" r="3" fill="#cbd5e1" />

                {/* TV Wall Console on Right Wall */}
                <rect x="325" y="420" width="12" height="70" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <line x1="331" y1="428" x2="331" y2="482" stroke="#1e293b" strokeWidth="2.5" />

                {/* ----------------- KOUPELNA 5.3 m² ----------------- */}
                {/* Walk-in Shower Top-Left */}
                <rect x="340" y="86" width="60" height="55" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
                <line x1="340" y1="86" x2="400" y2="141" stroke="#cbd5e1" strokeWidth="0.8" />
                <circle cx="370" cy="113" r="4" fill="#64748b" />
                <path d="M400,86 L400,141" stroke="#0284c7" strokeWidth="1.8" />

                {/* Washbasin on Left Wall */}
                <rect x="340" y="152" width="26" height="42" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <ellipse cx="353" cy="173" rx="9" ry="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="345" cy="173" r="2.5" fill="#64748b" />

                {/* Washing Machine Niche (1260) */}
                <rect x="475" y="86" width="55" height="42" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="502" cy="107" r="14" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" />
                <circle cx="502" cy="107" r="9" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="484" cy="94" r="2" fill="#64748b" />
                <text x="502" y="138" textAnchor="middle" className="text-[7.5px] fill-slate-500 font-mono">1260</text>

                {/* ----------------- WC 2.1 m² ----------------- */}
                <rect x="480" y="150" width="28" height="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                <path d="M482,162 C482,185 506,185 506,162 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                {/* Small washbasin on right wall */}
                <rect x="518" y="195" width="14" height="24" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
                <ellipse cx="525" cy="207" rx="5" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />

                {/* ----------------- POKOJ 13.9 m² ----------------- */}
                {/* Built-in Wardrobe on Left Wall */}
                <rect x="360" y="320" width="30" height="120" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <line x1="375" y1="320" x2="375" y2="440" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                {[335, 360, 385, 410].map((y) => (
                  <path key={`pokoj-w1-${y}`} d={`M365,${y} L375,${y - 4} L385,${y}`} fill="none" stroke="#64748b" strokeWidth="0.8" />
                ))}

                {/* Built-in Wardrobe on Top Wall */}
                <rect x="430" y="312" width="130" height="30" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <line x1="430" y1="327" x2="560" y2="327" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                {[445, 475, 505, 535].map((x) => (
                  <path key={`pokoj-w2-${x}`} d={`M${x},318 L${x + 4},327 L${x},336`} fill="none" stroke="#64748b" strokeWidth="0.8" />
                ))}

                {/* Single Bed in Corner */}
                <rect x="500" y="415" width="65" height="115" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <rect x="506" y="420" width="53" height="26" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="500" y1="465" x2="565" y2="465" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />

                {/* Study Desk with Laptop and Chair under window */}
                <rect x="365" y="495" width="70" height="40" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                {/* Laptop */}
                <rect x="388" y="505" width="24" height="16" rx="1.5" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
                <rect x="392" y="508" width="16" height="10" fill="#0284c7" opacity="0.4" />
                {/* Ergonomic Office Chair */}
                <circle cx="400" cy="480" r="9" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
                <path d="M391,480 A9,9 0 0,0 409,480" fill="none" stroke="#475569" strokeWidth="2.5" />

                {/* ----------------- OBÝVACÍ POKOJ + KK (36.8 m²) ----------------- */}
                {/* Kitchen Counter along Top Wall */}
                <rect x="585" y="86" width="335" height="46" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                {/* Double Sink with Mixer Tap */}
                <rect x="625" y="92" width="46" height="34" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <rect x="629" y="96" width="20" height="26" rx="1.5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.8" />
                <circle cx="639" cy="109" r="2.5" fill="#64748b" />
                {/* Drainer ribs */}
                <line x1="655" y1="99" x2="667" y2="99" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="655" y1="104" x2="667" y2="104" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="655" y1="109" x2="667" y2="109" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="655" y1="114" x2="667" y2="114" stroke="#cbd5e1" strokeWidth="1" />
                {/* Dishwasher & Storage marker */}
                <rect x="690" y="92" width="30" height="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="705" y="112" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">*</text>
                {/* Tall Refrigerator */}
                <rect x="735" y="90" width="36" height="38" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                <text x="753" y="112" textAnchor="middle" className="text-[10px] fill-slate-600 font-bold">*</text>

                {/* Kitchen Island (Ostrůvek) */}
                <rect x="635" y="180" width="80" height="120" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
                {/* 4-Zone Induction Cooktop */}
                <rect x="648" y="195" width="48" height="42" rx="2" fill="#1e293b" />
                <circle cx="660" cy="206" r="6" fill="none" stroke="#ffffff" strokeWidth="1" />
                <circle cx="682" cy="206" r="5" fill="none" stroke="#ffffff" strokeWidth="1" />
                <circle cx="660" cy="225" r="5" fill="none" stroke="#ffffff" strokeWidth="1" />
                <circle cx="682" cy="225" r="6.5" fill="none" stroke="#ffffff" strokeWidth="1" />
                {/* 3 Bar Stools */}
                <circle cx="725" cy="205" r="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
                <circle cx="725" cy="240" r="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
                <circle cx="725" cy="275" r="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />

                {/* Dining Table for 6 persons */}
                <rect x="785" y="185" width="95" height="60" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
                {/* 6 Dining Chairs */}
                {/* Top 3 chairs */}
                <rect x="793" y="168" width="18" height="14" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
                <rect x="823" y="168" width="18" height="14" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
                <rect x="853" y="168" width="18" height="14" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
                {/* Bottom 3 chairs */}
                <rect x="793" y="248" width="18" height="14" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
                <rect x="823" y="248" width="18" height="14" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />
                <rect x="853" y="248" width="18" height="14" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.8" />

                {/* Living Room Area Rug */}
                <rect x="715" y="325" width="155" height="150" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />

                {/* Large L-shaped / 3-seater Sofa */}
                <g id="sofa">
                  {/* Left part */}
                  <rect x="718" y="345" width="46" height="120" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
                  <rect x="720" y="348" width="12" height="114" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
                  {/* Perpendicular / Ottoman part */}
                  <rect x="764" y="345" width="85" height="42" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
                  <rect x="764" y="347" width="83" height="12" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
                  {/* Sofa cushions line */}
                  <line x1="740" y1="390" x2="764" y2="390" stroke="#cbd5e1" strokeWidth="0.8" />
                  <line x1="740" y1="428" x2="764" y2="428" stroke="#cbd5e1" strokeWidth="0.8" />
                  <line x1="805" y1="359" x2="805" y2="387" stroke="#cbd5e1" strokeWidth="0.8" />
                </g>

                {/* Armchair */}
                <rect x="765" y="445" width="40" height="38" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <rect x="765" y="471" width="40" height="12" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />

                {/* Coffee Table */}
                <rect x="780" y="398" width="50" height="36" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <line x1="785" y1="416" x2="825" y2="416" stroke="#f1f5f9" strokeWidth="1" />

                {/* TV Wall Console on Right Facade */}
                <rect x="912" y="365" width="14" height="85" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <line x1="918" y1="375" x2="918" y2="440" stroke="#1e293b" strokeWidth="3" />

                {/* ----------------- TERASA (14.5 m²) ----------------- */}
                {/* Outdoor Lounge Sofa on Left */}
                <rect x="590" y="565" width="48" height="75" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <rect x="592" y="567" width="12" height="71" rx="1.5" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.8" />
                {/* Outdoor Coffee Table */}
                <rect x="650" y="580" width="38" height="45" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />

                {/* Outdoor Dining Table with 4 Chairs */}
                <rect x="800" y="565" width="75" height="50" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                {/* 4 Outdoor Chairs */}
                <rect x="808" y="550" width="22" height="12" rx="2" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
                <rect x="844" y="550" width="22" height="12" rx="2" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
                <rect x="808" y="618" width="22" height="12" rx="2" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
                <rect x="844" y="618" width="22" height="12" rx="2" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
              </g>
            )}

            {/* ================================================================= */}
            {/* 6. ROOM ANNOTATIONS & SIZES (TOGGLEABLE)                          */}
            {/* ================================================================= */}
            {showLabels && (
              <g id="labels" className="pointer-events-none select-none">
                {/* Obývací p. + kk kuchyňským koutem 36.8 m² */}
                <g transform="translate(680, 260)">
                  <rect x="-10" y="-14" width="170" height="32" rx="6" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="75" y="0" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 tracking-tight">Obývací p. + kk</text>
                  <text x="75" y="13" textAnchor="middle" className="text-[10px] font-semibold fill-blue-700">36,8 m²</text>
                </g>

                {/* Ložnice 16.2 m² */}
                <g transform="translate(195, 455)">
                  <rect x="-5" y="-14" width="95" height="32" rx="6" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="42" y="0" textAnchor="middle" className="text-[11px] font-bold fill-slate-800">Ložnice</text>
                  <text x="42" y="13" textAnchor="middle" className="text-[10px] font-semibold fill-blue-700">16,2 m²</text>
                </g>

                {/* Pokoj 13.9 m² */}
                <g transform="translate(425, 410)">
                  <rect x="-5" y="-14" width="85" height="32" rx="6" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="37" y="0" textAnchor="middle" className="text-[11px] font-bold fill-slate-800">Pokoj</text>
                  <text x="37" y="13" textAnchor="middle" className="text-[10px] font-semibold fill-blue-700">13,9 m²</text>
                </g>

                {/* Terasa 14.5 m² */}
                <g transform="translate(715, 635)">
                  <rect x="-5" y="-14" width="95" height="32" rx="6" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="42" y="0" textAnchor="middle" className="text-[11px] font-bold fill-slate-800">Terasa</text>
                  <text x="42" y="13" textAnchor="middle" className="text-[10px] font-semibold fill-blue-700">14,5 m²</text>
                </g>

                {/* Koupelna en-suite 6.1 m² */}
                <g transform="translate(180, 140)">
                  <rect x="-5" y="-13" width="115" height="30" rx="5" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="52" y="-1" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">Koupelna en-suite</text>
                  <text x="52" y="12" textAnchor="middle" className="text-[9.5px] font-semibold fill-blue-700">6,1 m²</text>
                </g>

                {/* Šatna 4.5 m² */}
                <g transform="translate(160, 260)">
                  <rect x="-5" y="-13" width="65" height="30" rx="5" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="27" y="-1" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">Šatna</text>
                  <text x="27" y="12" textAnchor="middle" className="text-[9.5px] font-semibold fill-blue-700">4,5 m²</text>
                </g>

                {/* Koupelna 5.3 m² */}
                <g transform="translate(378, 145)">
                  <rect x="-5" y="-13" width="70" height="30" rx="5" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="30" y="-1" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">Koupelna</text>
                  <text x="30" y="12" textAnchor="middle" className="text-[9.5px] font-semibold fill-blue-700">5,3 m²</text>
                </g>

                {/* WC 2.1 m² */}
                <g transform="translate(485, 218)">
                  <rect x="-5" y="-12" width="45" height="26" rx="4" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="17" y="-1" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-800">WC</text>
                  <text x="17" y="10" textAnchor="middle" className="text-[8.5px] font-semibold fill-blue-700">2,1 m²</text>
                </g>

                {/* Chodba 9.6 m² */}
                <g transform="translate(290, 275)">
                  <rect x="-5" y="-12" width="55" height="26" rx="4" fill="#ffffff" fillOpacity="0.85" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="22" y="-1" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-800">Chodba</text>
                  <text x="22" y="10" textAnchor="middle" className="text-[8.5px] font-semibold fill-blue-700">9,6 m²</text>
                </g>
              </g>
            )}

            {/* ================================================================= */}
            {/* 7. CAD DIMENSION LINES (EXACT BLUEPRINT REPRODUCTION)             */}
            {/* ================================================================= */}
            {showDimensions && (
              <g id="dimensions" className="pointer-events-none select-none text-[9.5px] font-mono fill-slate-600">
                {/* --- TOP DIMENSION CHAIN --- */}
                {/* Dimension line 1: Koupelna en-suite 2000 mm */}
                <line x1="110" y1="36" x2="330" y2="36" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="110" y1="32" x2="110" y2="64" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="330" y1="32" x2="330" y2="64" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="220" y="31" textAnchor="middle">2000</text>

                {/* Dimension line 2: Koupelna + nika 2300 mm */}
                <line x1="336" y1="36" x2="568" y2="36" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="568" y1="32" x2="568" y2="64" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="452" y="31" textAnchor="middle">2300</text>

                {/* Dimension line 3: Obývací pokoj + KK 5660 mm */}
                <line x1="576" y1="36" x2="930" y2="36" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="930" y1="32" x2="930" y2="64" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="753" y="31" textAnchor="middle">5660</text>

                {/* Top overall 6500 mm */}
                <line x1="576" y1="18" x2="930" y2="18" stroke="#334155" strokeWidth="1.2" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <text x="753" y="14" textAnchor="middle" className="font-bold">6500</text>

                {/* --- BOTTOM DIMENSION CHAIN --- */}
                {/* Ložnice 3000 mm */}
                <line x1="110" y1="586" x2="350" y2="586" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="110" y1="556" x2="110" y2="590" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="350" y1="556" x2="350" y2="590" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="230" y="600" textAnchor="middle">3000</text>

                {/* Pokoj 3000 mm */}
                <line x1="356" y1="586" x2="570" y2="586" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="570" y1="556" x2="570" y2="590" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="463" y="600" textAnchor="middle">3000</text>

                {/* Bottom Left Total 7000 mm */}
                <line x1="110" y1="616" x2="570" y2="616" stroke="#334155" strokeWidth="1.2" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="110" y1="586" x2="110" y2="620" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="570" y1="586" x2="570" y2="620" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="340" y="630" textAnchor="middle" className="font-bold">7000</text>

                {/* Terrace Width 6500 mm */}
                <line x1="576" y1="708" x2="930" y2="708" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="576" y1="690" x2="576" y2="712" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="930" y1="690" x2="930" y2="712" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="753" y="722" textAnchor="middle" className="font-bold">6500</text>

                {/* --- LEFT VERTICAL DIMENSION CHAIN --- */}
                {/* 2800 mm Koupelna */}
                <line x1="60" y1="80" x2="60" y2="220" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="56" y1="80" x2="94" y2="80" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="56" y1="220" x2="94" y2="220" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="48" y="155" textAnchor="middle" transform="rotate(-90 48 155)">2800</text>

                {/* 3300 mm Šatna + část */}
                <line x1="60" y1="226" x2="60" y2="370" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="56" y1="370" x2="94" y2="370" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="48" y="300" textAnchor="middle" transform="rotate(-90 48 300)">3300</text>

                {/* 3000 mm Ložnice */}
                <line x1="60" y1="376" x2="60" y2="540" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="56" y1="540" x2="94" y2="540" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="48" y="460" textAnchor="middle" transform="rotate(-90 48 460)">3000</text>

                {/* Total Left 6500 mm */}
                <line x1="36" y1="80" x2="36" y2="540" stroke="#334155" strokeWidth="1.2" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="32" y1="80" x2="60" y2="80" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="32" y1="540" x2="60" y2="540" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="24" y="310" textAnchor="middle" transform="rotate(-90 24 310)" className="font-bold">6500</text>

                {/* --- RIGHT VERTICAL DIMENSION CHAIN --- */}
                {/* 5500 mm living room window */}
                <line x1="970" y1="80" x2="970" y2="540" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="946" y1="80" x2="974" y2="80" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="946" y1="540" x2="974" y2="540" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="982" y="310" textAnchor="middle" transform="rotate(90 982 310)">5500</text>

                {/* 2500 mm Terrace depth */}
                <line x1="970" y1="546" x2="970" y2="690" stroke="#475569" strokeWidth="1" markerStart="url(#cadTick)" markerEnd="url(#cadTick)" />
                <line x1="930" y1="690" x2="974" y2="690" stroke="#94a3b8" strokeWidth="0.6" />
                <text x="982" y="620" textAnchor="middle" transform="rotate(90 982 620)">2500</text>
              </g>
            )}

            {/* ================================================================= */}
            {/* 8. ARCHITECTURAL SCALE BAR & COMPASS NORTH (EXACT LIKE BLUEPRINT) */}
            {/* ================================================================= */}
            <g id="scale-compass" className="pointer-events-none">
              {/* Graphic Scale 1:100 */}
              <g transform="translate(120, 680)">
                <text x="90" y="-8" textAnchor="middle" className="text-[9px] font-mono fill-slate-700 font-bold">MĚŘÍTKO 1:100</text>
                {/* Alternating black/white blocks for 0, 5, 10, 20, 30 */}
                <rect x="0" y="0" width="30" height="4" fill="#0f172a" />
                <rect x="30" y="0" width="30" height="4" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.5" />
                <rect x="60" y="0" width="60" height="4" fill="#0f172a" />
                <rect x="120" y="0" width="60" height="4" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.5" />
                <text x="0" y="14" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">0</text>
                <text x="30" y="14" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">5</text>
                <text x="60" y="14" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">10</text>
                <text x="120" y="14" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">20</text>
                <text x="180" y="14" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">30 m</text>
              </g>

              {/* Compass North Arrow in Bottom-Right */}
              <g transform="translate(480, 680)">
                <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#334155" strokeWidth="1.2" />
                <text x="0" y="-18" textAnchor="middle" className="text-[11px] font-bold fill-blue-700 font-sans">N</text>
                {/* Arrow pointing North */}
                <polygon points="0,-12 4,8 0,4 -4,8" fill="#1e293b" />
                <polygon points="0,-12 -4,8 0,4" fill="#64748b" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Interactive Room Inspection Card when a room is clicked */}
      {selectedSpec ? (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-xs font-bold">
                {selectedSpec.code}
              </span>
              <h4 className="text-base font-bold text-slate-900">{selectedSpec.name}</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">Rozměr: {selectedSpec.dimensions}</span>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-sm">
                {selectedSpec.area.toFixed(1)} m²
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="bg-white/90 rounded-lg p-2.5 border border-blue-100">
              <span className="font-semibold text-slate-900 block mb-1">Typ podlahy dle standardu:</span>
              <span className="text-slate-600">{selectedSpec.flooring}</span>
            </div>

            <div className="bg-white/90 rounded-lg p-2.5 border border-blue-100">
              <span className="font-semibold text-slate-900 block mb-1">Vybavení a stavební řešení:</span>
              <ul className="space-y-1">
                {selectedSpec.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-slate-400" />
          <span>Klikněte na libovolnou místnost ve schématu pro zobrazení technických detailů, povrchů a instalací.</span>
        </div>
      )}
    </div>
  );
};
