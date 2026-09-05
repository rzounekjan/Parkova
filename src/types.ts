export type ApartmentStatus = 'available' | 'reserved' | 'sold';

export type ExteriorType = 'terasa' | 'balkon' | 'předzahrádka' | 'lodžie';

export interface RoomDetail {
  name: string;
  area: number; // in m²
  dimensions?: string;
  type?: 'living' | 'bedroom' | 'bathroom' | 'hall' | 'exterior' | 'storage';
}

export interface Apartment {
  id: string;
  floorNumber: number;
  code: string; // e.g. "4.1"
  name: string; // e.g. "Byt 4.1"
  subtitle: string;
  disposition: string; // e.g. "4+kk", "3+kk", "2+kk", "1+kk"
  totalArea: number; // m²
  interiorArea: number; // m²
  exteriorArea: number; // m²
  exteriorType: ExteriorType;
  orientation: string; // e.g. "Jihozápad (J/Z)"
  price: number; // CZK
  pricePerM2: number;
  status: ApartmentStatus;
  cellarIncluded: boolean;
  cellarArea: number;
  parkingIncluded: boolean;
  parkingSpaces: number;
  energyRating: 'A' | 'B';
  ceilingHeight: string; // e.g. "2,85 m"
  rooms: RoomDetail[];
  highlights: string[];
  description: string;
  floorPlanType: 'penthouse-luxury' | 'family-spacious' | 'cozy-terrace' | 'garden-residence';
}

export interface FloorInfo {
  number: number;
  name: string;
  subtitle: string;
  description: string;
  topPercent: number; // top % in building image
  heightPercent: number; // height % in building image
  apartmentsCount: number;
  availableCount: number;
  priceFrom: number;
  apartments: Apartment[];
}

export interface ReservationFormData {
  apartmentId: string;
  apartmentCode: string;
  fullName: string;
  email: string;
  phone: string;
  financing: 'hypoteka' | 'hotovost' | 'prodej_stavajici';
  visitDate: string;
  visitTime: string;
  consultationNeeded: boolean;
  notes: string;
}

export interface MortgageConfig {
  propertyPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanYears: number;
  interestRate: number; // % annual
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  ltv: number;
}
