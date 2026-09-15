export interface Faq {
  q: string;
  a: string;
}

export interface SkinType {
  id: string;
  name: string;
  tagline: string;
  image: string;
  am: string[];
  pm: string[];
  dos: string[];
  donts: string[];
  faqs: Faq[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  blurb: string;
  url: string;
}

export interface Concern {
  id: string;
  label: string;
}

export interface ShelfPreset {
  id: string;
  name: string;
  active: string;
  activeLabel: string;
}

export interface AppFaq {
  id: string;
  q: string;
  a: string;
}

export interface ConflictRule {
  level: 'avoid' | 'caution';
  why: string;
  fix: string;
}

export interface Tip {
  title: string;
  body: string;
}

export interface LayerStep {
  step: string;
  label: string;
  note: string;
}

export interface Tutorial {
  id: string;
  title: string;
  summary: string;
  amount: string;
  timing: string;
  frequency: string;
  steps: string[];
  avoid: string[];
}

export interface Kit {
  id: string;
  season: string;
  when: string;
  why: string;
  items: string[];
}

export interface Symptom {
  id: 'dryness' | 'redness' | 'breakouts' | 'oiliness';
  label: string;
}

export interface RoutineFlag {
  id: string;
  level: 'avoid' | 'caution' | 'gap';
  title: string;
  products: string;
  why: string;
  fix: string;
}

export interface ShelfEntry {
  id: string;
  name: string;
  active: string;
  activeLabel: string;
}
