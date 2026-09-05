import { MortgageConfig, MortgageResult } from '../types';

export function calculateMortgage(config: MortgageConfig): MortgageResult {
  const { propertyPrice, downPaymentAmount, loanYears, interestRate } = config;
  
  const loanAmount = Math.max(0, propertyPrice - downPaymentAmount);
  const totalMonths = Math.max(1, loanYears * 12);
  const monthlyRate = (interestRate / 100) / 12;

  let monthlyPayment = 0;
  if (loanAmount <= 0) {
    monthlyPayment = 0;
  } else if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalMonths;
  } else {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const totalPaid = Math.round(monthlyPayment * totalMonths) + downPaymentAmount;
  const totalInterest = Math.max(0, totalPaid - propertyPrice);
  const ltv = propertyPrice > 0 ? Math.round((loanAmount / propertyPrice) * 100) : 0;

  return {
    loanAmount: Math.round(loanAmount),
    monthlyPayment: Math.round(monthlyPayment),
    totalPaid: Math.round(totalPaid),
    totalInterest: Math.round(totalInterest),
    ltv,
  };
}
