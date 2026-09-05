import React, { useState, useMemo } from 'react';
import { calculateMortgage } from '../utils/mortgage';
import { formatPrice, formatNumber, RESIDENCE_INFO } from '../data/residenceData';
import { Calculator, ShieldCheck, TrendingDown, Clock, HelpCircle, PhoneCall } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice: number;
  apartmentCode: string;
  onApplyForFinancing?: () => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice,
  apartmentCode,
  onApplyForFinancing,
}) => {
  const [price, setPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.89);
  const [fixationYears, setFixationYears] = useState<number>(5);

  const downPaymentAmount = useMemo(() => {
    return Math.round((price * downPaymentPercent) / 100);
  }, [price, downPaymentPercent]);

  const calculation = useMemo(() => {
    return calculateMortgage({
      propertyPrice: price,
      downPaymentPercent,
      downPaymentAmount,
      loanYears,
      interestRate,
    });
  }, [price, downPaymentPercent, downPaymentAmount, loanYears, interestRate]);

  const handlePercentChange = (pct: number) => {
    setDownPaymentPercent(pct);
  };

  const handleDownPaymentAmountChange = (val: number) => {
    const clamped = Math.max(0, Math.min(price, val));
    const newPct = price > 0 ? Math.round((clamped / price) * 100) : 0;
    setDownPaymentPercent(newPct);
  };

  return (
    <div id="mortgage-calculator-root" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Hypoteční kalkulačka pro Byt {apartmentCode}
            </h3>
            <p className="text-xs text-slate-500">
              Spočítejte si orientační měsíční splátku a parametry financování
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
          <TrendingDown className="w-3.5 h-3.5" />
          Sazby od 4,49 % p.a.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Inputs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Kupní cena nemovitosti
              </label>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {formatPrice(price)}
              </span>
            </div>
            <input
              id="input-property-price"
              type="range"
              min={Math.round(initialPrice * 0.7)}
              max={Math.round(initialPrice * 1.4)}
              step={50000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                Vlastní zdroje (akontace)
                <span className="text-slate-400 font-normal">({downPaymentPercent} %)</span>
              </label>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {formatPrice(downPaymentAmount)}
              </span>
            </div>

            <input
              id="input-down-payment-range"
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => handlePercentChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            {/* Quick preset buttons */}
            <div className="flex items-center gap-2 mt-2">
              {[10, 15, 20, 30, 40].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  id={`btn-down-payment-preset-${pct}`}
                  onClick={() => handlePercentChange(pct)}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                    downPaymentPercent === pct
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pct} %
                </button>
              ))}
            </div>
          </div>

          {/* Loan Duration */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Doba splácení
              </label>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {loanYears} let ({loanYears * 12} splátek)
              </span>
            </div>
            <input
              id="input-loan-years"
              type="range"
              min={5}
              max={30}
              step={1}
              value={loanYears}
              onChange={(e) => setLoanYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>5 let</span>
              <span>15 let</span>
              <span>25 let</span>
              <span>30 let</span>
            </div>
          </div>

          {/* Interest Rate & Fixation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Úroková sazba
                </label>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {interestRate.toFixed(2)} % p.a.
                </span>
              </div>
              <input
                id="input-interest-rate"
                type="range"
                min={3.5}
                max={7.5}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Fixace úrokové sazby
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[3, 5, 7, 10].map((fix) => (
                  <button
                    key={fix}
                    type="button"
                    id={`btn-fixation-${fix}`}
                    onClick={() => setFixationYears(fix)}
                    className={`text-xs py-1.5 text-center rounded-md border font-medium transition-colors ${
                      fixationYears === fix
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {fix} {fix === 1 ? 'rok' : fix < 5 ? 'roky' : 'let'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Monthly Summary Card (5 cols) - Slate-900 Professional Polish */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 shadow-lg shadow-blue-900/10 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">
              <span>Odhadovaná měsíční splátka</span>
              <span className="text-blue-400 font-mono">LTV {calculation.ltv} %</span>
            </div>

            <div className="text-3xl font-extrabold text-blue-400 tracking-tight font-mono mb-4">
              {formatPrice(calculation.monthlyPayment)}
              <span className="text-xs font-normal text-slate-400 ml-1.5">/ měs</span>
            </div>

            <div className="space-y-2.5 border-t border-white/10 pt-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Výše hypotéky:</span>
                <span className="font-semibold text-white font-mono">
                  {formatPrice(calculation.loanAmount)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Vlastní zdroje ({downPaymentPercent}%):</span>
                <span className="font-semibold text-white font-mono">
                  {formatPrice(downPaymentAmount)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Úroková sazba:</span>
                <span className="font-semibold text-white font-mono">
                  {interestRate.toFixed(2)} % (fix {fixationYears} let)
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Doba splácení:</span>
                <span className="font-semibold text-white font-mono">
                  {loanYears} let
                </span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-dashed border-white/10">
                <span>Celkem zaplaceno:</span>
                <span className="font-mono text-slate-300">
                  {formatPrice(calculation.totalPaid)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10">
            <div className="bg-white/10 border border-white/10 rounded-lg p-2.5 mb-3 text-[11px] text-slate-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Makléř <strong>Ondřej Porner</strong> zajišťuje bezplatné porovnání nabídek 14 hypotečních bank s garancí nejnižší sazby.
              </span>
            </div>

            {onApplyForFinancing ? (
              <button
                type="button"
                id="btn-apply-mortgage-consult"
                onClick={onApplyForFinancing}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Poptat hypoteční financování k bytu
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
