import React, { useState } from 'react';
import { Apartment, RoomDetail } from '../types';
import { Maximize2, Layers, Compass, ZoomIn, ZoomOut, RotateCcw, Check, Sparkles } from 'lucide-react';
import floorplanSampleImg from '../assets/images/floorplan_apartment_sample_1788430356800.jpg';
import { GardenResidenceFloorPlan } from './GardenResidenceFloorPlan';

interface FloorPlanViewerProps {
  apartment: Apartment;
}

export const FloorPlanViewer: React.FC<FloorPlanViewerProps> = ({ apartment }) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'vector' | 'blueprint'>('vector');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const isGardenResidence = apartment.code === '1.1' || apartment.floorPlanType === 'garden-residence';

  // SVG floor plan schematic tailored to apartment disposition
  const getRoomColor = (type?: string, isHovered?: boolean) => {
    if (isHovered) return 'fill-blue-100/90 stroke-blue-600 stroke-2';
    switch (type) {
      case 'living':
        return 'fill-blue-50/70 stroke-blue-300/80 stroke-1 hover:fill-blue-100/80';
      case 'bedroom':
        return 'fill-indigo-50/70 stroke-indigo-300/80 stroke-1 hover:fill-indigo-100/80';
      case 'bathroom':
        return 'fill-teal-50/70 stroke-teal-300/80 stroke-1 hover:fill-teal-100/80';
      case 'exterior':
        return 'fill-emerald-50/70 stroke-emerald-300/80 stroke-1 hover:fill-emerald-100/80';
      case 'storage':
        return 'fill-slate-100/70 stroke-slate-300/80 stroke-1 hover:fill-slate-200/80';
      default:
        return 'fill-slate-50/70 stroke-slate-300/80 stroke-1 hover:fill-slate-100/80';
    }
  };

  return (
    <div id="floorplan-viewer-container" className="flex flex-col gap-5">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex bg-white rounded-lg p-0.5 border border-slate-200 text-xs font-medium">
            <button
              id="btn-view-vector"
              onClick={() => setViewMode('vector')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'vector'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interaktivní schéma
            </button>
            <button
              id="btn-view-blueprint"
              onClick={() => setViewMode('blueprint')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'blueprint'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Architektonický výkres
            </button>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 bg-white px-2.5 py-1.5 rounded-md border border-slate-200">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            Orientace: {apartment.orientation}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            id="btn-zoom-out"
            onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.15))}
            className="p-1.5 bg-white rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700"
            title="Oddálit"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-slate-600 w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            id="btn-zoom-in"
            onClick={() => setZoomLevel((prev) => Math.min(1.6, prev + 0.15))}
            className="p-1.5 bg-white rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700"
            title="Přiblížit"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="btn-zoom-reset"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 bg-white rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700"
            title="Resetovat zobrazení"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Floor Plan Graphic Area */}
      {viewMode === 'blueprint' ? (
        <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden min-h-[340px] flex items-center justify-center p-4">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Compass indicator */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center gap-2 text-xs font-medium text-slate-700 shadow-xs z-10">
            <div className="w-4 h-4 relative flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-700 -top-1 absolute">S</span>
              <div className="w-0.5 h-3 bg-blue-600 rounded-full" />
            </div>
            <span>{apartment.orientation}</span>
          </div>

          <div
            className="w-full flex items-center justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={floorplanSampleImg}
              alt={`Půdorys ${apartment.name}`}
              className="max-h-[380px] w-auto object-contain rounded-lg border border-slate-200 shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      ) : isGardenResidence ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-2xs">
          <GardenResidenceFloorPlan
            apartment={apartment}
            activeRoomIndex={activeRoomIndex}
            onSelectRoom={setActiveRoomIndex}
            zoomLevel={zoomLevel}
          />
        </div>
      ) : (
        <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden min-h-[340px] flex items-center justify-center p-4">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Compass indicator */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center gap-2 text-xs font-medium text-slate-700 shadow-xs z-10">
            <div className="w-4 h-4 relative flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-700 -top-1 absolute">S</span>
              <div className="w-0.5 h-3 bg-blue-600 rounded-full" />
            </div>
            <span>{apartment.orientation}</span>
          </div>

          <div
            className="w-full flex items-center justify-center transition-transform duration-200 select-none py-2"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* SVG floor plan with rooms */}
            <svg
              viewBox="0 0 640 400"
              className="w-full max-w-[560px] h-auto drop-shadow-xs"
              style={{ maxHeight: '380px' }}
            >
              {/* Exterior wall boundary */}
              <rect
                x="20"
                y="20"
                width="600"
                height="360"
                rx="6"
                className="fill-slate-100 stroke-slate-400 stroke-[4]"
              />

              {/* Terrace / Balcony / Garden area */}
              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => {
                  const idx = apartment.rooms.findIndex((r) => r.type === 'exterior');
                  if (idx !== -1) setActiveRoomIndex(idx);
                }}
                onMouseLeave={() => setActiveRoomIndex(null)}
              >
                <rect
                  x="30"
                  y="30"
                  width="220"
                  height="110"
                  className={getRoomColor(
                    'exterior',
                    activeRoomIndex ===
                      apartment.rooms.findIndex((r) => r.type === 'exterior')
                  )}
                />
                <line
                  x1="30"
                  y1="30"
                  x2="250"
                  y2="140"
                  className="stroke-emerald-200/50 stroke-1 stroke-dasharray-2"
                />
                <text
                  x="140"
                  y="75"
                  textAnchor="middle"
                  className="text-xs font-bold fill-emerald-900"
                >
                  {apartment.exteriorType.toUpperCase()}
                </text>
                <text
                  x="140"
                  y="95"
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-emerald-700"
                >
                  {apartment.exteriorArea} m²
                </text>
              </g>

              {/* Living Room + Kitchenette */}
              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => {
                  const idx = apartment.rooms.findIndex((r) => r.type === 'living');
                  if (idx !== -1) setActiveRoomIndex(idx);
                }}
                onMouseLeave={() => setActiveRoomIndex(null)}
              >
                <rect
                  x="260"
                  y="30"
                  width="350"
                  height="210"
                  className={getRoomColor(
                    'living',
                    activeRoomIndex ===
                      apartment.rooms.findIndex((r) => r.type === 'living')
                  )}
                />
                {/* Kitchen zone outline */}
                <rect
                  x="480"
                  y="40"
                  width="120"
                  height="50"
                  rx="3"
                  className="fill-blue-100/60 stroke-blue-300 stroke-1 stroke-dashed"
                />
                <text
                  x="540"
                  y="70"
                  textAnchor="middle"
                  className="text-[10px] font-medium fill-blue-900"
                >
                  Kuchyňská linka
                </text>
                <text
                  x="380"
                  y="125"
                  textAnchor="middle"
                  className="text-sm font-bold fill-slate-800"
                >
                  Obývací pokoj + kk
                </text>
                <text
                  x="380"
                  y="148"
                  textAnchor="middle"
                  className="text-xs font-medium fill-slate-600"
                >
                  {apartment.rooms.find((r) => r.type === 'living')?.area || 38} m²
                </text>
              </g>

              {/* Master Bedroom */}
              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => {
                  const idx = apartment.rooms.findIndex((r) => r.type === 'bedroom');
                  if (idx !== -1) setActiveRoomIndex(idx);
                }}
                onMouseLeave={() => setActiveRoomIndex(null)}
              >
                <rect
                  x="30"
                  y="150"
                  width="220"
                  height="150"
                  className={getRoomColor(
                    'bedroom',
                    activeRoomIndex ===
                      apartment.rooms.findIndex((r) => r.type === 'bedroom')
                  )}
                />
                {/* Bed graphic representation */}
                <rect
                  x="80"
                  y="190"
                  width="70"
                  height="80"
                  rx="3"
                  className="fill-blue-100/70 stroke-blue-300 stroke-1"
                />
                <text
                  x="140"
                  y="180"
                  textAnchor="middle"
                  className="text-xs font-bold fill-blue-900"
                >
                  Ložnice
                </text>
                <text
                  x="140"
                  y="285"
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-blue-700"
                >
                  {apartment.rooms.find((r) => r.type === 'bedroom')?.area || 16} m²
                </text>
              </g>

              {/* Bathroom */}
              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => {
                  const idx = apartment.rooms.findIndex((r) => r.type === 'bathroom');
                  if (idx !== -1) setActiveRoomIndex(idx);
                }}
                onMouseLeave={() => setActiveRoomIndex(null)}
              >
                <rect
                  x="260"
                  y="250"
                  width="160"
                  height="120"
                  className={getRoomColor(
                    'bathroom',
                    activeRoomIndex ===
                      apartment.rooms.findIndex((r) => r.type === 'bathroom')
                  )}
                />
                {/* Bathtub */}
                <rect
                  x="275"
                  y="265"
                  width="45"
                  height="70"
                  rx="8"
                  className="fill-teal-100 stroke-teal-300 stroke-1"
                />
                <text
                  x="360"
                  y="300"
                  textAnchor="middle"
                  className="text-xs font-bold fill-teal-900"
                >
                  Koupelna
                </text>
                <text
                  x="360"
                  y="320"
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-teal-700"
                >
                  {apartment.rooms.find((r) => r.type === 'bathroom')?.area || 6} m²
                </text>
              </g>

              {/* Entrance Hall */}
              <g
                className="cursor-pointer transition-all"
                onMouseEnter={() => {
                  const idx = apartment.rooms.findIndex((r) => r.type === 'hall');
                  if (idx !== -1) setActiveRoomIndex(idx);
                }}
                onMouseLeave={() => setActiveRoomIndex(null)}
              >
                <rect
                  x="430"
                  y="250"
                  width="180"
                  height="120"
                  className={getRoomColor(
                    'hall',
                    activeRoomIndex ===
                      apartment.rooms.findIndex((r) => r.type === 'hall')
                  )}
                />
                <text
                  x="520"
                  y="300"
                  textAnchor="middle"
                  className="text-xs font-bold fill-slate-800"
                >
                  Předsíň / Hala
                </text>
                <text
                  x="520"
                  y="320"
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-slate-600"
                >
                  {apartment.rooms.find((r) => r.type === 'hall')?.area || 8} m²
                </text>
                {/* Entrance door marker */}
                <polygon
                  points="605,300 618,310 618,290"
                  className="fill-blue-600"
                />
                <text
                  x="575"
                  y="295"
                  textAnchor="middle"
                  className="text-[9px] font-bold fill-blue-700"
                >
                  VSTUP
                </text>
              </g>

              {/* Room Divider Lines */}
              <line x1="260" y1="30" x2="260" y2="370" className="stroke-slate-400 stroke-2" />
              <line x1="30" y1="140" x2="260" y2="140" className="stroke-slate-400 stroke-2" />
              <line x1="260" y1="240" x2="610" y2="240" className="stroke-slate-400 stroke-2" />
              <line x1="430" y1="250" x2="430" y2="370" className="stroke-slate-400 stroke-2" />
            </svg>
          </div>
        </div>
      )}

      {/* Room Dimensions Breakdown Table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            Výměry jednotlivých místností
          </h4>
          <span className="text-xs text-slate-500">
            Najetím na místnost zvýrazníte její polohu
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {apartment.rooms.map((room, idx) => {
            const isHovered = activeRoomIndex === idx;
            return (
              <div
                key={room.name}
                id={`room-item-${idx}`}
                onClick={() => setActiveRoomIndex(activeRoomIndex === idx ? null : idx)}
                onMouseEnter={() => setActiveRoomIndex(idx)}
                onMouseLeave={() => {}}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">{room.name}</span>
                  {room.dimensions && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {room.dimensions}
                    </span>
                  )}
                </div>
                <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  {room.area} m²
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
