export type ProductRec = {
  category: string;
  lookFor: string;
};

export type SkinTypeData = {
  slug: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  traits: string[];
  regimen: {
    am: string[];
    pm: string[];
    weekly: string[];
  };
  dos: string[];
  donts: string[];
  faqs: { question: string; answer: string }[];
  products: ProductRec[];
};

export const skinTypes: SkinTypeData[] = [
  {
    slug: "normal",
    name: "Normal Skin",
    image: "/images/skin-types/normal.svg",
    tagline: "Balanced, resilient, and low-maintenance.",
    description:
      "Normal skin has balanced oil and moisture levels, small pores, an even tone, and few sensitivities. The focus is on maintaining that balance rather than correcting a specific concern.",
    traits: [
      "Few breakouts and minimal shine by midday",
      "Small, barely visible pores",
      "Even texture and tone with a healthy glow",
      "Rarely feels tight or overly oily",
    ],
    regimen: {
      am: [
        "Rinse with a gentle, pH-balanced cleanser",
        "Apply an antioxidant serum (vitamin C)",
        "Lightweight, hydrating moisturizer",
        "Broad-spectrum SPF 30+ every single day",
      ],
      pm: [
        "Double cleanse if wearing makeup/SPF",
        "Alternate nights: gentle exfoliating treatment",
        "Hydrating serum or essence",
        "Nourishing night moisturizer",
      ],
      weekly: [
        "1–2x gentle exfoliation (chemical preferred over physical)",
        "1x hydrating or brightening mask",
      ],
    },
    dos: [
      "Keep your routine simple and consistent",
      "Wear SPF daily, even indoors and in winter",
      "Introduce actives (retinol, vitamin C) slowly to maintain balance",
      "Stay hydrated and keep a stable sleep schedule",
    ],
    donts: [
      "Don't over-exfoliate just because your skin can 'handle it'",
      "Don't skip moisturizer thinking your skin doesn't need it",
      "Don't constantly switch products — consistency preserves balance",
      "Don't forget reapplying SPF during sun exposure",
    ],
    faqs: [
      {
        question: "Do I still need a full routine if my skin looks fine?",
        answer:
          "Yes. 'Normal' skin stays balanced because of consistent care, sun protection, and healthy habits — not because it needs nothing.",
      },
      {
        question: "Can normal skin become oily or dry over time?",
        answer:
          "Yes — hormones, climate, aging, and products can shift your skin type. Reassess with our Skin Analysis every few months.",
      },
      {
        question: "How often should I exfoliate?",
        answer:
          "1–2 times per week is usually enough to maintain smooth texture without disrupting your skin barrier.",
      },
    ],
    products: [
      { category: "Gentle Gel or Cream Cleanser", lookFor: "Sulfate-free, pH-balanced, non-stripping" },
      { category: "Vitamin C Serum", lookFor: "Stabilized antioxidant to protect and brighten" },
      { category: "Lightweight Daily Moisturizer", lookFor: "Hydrating without feeling heavy" },
      { category: "Broad-Spectrum SPF 30+", lookFor: "Daily wear, non-greasy finish" },
      { category: "Gentle Weekly Exfoliant", lookFor: "Low-strength AHA/BHA or enzyme formula" },
    ],
  },
  {
    slug: "oily",
    name: "Oily Skin",
    image: "/images/skin-types/oily.svg",
    tagline: "Shine-prone, breakout-prone, and needs oil balance.",
    description:
      "Oily skin produces excess sebum, especially in the T-zone, leading to visible shine, enlarged pores, and a higher likelihood of clogged pores and breakouts.",
    traits: [
      "Noticeable shine within a few hours of cleansing",
      "Enlarged, visible pores, especially on nose/forehead",
      "Prone to blackheads, whiteheads, and breakouts",
      "Makeup tends to slide off or fade faster",
    ],
    regimen: {
      am: [
        "Gel or foaming cleanser to remove overnight oil",
        "Alcohol-free toner to balance pH",
        "Lightweight, oil-free moisturizer (yes — still needed)",
        "Oil-free, matte-finish SPF 30+",
      ],
      pm: [
        "Double cleanse to remove sunscreen/makeup/oil buildup",
        "BHA (salicylic acid) treatment 3–4x per week",
        "Oil-free moisturizer or gel hydrator",
        "Spot treatment on active breakouts only",
      ],
      weekly: [
        "1–2x clay mask to absorb excess oil",
        "1x gentle exfoliation to prevent clogged pores",
      ],
    },
    dos: [
      "Use oil-free, non-comedogenic products",
      "Still moisturize — dehydrated skin can overproduce oil",
      "Use salicylic acid (BHA) to keep pores clear",
      "Blot midday shine instead of over-washing",
    ],
    donts: [
      "Don't skip moisturizer or over-cleanse — it backfires",
      "Don't use heavy, oil-based creams or thick balms",
      "Don't pick or squeeze breakouts — it causes scarring",
      "Don't use harsh alcohol-based products that strip the skin",
    ],
    faqs: [
      {
        question: "Why is my skin oily but still gets dry patches?",
        answer:
          "That's likely combination skin or dehydration — oily skin lacking water, not oil. See our Combination profile or ask in your quiz results.",
      },
      {
        question: "Should I skip moisturizer since my skin is already oily?",
        answer:
          "No. Skipping moisturizer can trigger your skin to produce even more oil to compensate. Use a lightweight, oil-free formula instead.",
      },
      {
        question: "What ingredient helps oily skin most?",
        answer:
          "Salicylic acid (BHA) is a go-to — it penetrates oil-clogged pores and helps regulate breakouts over time.",
      },
    ],
    products: [
      { category: "Foaming or Gel Cleanser", lookFor: "Oil-control, non-stripping formula" },
      { category: "BHA (Salicylic Acid) Treatment", lookFor: "2% concentration, leave-on formula" },
      { category: "Oil-Free Gel Moisturizer", lookFor: "Lightweight, non-comedogenic" },
      { category: "Mattifying SPF", lookFor: "Oil-free, broad-spectrum SPF 30+" },
      { category: "Clarifying Clay Mask", lookFor: "Kaolin or bentonite clay, weekly use" },
    ],
  },
  {
    slug: "dry",
    name: "Dry Skin",
    image: "/images/skin-types/dry.svg",
    tagline: "Needs deep hydration and barrier support.",
    description:
      "Dry skin produces less natural oil, often feeling tight, flaky, or rough. It's more prone to fine lines and can be more reactive without proper barrier support.",
    traits: [
      "Feels tight, especially after cleansing",
      "Visible flaking or rough texture",
      "Fine lines may appear more noticeable",
      "Rarely shiny, can look dull",
    ],
    regimen: {
      am: [
        "Cream or oil-based gentle cleanser (no foaming/stripping)",
        "Hydrating essence or serum with hyaluronic acid",
        "Rich, barrier-repairing moisturizer",
        "Hydrating SPF 30+ (look for added ceramides)",
      ],
      pm: [
        "Gentle cleanse (or micellar water if minimal makeup)",
        "Hydrating/repair serum (hyaluronic acid, ceramides)",
        "Rich night cream or facial oil",
        "Occasional occlusive layer (e.g., balm) to lock in moisture",
      ],
      weekly: [
        "1x gentle hydrating mask",
        "Avoid frequent exfoliation — 1x max with a mild formula",
      ],
    },
    dos: [
      "Layer hydrating products (serum → cream → oil/balm)",
      "Look for ceramides, hyaluronic acid, and squalane",
      "Use a humidifier in dry climates or winter months",
      "Apply moisturizer to damp skin to lock in water",
    ],
    donts: [
      "Don't use hot water — it strips natural oils further",
      "Don't over-exfoliate or use harsh acids frequently",
      "Don't skip SPF thinking dryness means less sun sensitivity",
      "Don't use alcohol-heavy toners or astringents",
    ],
    faqs: [
      {
        question: "Is dry skin the same as dehydrated skin?",
        answer:
          "No — dry skin lacks oil (a skin type), while dehydrated skin lacks water (a temporary condition any skin type can experience).",
      },
      {
        question: "Can I still use active ingredients like retinol?",
        answer:
          "Yes, but start slowly (1–2x per week) and always follow with a rich moisturizer to avoid irritation.",
      },
      {
        question: "Why does my skin feel tight after washing?",
        answer:
          "You may be using a cleanser that's too stripping. Switch to a cream or oil-based cleanser that doesn't disrupt your barrier.",
      },
    ],
    products: [
      { category: "Cream or Oil Cleanser", lookFor: "Non-foaming, hydrating base" },
      { category: "Hyaluronic Acid Serum", lookFor: "Multi-weight HA for deep hydration" },
      { category: "Ceramide-Rich Moisturizer", lookFor: "Barrier-repair formula" },
      { category: "Facial Oil or Balm", lookFor: "Squalane, jojoba, or rosehip oil" },
      { category: "Hydrating SPF", lookFor: "SPF 30+ with added moisturizing agents" },
    ],
  },
  {
    slug: "combination",
    name: "Combination Skin",
    image: "/images/skin-types/combination.svg",
    tagline: "Oily T-zone, drier cheeks — needs zone-specific care.",
    description:
      "Combination skin has an oily T-zone (forehead, nose, chin) paired with normal-to-dry cheeks. It often requires balancing products or multi-step routines tailored to each zone.",
    traits: [
      "Shiny T-zone by midday, but normal or dry cheeks",
      "Pores appear larger in the center of the face",
      "May experience breakouts in T-zone, flaking on cheeks",
      "Skin needs vary seasonally",
    ],
    regimen: {
      am: [
        "Gentle gel cleanser for balanced cleansing",
        "Lightweight hydrating serum (all over)",
        "Oil-free moisturizer on T-zone, richer cream on cheeks",
        "Broad-spectrum SPF 30+",
      ],
      pm: [
        "Double cleanse if wearing makeup/SPF",
        "BHA treatment on T-zone only, 2–3x per week",
        "Hydrating serum all over",
        "Zone-specific moisturizer (light on T-zone, rich on cheeks)",
      ],
      weekly: [
        "1x clay mask on T-zone only",
        "1x hydrating mask on cheeks/dry areas",
      ],
    },
    dos: [
      "Multi-mask: clay on the T-zone, hydrating mask on cheeks",
      "Use lightweight hydration everywhere, richer cream only where dry",
      "Reassess your routine seasonally — combination skin shifts with weather",
      "Spot-treat the T-zone rather than treating the whole face the same",
    ],
    donts: [
      "Don't use one heavy product across your whole face",
      "Don't strip the T-zone with harsh products — it can trigger more oil",
      "Don't ignore your cheeks' need for hydration",
      "Don't assume your combination pattern never changes",
    ],
    faqs: [
      {
        question: "Should I use two different moisturizers?",
        answer:
          "Many people with combination skin do use a lighter, oil-free formula on the T-zone and a richer cream on the cheeks — it's a great approach.",
      },
      {
        question: "Why does my skin change with the seasons?",
        answer:
          "Humidity and temperature affect oil production. Combination skin is especially sensitive to these shifts, so adjust products seasonally.",
      },
      {
        question: "Can I use the same routine as oily or dry skin?",
        answer:
          "Not exactly — combination skin benefits most from a zone-specific approach rather than a routine built for a single skin type.",
      },
    ],
    products: [
      { category: "Balancing Gel Cleanser", lookFor: "Gentle, non-drying formula" },
      { category: "Lightweight Hydrating Serum", lookFor: "Hyaluronic acid, niacinamide" },
      { category: "Dual-Zone Moisturizer Pairing", lookFor: "Oil-free gel + richer cream" },
      { category: "T-Zone BHA Treatment", lookFor: "Targeted salicylic acid formula" },
      { category: "Multi-Masking Duo", lookFor: "Clay mask + hydrating mask" },
    ],
  },
  {
    slug: "sensitive",
    name: "Sensitive Skin",
    image: "/images/skin-types/sensitive.svg",
    tagline: "Reactive skin that needs gentle, minimal-ingredient care.",
    description:
      "Sensitive skin reacts easily to products, weather, or environmental triggers with redness, itching, burning, or dryness. The priority is a gentle, minimal, fragrance-free routine.",
    traits: [
      "Redness or flushing that comes and goes",
      "Stinging or burning with new products",
      "May react to fragrance, alcohol, or certain actives",
      "Can overlap with conditions like rosacea or eczema",
    ],
    regimen: {
      am: [
        "Fragrance-free, gentle cream cleanser (or water rinse only)",
        "Soothing serum (centella asiatica, oat, panthenol)",
        "Simple, barrier-supporting moisturizer",
        "Mineral SPF 30+ (zinc oxide/titanium dioxide)",
      ],
      pm: [
        "Gentle cleanse — avoid hot water",
        "Calming serum or essence",
        "Fragrance-free moisturizer or barrier repair cream",
        "Patch-test any new product for 48 hours before full use",
      ],
      weekly: [
        "Avoid physical exfoliation; skip or use very mild enzyme option only if tolerated",
        "1x soothing, fragrance-free mask if needed",
      ],
    },
    dos: [
      "Patch-test every new product on your inner arm first",
      "Choose fragrance-free, minimal-ingredient formulas",
      "Use mineral (physical) sunscreen over chemical filters",
      "Introduce one new product at a time, and wait 1–2 weeks",
    ],
    donts: [
      "Don't layer multiple new actives at once",
      "Don't use physical scrubs or harsh exfoliating tools",
      "Don't use hot water or very cold weather without added protection",
      "Don't ignore persistent redness — consider a dermatologist consult",
    ],
    faqs: [
      {
        question: "Is sensitive skin the same as having rosacea?",
        answer:
          "Not necessarily — sensitive skin is a reactivity pattern, while rosacea is a diagnosed medical condition. If redness is persistent, consult a dermatologist.",
      },
      {
        question: "What ingredients should I avoid?",
        answer:
          "Common triggers include fragrance, essential oils, alcohol denat, and high concentrations of acids or retinoids. Always patch-test.",
      },
      {
        question: "Can sensitive skin still use active ingredients?",
        answer:
          "Yes, gently — look for lower concentrations, buffered formulas, and introduce actives slowly, one at a time.",
      },
    ],
    products: [
      { category: "Fragrance-Free Cream Cleanser", lookFor: "Minimal ingredient list, no essential oils" },
      { category: "Calming Serum", lookFor: "Centella asiatica, oat extract, or panthenol" },
      { category: "Barrier Repair Moisturizer", lookFor: "Ceramides, no fragrance/dyes" },
      { category: "Mineral SPF", lookFor: "Zinc oxide or titanium dioxide based" },
      { category: "Soothing Mask", lookFor: "Fragrance-free, hydrating and calming" },
    ],
  },
];

export function getSkinType(slug: string) {
  return skinTypes.find((s) => s.slug === slug);
}
