// Ported verbatim from project/Cryer Skin Consultation.dc.html
export interface QuizOption { id: string; label: string; desc?: string }
export interface QuizStep {
  key: 'skinType' | 'concerns' | 'goals' | 'products' | 'allergies' | 'medical';
  multi: boolean;
  title: string;
  subtitle: string;
  options: QuizOption[];
  noneId?: string;
  allergyNotes?: boolean;
}

export const SKIN_TYPES: QuizOption[] = [
  { id: 'normal', label: 'Normal', desc: 'Balanced, few concerns' },
  { id: 'dry', label: 'Dry', desc: 'Tight, flaky, or rough' },
  { id: 'oily', label: 'Oily', desc: 'Shiny, prone to breakouts' },
  { id: 'combination', label: 'Combination', desc: 'Oily T-zone, dry cheeks' },
  { id: 'sensitive', label: 'Sensitive', desc: 'Reacts easily, redness-prone' },
];
export const CONCERNS: QuizOption[] = [
  { id: 'acne', label: 'Acne & breakouts' },
  { id: 'aging', label: 'Fine lines & aging' },
  { id: 'hyperpigmentation', label: 'Dark spots & uneven tone' },
  { id: 'redness', label: 'Redness & sensitivity' },
  { id: 'dullness', label: 'Dullness' },
  { id: 'dehydration', label: 'Dehydration' },
];
export const GOALS: QuizOption[] = [
  { id: 'clear', label: 'Clear, even skin' },
  { id: 'glow', label: 'A healthy glow' },
  { id: 'hydration', label: 'Deeper hydration' },
  { id: 'calm', label: 'Calmer, less reactive skin' },
  { id: 'aging', label: 'Softer fine lines' },
];
export const PRODUCTS_USED: QuizOption[] = [
  { id: 'cleanser', label: 'Cleanser' },
  { id: 'toner', label: 'Toner' },
  { id: 'serum', label: 'Serum' },
  { id: 'moisturizer', label: 'Moisturizer' },
  { id: 'spf', label: 'SPF' },
  { id: 'retinol', label: 'Retinol / exfoliant' },
  { id: 'none', label: 'Nothing regularly yet' },
];
export const ALLERGENS: QuizOption[] = [
  { id: 'fragrance', label: 'Fragrance' },
  { id: 'nuts', label: 'Nut oils' },
  { id: 'latex', label: 'Latex' },
  { id: 'salicylates', label: 'Salicylates / aspirin' },
  { id: 'none', label: 'No known allergies' },
];
export const MEDICAL: QuizOption[] = [
  { id: 'eczema', label: 'Eczema or psoriasis' },
  { id: 'rosacea', label: 'Rosacea' },
  { id: 'pregnant', label: 'Pregnant or breastfeeding' },
  { id: 'accutane', label: 'Currently on Accutane / prescription retinoid' },
  { id: 'none', label: 'None of the above' },
];

export const STEPS: QuizStep[] = [
  { key: 'skinType', multi: false, title: "What's your skin type?", subtitle: 'Pick the one that fits most days.', options: SKIN_TYPES },
  { key: 'concerns', multi: true, title: 'What are you noticing?', subtitle: 'Select all that apply.', options: CONCERNS },
  { key: 'goals', multi: true, title: 'What would you like to achieve?', subtitle: 'Select all that apply.', options: GOALS },
  { key: 'products', multi: true, title: "What's in your routine now?", subtitle: 'Select all that apply.', options: PRODUCTS_USED, noneId: 'none' },
  { key: 'allergies', multi: true, title: 'Any allergies or sensitivities?', subtitle: 'Select all that apply.', options: ALLERGENS, noneId: 'none', allergyNotes: true },
  { key: 'medical', multi: true, title: 'Any of these apply to you?', subtitle: 'This helps us keep suggestions safe for you.', options: MEDICAL, noneId: 'none' },
];

