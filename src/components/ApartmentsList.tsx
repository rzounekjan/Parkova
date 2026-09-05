import React from 'react';
import { FloorInfo, Apartment } from '../types';
import { formatPrice, formatNumber } from '../data/residenceData';
import {
  Building,
  Layers,
  Compass,
  ArrowRight,
  Calculator,
  Calendar,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ApartmentsListProps {
  floor: FloorInfo;
  onSelectApartment: (apartment: Apartment, tab?: 'plan' | 'mortgage' | 'reservation') => void;
}

export const ApartmentsList: React.FC<ApartmentsListProps> = ({
  floor,
  onSelectApartment,
}) => {
  return (
    <div
      id="apartments-side-window"
      className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between h-full"
    >
      <div>
        {/* Floor Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 bg-slate-900 text-white font-mono font-bold text-xs rounded-md">
                {floor.number}. NP
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {floor.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              {floor.subtitle} • {floor.apartments.length} bytové jednotky
            </p>
          </div>

          <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {floor.availableCount} z {floor.apartments.length} volné
          </span>
        </div>

        {/* List of the 3 Apartments on this floor */}
        <div className="space-y-3.5">
          {floor.apartments.map((apartment) => {
            const isAvailable = apartment.status === 'available';

            return (
              <div
                key={apartment.id}
                id={`apartment-card-${apartment.id}`}
                className="group relative bg-slate-50/90 hover:bg-white border border-slate-200 hover:border-blue-400/80 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
              >
                {/* Top Row: Code, Disposition & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {apartment.code}
                    </span>
                    <span className="text-xs font-bold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded">
                      {apartment.disposition}
                    </span>
                    <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                      {apartment.orientation}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      isAvailable
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}
                  >
                    {isAvailable ? 'Volný' : 'Předrezervováno'}
                  </span>
                </div>

                {/* Name and subtitle */}
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {apartment.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                  {apartment.subtitle}
                </p>

                {/* Area Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-100 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Užitná plocha</span>
                    <span className="font-bold text-slate-800 font-mono">
                      {apartment.interiorArea} m²
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block capitalize">
                      {apartment.exteriorType}
                    </span>
                    <span className="font-bold text-emerald-700 font-mono">
                      {apartment.exteriorArea} m²
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Price and Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Cena vč. DPH</span>
                    <div className="text-base font-extrabold text-blue-600 font-mono">
                      {formatPrice(apartment.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      id={`btn-calc-${apartment.id}`}
                      onClick={() => onSelectApartment(apartment, 'mortgage')}
                      className="p-2 text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-medium transition-colors"
                      title="Spočítat hypotéku"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      id={`btn-detail-${apartment.id}`}
                      onClick={() => onSelectApartment(apartment, 'plan')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                    >
                      <span>Detail & půdorys</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer reassurance */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Každý byt má sklep v ceně</span>
        <span className="text-emerald-700 font-medium">Energetická třída A</span>
      </div>
    </div>
  );
};
