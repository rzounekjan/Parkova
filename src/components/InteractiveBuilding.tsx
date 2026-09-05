import React, { useState } from 'react';
import { FloorInfo } from '../types';
import { FLOORS_DATA, formatPrice } from '../data/residenceData';
import buildingPhoto from '../assets/images/modern_building_4floors_1788430330664.jpg';
import {
  Building2,
  MousePointerClick,
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface InteractiveBuildingProps {
  selectedFloorNumber: number;
  onSelectFloor: (floorNumber: number) => void;
  hoveredFloorNumber: number | null;
  onHoverFloor: (floorNumber: number | null) => void;
}

export const InteractiveBuilding: React.FC<InteractiveBuildingProps> = ({
  selectedFloorNumber,
  onSelectFloor,
  hoveredFloorNumber,
  onHoverFloor,
}) => {
  // Active floor is hovered floor if hovered, otherwise selected floor
  const currentFloorNumber = hoveredFloorNumber ?? selectedFloorNumber;

  return (
    <div id="interactive-building-container" className="flex flex-col gap-3">
      {/* Top instruction banner */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Interaktivní model budovy</span>
          <span className="hidden sm:inline text-slate-400 font-normal">
            — najeďte myší na libovolné podlaží
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 font-medium">
          <MousePointerClick className="w-3.5 h-3.5 text-blue-600" />
          <span>Vyberte podlaží na fotografii</span>
        </div>
      </div>

      {/* Building Image Container with 4 Floor Hotspots */}
      <div
        id="building-interactive-stage"
        className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-300/80 bg-slate-950 aspect-4/3 sm:aspect-16/10 group select-none"
      >
        {/* Base Photo */}
        <img
          src={buildingPhoto}
          alt="Rezidence Parková - Pohled na 4 podlažní dům"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          referrerPolicy="no-referrer"
        />

        {/* Ambient subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* 4 Interactive Floor Layers */}
        {FLOORS_DATA.map((floor) => {
          const isSelected = selectedFloorNumber === floor.number;
          const isHovered = hoveredFloorNumber === floor.number;
          const isActive = currentFloorNumber === floor.number;

          return (
            <div
              key={floor.number}
              id={`building-floor-zone-${floor.number}`}
              style={{
                top: `${floor.topPercent}%`,
                height: `${floor.heightPercent}%`,
              }}
              onMouseEnter={() => onHoverFloor(floor.number)}
              onMouseLeave={() => onHoverFloor(null)}
              onClick={() => onSelectFloor(floor.number)}
              className={`absolute left-0 right-0 cursor-pointer transition-all duration-200 z-10 ${
                isActive
                  ? 'border-y-2 border-blue-400 shadow-md'
                  : 'border-y border-white/20 hover:border-blue-300/80'
              }`}
            >
              {/* 30% Semi-Transparent Overlay specified by user */}
              <div
                className={`w-full h-full transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600/30 backdrop-brightness-105'
                    : 'bg-transparent hover:bg-blue-500/30'
                }`}
              />

              {/* Floating Floor Tag Marker on the Left */}
              <div
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none flex items-center gap-2 ${
                  isActive
                    ? 'scale-100 opacity-100'
                    : 'scale-95 opacity-80 group-hover:opacity-100'
                }`}
              >
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-md transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold border border-blue-400'
                      : 'bg-slate-900/85 backdrop-blur-xs text-white text-xs border border-white/20'
                  }`}
                >
                  <span className="font-extrabold text-xs sm:text-sm font-mono">
                    {floor.number}. NP
                  </span>
                  <span className="hidden sm:inline text-xs font-medium">
                    {floor.number === 4
                      ? 'Penthouse'
                      : floor.number === 1
                      ? 'Předzahrádky'
                      : 'Bytové patro'}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      isActive
                        ? 'bg-slate-950 text-blue-300'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {floor.availableCount} volné
                  </span>
                </div>
              </div>

              {/* Price badge indicator on the Right (appears when active or hovered) */}
              <div
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none hidden sm:flex items-center gap-1.5 ${
                  isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2'
                }`}
              >
                <div className="bg-slate-950/90 backdrop-blur-xs text-white px-3 py-1 rounded-lg border border-blue-400/40 text-xs shadow-lg flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-300">Ceny od:</span>
                  <span className="font-bold text-blue-400 font-mono">
                    {formatPrice(floor.priceFrom)}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Corner Watermark / Location Tag */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white px-3 py-1 rounded-md text-[11px] border border-white/10 pointer-events-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Rezidence Parková, Praha 6 • 4 Podlaží</span>
        </div>
      </div>

      {/* Floor Quick Selector Buttons (Great for accessibility & mobile tapping) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {FLOORS_DATA.map((floor) => {
          const isSelected = selectedFloorNumber === floor.number;
          const isHovered = hoveredFloorNumber === floor.number;
          const isActive = currentFloorNumber === floor.number;

          return (
            <button
              key={floor.number}
              type="button"
              id={`floor-button-${floor.number}`}
              onClick={() => onSelectFloor(floor.number)}
              onMouseEnter={() => onHoverFloor(floor.number)}
              onMouseLeave={() => onHoverFloor(null)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-blue-50 border-blue-500 shadow-xs ring-2 ring-blue-500'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-sm text-slate-900">
                  {floor.number}. NP
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {floor.availableCount} volné
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {floor.number === 4
                  ? 'Střešní terasy'
                  : floor.number === 1
                  ? 'Předzahrádky'
                  : 'Balkony & lodžie'}
              </p>
              <span className="text-[11px] font-semibold text-slate-800 font-mono block mt-1">
                od {formatPrice(floor.priceFrom)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
