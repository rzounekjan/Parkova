import React, { useState } from 'react';
import { Apartment, ReservationFormData } from '../types';
import { formatPrice, RESIDENCE_INFO } from '../data/residenceData';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  User,
  CreditCard,
  Building,
  FileCheck,
  ShieldCheck,
  Send,
  AlertCircle
} from 'lucide-react';

interface ReservationFormProps {
  apartment: Apartment;
  defaultFinancing?: 'hypoteka' | 'hotovost' | 'prodej_stavajici';
  onSuccess?: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  apartment,
  defaultFinancing = 'hypoteka',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    apartmentId: apartment.id,
    apartmentCode: apartment.code,
    fullName: '',
    email: '',
    phone: '',
    financing: defaultFinancing,
    visitDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    visitTime: '14:00',
    consultationNeeded: true,
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Prosím vyplňte jméno, e-mail i telefon pro potvrzení rezervace.');
      return;
    }
    setErrorMsg('');

    // Generate readable reservation code
    const generatedCode = `REZ-${apartment.code.replace('.', '')}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setReservationCode(generatedCode);
    setIsSubmitted(true);
    if (onSuccess) {
      onSuccess();
    }
  };

  if (isSubmitted) {
    return (
      <div id="reservation-success-box" className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          Rezervace úspěšně odeslána
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Děkujeme za váš zájem o {apartment.name}
        </h3>

        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Vaše nezávazná poptávka byla zaznamenána. Realitní makléř <strong>{RESIDENCE_INFO.broker.name}</strong> vás bude telefonicky kontaktovat do 24 hodin s potvrzením termínu prohlídky a podklady k bytu.
        </p>

        <div className="bg-white rounded-xl border border-emerald-200 p-4 max-w-md mx-auto text-left mb-6 shadow-xs text-xs space-y-2">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Evidenční kód rezervace:</span>
            <span className="font-mono font-bold text-emerald-700">{reservationCode}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Vybraná jednotka:</span>
            <span className="font-semibold text-slate-900">{apartment.name} ({apartment.disposition})</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Kupní cena:</span>
            <span className="font-mono font-semibold text-slate-900">{formatPrice(apartment.price)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Navržený termín prohlídky:</span>
            <span className="font-medium text-slate-800">{formData.visitDate} v {formData.visitTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kontaktní osoba:</span>
            <span className="font-medium text-slate-800">{formData.fullName} ({formData.phone})</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${RESIDENCE_INFO.broker.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            Zavolat makléři ({RESIDENCE_INFO.broker.phone})
          </a>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Upravit údaje rezervace
          </button>
        </div>
      </div>
    );
  }

  return (
    <form id="reservation-form" onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Apartment summary header in form */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shadow-xs font-mono">
            {apartment.code}
          </div>
          <div>
            <div className="font-bold text-slate-900">{apartment.name}</div>
            <div className="text-slate-500">
              {apartment.floorNumber}. NP • {apartment.disposition} • {apartment.interiorArea} m² interiér + {apartment.exteriorArea} m² {apartment.exteriorType}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-500 block">Cena vč. DPH</span>
          <span className="font-bold text-blue-600 font-mono text-sm">
            {formatPrice(apartment.price)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="res-fullname" className="block text-xs font-semibold text-slate-700 mb-1">
            Jméno a příjmení *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              id="res-fullname"
              type="text"
              required
              placeholder="Ing. Petr Novák"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="res-phone" className="block text-xs font-semibold text-slate-700 mb-1">
            Telefonní číslo *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              id="res-phone"
              type="tel"
              required
              placeholder="+420 777 123 456"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label htmlFor="res-email" className="block text-xs font-semibold text-slate-700 mb-1">
            E-mailová adresa *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              id="res-email"
              type="email"
              required
              placeholder="petr.novak@email.cz"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Financing choice */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Preferovaný způsob financování
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: 'hypoteka', label: 'Hypotéční úvěr', desc: 'Srovnání bank & servis' },
            { id: 'hotovost', label: 'Vlastní prostředky', desc: 'Rychlá platba v hotovosti' },
            { id: 'prodej_stavajici', label: 'Prodej jiné nemov.', desc: 'Výměna / dofinancování' },
          ].map((item) => (
            <label
              key={item.id}
              className={`flex flex-col p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                formData.financing === item.id
                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <input
                  type="radio"
                  name="financing-type"
                  value={item.id}
                  checked={formData.financing === item.id}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      financing: item.id as 'hypoteka' | 'hotovost' | 'prodej_stavajici',
                    })
                  }
                  className="accent-blue-600"
                />
                <span className="font-semibold text-slate-800">{item.label}</span>
              </div>
              <span className="text-[11px] text-slate-500 pl-5">{item.desc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Inspection Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-visit-date" className="block text-xs font-semibold text-slate-700 mb-1">
            Preferované datum prohlídky
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              id="res-visit-date"
              type="date"
              value={formData.visitDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="res-visit-time" className="block text-xs font-semibold text-slate-700 mb-1">
            Orientační čas prohlídky
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <select
              id="res-visit-time"
              value={formData.visitTime}
              onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="09:00">Dopoledne (09:00 - 11:00)</option>
              <option value="11:00">Kolem poledne (11:00 - 13:00)</option>
              <option value="14:00">Odpoledne (14:00 - 16:00)</option>
              <option value="17:00">Podvečer (17:00 - 19:00)</option>
              <option value="individual">Dle individuální domluvy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Checkbox for mortgage advisory */}
      <label className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
        <input
          type="checkbox"
          checked={formData.consultationNeeded}
          onChange={(e) => setFormData({ ...formData, consultationNeeded: e.target.checked })}
          className="mt-0.5 accent-blue-600 rounded text-blue-600"
        />
        <span className="text-xs text-slate-700 leading-relaxed">
          Mám zájem o <strong>bezplatné předjednání hypotéky</strong> a prověření bonity u smluvních bank makléře Ondřeje Pornera.
        </span>
      </label>

      {/* Note */}
      <div>
        <label htmlFor="res-notes" className="block text-xs font-semibold text-slate-700 mb-1">
          Poznámka / dotaz pro makléře (volitelné)
        </label>
        <textarea
          id="res-notes"
          rows={2}
          placeholder="Máte specifické požadavky na parkování, čas prohlídky či financování? Napište nám sem..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Trust & Submit */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Nezávazná rezervace • Osobní údaje jsou v bezpečí</span>
        </div>

        <button
          type="submit"
          id="btn-submit-reservation"
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          Odeslat nezávaznou rezervaci
        </button>
      </div>
    </form>
  );
};