export interface Treatment { name: string; desc: string }
export const TREATMENTS: Record<string, Treatment> = {
  redness: { name: 'Calming LED Light Therapy', desc: 'A gentle, no-downtime treatment to soothe reactive, redness-prone skin.' },
  acne: { name: 'HydraFacial + Salicylic Treatment', desc: 'Deep cleanses congested pores and calms active breakouts.' },
  aging: { name: 'Microneedling', desc: 'Stimulates collagen to soften fine lines over a course of sessions.' },
  hyperpigmentation: { name: 'Brightening Chemical Peel', desc: 'Targets dark spots and uneven tone for a clearer finish.' },
  dullness: { name: 'Dermaplaning + HydraFacial', desc: 'Resurfaces and hydrates for an immediate, healthy glow.' },
  dehydration: { name: 'Hydrating HydraFacial', desc: 'Infuses thirsty skin with moisture from the inside out.' },
  default: { name: 'Custom Facial Consultation', desc: "We'll build a treatment plan around your skin in person." },
};
export const PREGNANCY_TREATMENT: Treatment = { name: 'Pregnancy-Safe Hydrating Facial', desc: 'A gentle, pregnancy-safe facial focused on hydration and comfort — no retinoids or strong acids.' };

export interface RecProduct { name: string; reason: string }
export const CONCERN_PRODUCTS: Record<string, RecProduct> = {
  acne: { name: 'Salicylic Acid Cleanser', reason: 'For acne & breakouts' },
  aging: { name: 'Peptide Night Cream', reason: 'For fine lines & aging' },
  hyperpigmentation: { name: 'Vitamin C Serum', reason: 'For dark spots & tone' },
  redness: { name: 'Soothing Aloe Gel', reason: 'For redness & sensitivity' },
  dullness: { name: 'Gentle Exfoliating Toner', reason: 'For dullness' },
  dehydration: { name: 'Hyaluronic Acid Serum', reason: 'For dehydration' },
};
export const SKIN_TYPE_PRODUCTS: Record<string, RecProduct> = {
  dry: { name: 'Ceramide Rich Moisturizer', reason: 'For your dry skin type' },
  oily: { name: 'Oil-Free Gel Moisturizer', reason: 'For your oily skin type' },
  combination: { name: 'Balancing Toner', reason: 'For your combination skin' },
  sensitive: { name: 'Fragrance-Free Calming Cream', reason: 'For your sensitive skin' },
  normal: { name: 'Daily Antioxidant Serum', reason: 'For your normal skin type' },
};
export const PREGNANCY_SWAP: Record<string, boolean> = { aging: true, hyperpigmentation: true, dullness: true };

export interface QuizAnswers {
  skinType: string | null;
  concerns: string[];
  goals: string[];
  products: string[];
  allergies: string[];
  medical: string[];
}

export function computeResults(answers: QuizAnswers) {
  const isPregnant = answers.medical.includes('pregnant');
  const primaryConcern = answers.concerns[0];
  let treatment = TREATMENTS.default;
  if (primaryConcern && TREATMENTS[primaryConcern]) treatment = TREATMENTS[primaryConcern];
  if (isPregnant) treatment = PREGNANCY_TREATMENT;

  const productMap = new Map<string, RecProduct>();
  answers.concerns.forEach((c) => {
    if (isPregnant && PREGNANCY_SWAP[c]) return;
    const p = CONCERN_PRODUCTS[c];
    if (p) productMap.set(p.name, p);
  });
  if (answers.skinType && SKIN_TYPE_PRODUCTS[answers.skinType]) {
    const p = SKIN_TYPE_PRODUCTS[answers.skinType];
    productMap.set(p.name, p);
  }
  productMap.set('Mineral SPF 50', { name: 'Mineral SPF 50', reason: 'Daily protection, every skin type' });
  let products = Array.from(productMap.values());
  if (isPregnant) products = products.filter((p) => !/Retinol|Vitamin C Serum/i.test(p.name));
  return { treatment, products: products.slice(0, 5), isPregnant };
}
