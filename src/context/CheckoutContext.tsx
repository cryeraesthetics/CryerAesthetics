import { createContext, useContext, useState, type ReactNode } from 'react';

interface CheckoutValue {
  selectedPlan: 'monthly' | 'annual';
  setSelectedPlan: (p: 'monthly' | 'annual') => void;
}

const CheckoutContext = createContext<CheckoutValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  return <CheckoutContext.Provider value={{ selectedPlan, setSelectedPlan }}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
