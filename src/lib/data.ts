// Static content ported verbatim from the Claude Design prototype
// (project/Cryer Aesthetics App.dc.html) so copy stays in sync with what
// was approved in design review.
import type {
  AppFaq,
  Concern,
  ConflictRule,
  Kit,
  LayerStep,
  Product,
  ShelfPreset,
  SkinType,
  Symptom,
  Tip,
  Tutorial,
} from './types';

export const SKIN_TYPES: SkinType[] = [
  {
    id: 'normal', name: 'Normal', tagline: 'Balanced and low-maintenance',
    am: ['Gentle cleanser', 'Antioxidant serum', 'Lightweight moisturizer', 'Mineral SPF 50'],
    pm: ['Gentle cleanser', 'Hydrating serum', 'Night moisturizer'],
    dos: ['Cleanse morning & night', 'Wear SPF daily', 'Exfoliate 1-2x a week', 'Keep routine consistent'],
    donts: ['Skip moisturizer', 'Over-exfoliate', 'Skip SPF on cloudy days', 'Stack too many actives at once'],
    faqs: [
      { q: 'How often should I exfoliate?', a: '1-2 times a week is plenty — more can disrupt your barrier.' },
      { q: 'Do I still need SPF?', a: 'Yes — daily SPF is the single best anti-aging step for every skin type.' },
      { q: 'Can my skin type change?', a: 'Yes — hormones, weather and stress shift skin over time. Retake the quiz periodically.' },
      { q: 'What if I break out occasionally?', a: 'Introduce one gentle treatment product rather than overhauling your whole routine.' },
    ],
  },
  {
    id: 'dry', name: 'Dry', tagline: 'Tight, flaky or rough patches',
    am: ['Cream cleanser', 'Hyaluronic acid serum', 'Ceramide moisturizer', 'Mineral SPF 50'],
    pm: ['Cream cleanser', 'Facial oil', 'Rich night cream'],
    dos: ['Apply moisturizer on damp skin', 'Use a humidifier in dry months', 'Choose cream over gel cleansers', 'Layer a facial oil at night'],
    donts: ['Use hot water to cleanse', 'Use alcohol-based toners', 'Over-exfoliate', 'Skip a heavier night cream'],
    faqs: [
      { q: 'Why does my skin feel tight after cleansing?', a: 'Your cleanser may be too stripping — switch to a cream or oil-based formula.' },
      { q: 'Can dry skin still break out?', a: 'Yes — dehydration can trigger excess oil production and clogged pores.' },
      { q: 'Is facial oil safe daily?', a: 'Yes, a few drops layered over moisturizer at night works well for dry skin.' },
      { q: 'Should I exfoliate at all?', a: 'Gently, once a week, with a hydrating rather than physical scrub formula.' },
    ],
  },
  {
    id: 'oily', name: 'Oily', tagline: 'Shiny, prone to breakouts',
    am: ['Foaming cleanser', 'Niacinamide serum', 'Oil-free gel moisturizer', 'Mineral SPF 50'],
    pm: ['Foaming cleanser', 'Salicylic acid treatment', 'Oil-free moisturizer'],
    dos: ['Cleanse twice daily', 'Use oil-free, non-comedogenic products', 'Introduce salicylic acid gradually', 'Blot instead of over-washing midday'],
    donts: ['Skip moisturizer to control oil', 'Use harsh drying alcohols', 'Over-wash your face', 'Pick at breakouts'],
    faqs: [
      { q: 'Should oily skin still moisturize?', a: 'Yes — skipping it can trigger even more oil production.' },
      { q: 'How do I control midday shine?', a: 'Blotting papers and a mattifying primer work better than washing again.' },
      { q: 'What actives help most?', a: 'Niacinamide and salicylic acid are the two workhorses for oily, breakout-prone skin.' },
      { q: 'Can I use retinol too?', a: 'Yes, once your skin tolerates it — introduce slowly, 2-3 nights a week.' },
    ],
  },
  {
    id: 'combination', name: 'Combination', tagline: 'Oily T-zone, dry cheeks',
    am: ['Balancing cleanser', 'Niacinamide serum', 'Lightweight moisturizer', 'Mineral SPF 50'],
    pm: ['Balancing cleanser', 'Targeted treatment (T-zone)', 'Cream moisturizer (cheeks)'],
    dos: ['Multi-mask by zone if needed', 'Use a balancing toner', 'Moisturize the whole face', 'Adjust routine seasonally'],
    donts: ["Use one product for the whole face if it's not working everywhere", 'Over-treat the T-zone', 'Skip the dry areas', 'Use heavy oils on the T-zone'],
    faqs: [
      { q: 'Can I use two different moisturizers?', a: 'Yes — a lighter gel on the T-zone and a richer cream on the cheeks works well.' },
      { q: 'Why does my skin change with the seasons?', a: 'Combination skin is especially sensitive to humidity and temperature shifts.' },
      { q: 'Is multi-masking worth it?', a: 'Yes, applying different masks to different zones once a week can help balance things.' },
      { q: 'What is the biggest mistake for this skin type?', a: 'Treating the whole face the same way — combination skin needs a zone-based approach.' },
    ],
  },
  {
    id: 'sensitive', name: 'Sensitive', tagline: 'Reacts easily, redness-prone',
    am: ['Fragrance-free cleanser', 'Soothing serum', 'Ceramide moisturizer', 'Mineral SPF 50'],
    pm: ['Fragrance-free cleanser', 'Calming serum', 'Barrier repair cream'],
    dos: ['Patch-test everything new', 'Choose fragrance-free formulas', 'Keep routines simple', 'Use mineral, not chemical, SPF'],
    donts: ['Introduce multiple new products at once', 'Use physical scrubs', 'Use hot water', 'Use products with fragrance or alcohol'],
    faqs: [
      { q: 'How do I patch-test a product?', a: 'Apply a small amount behind your ear or on your inner arm for 2-3 days before using it on your face.' },
      { q: 'Why does my skin flush so easily?', a: 'A compromised barrier makes sensitive skin more reactive to heat, products and weather.' },
      { q: 'Is mineral SPF really better?', a: 'For reactive skin, yes — it tends to cause less irritation than chemical filters.' },
      { q: 'Can sensitive skin use actives?', a: 'Yes, but introduce one at a time, at low strength, and watch for reactions.' },
    ],
  },
];

export const PRODUCTS: Product[] = [
  { id: 'glow-c', name: 'Glow C+ Brightening Serum', price: '$91.00', blurb: 'Plant-active serum that targets uneven tone for a brighter complexion.', url: 'https://greenenvee.com/' },
  { id: 'clear-repair', name: 'Clear Repair Serum', price: '$72.50', blurb: 'Oil-free serum that calms breakouts and controls oil production.', url: 'https://greenenvee.com/' },
  { id: 'ha-collagen', name: 'H.A. Collagen Boosting Serum', price: '$83.00', blurb: 'Hyaluronic acid serum for deep hydration and plumper-looking skin.', url: 'https://greenenvee.com/' },
  { id: 'mandelic', name: 'Mandelic Resurfacing Serum 8%', price: '$81.00', blurb: 'Gentle resurfacing acid for smoother texture and tone.', url: 'https://greenenvee.com/' },
  { id: 'retinal', name: 'Retinal Renewal Complex', price: '$121.00', blurb: 'Advanced liposomal retinaldehyde to firm and renew skin overnight.', url: 'https://greenenvee.com/' },
];

export const NEW_TIPS: Tip[] = [
  { title: 'Start with the basics', body: 'Cleanser, moisturizer, SPF — master these three before adding anything else.' },
  { title: 'Patch-test new products', body: 'A small test behind the ear saves a week of irritation later.' },
  { title: 'Consistency beats intensity', body: 'A simple routine done daily beats an elaborate one done occasionally.' },
  { title: 'Give products time', body: 'Most actives take 4-6 weeks to show visible results — don’t switch too soon.' },
];
export const JOURNEY_TIPS: Tip[] = [
  { title: 'Reassess each season', body: 'Your skin’s needs shift with weather — retake the quiz if something feels off.' },
  { title: 'Rotate, don’t stack', body: 'Alternate strong actives (retinol, acids) across nights rather than layering them all.' },
  { title: 'Protect your results', body: 'Whatever treatment you invest in, daily SPF protects the outcome.' },
  { title: 'Book a check-in', body: 'A quarterly consultation keeps your routine adapting as your skin changes.' },
];

export const CONCERNS: Concern[] = [
  { id: 'acne', label: 'Acne & breakouts' },
  { id: 'hyperpigmentation', label: 'Hyperpigmentation' },
  { id: 'texture', label: 'Texture' },
  { id: 'lines', label: 'Fine lines' },
  { id: 'redness', label: 'Redness' },
  { id: 'dryness', label: 'Dryness' },
  { id: 'pores', label: 'Large pores' },
  { id: 'dullness', label: 'Dullness' },
];

export const SHELF_ITEMS: ShelfPreset[] = [
  { id: 'glow-c', name: 'Glow C+ Brightening Serum', active: 'vitamin-c', activeLabel: 'Vitamin C' },
  { id: 'retinal', name: 'Retinal Renewal Complex', active: 'retinoid', activeLabel: 'Retinaldehyde' },
  { id: 'mandelic', name: 'Mandelic Resurfacing 8%', active: 'aha', activeLabel: 'Mandelic acid (AHA)' },
  { id: 'clear-repair', name: 'Clear Repair Serum', active: 'bha', activeLabel: 'Salicylic acid (BHA)' },
  { id: 'bpo', name: 'Benzoyl peroxide spot gel', active: 'bpo', activeLabel: 'Benzoyl peroxide 5%' },
  { id: 'niacinamide', name: 'Niacinamide 10% Serum', active: 'niacinamide', activeLabel: 'Niacinamide' },
  { id: 'ha-collagen', name: 'H.A. Collagen Serum', active: 'ha', activeLabel: 'Hyaluronic acid' },
  { id: 'spf', name: 'Mineral SPF 50', active: 'spf', activeLabel: 'Zinc oxide' },
];

export const APP_FAQS: AppFaq[] = [
  { id: 'f1', q: 'What do I get with Monthly Basic versus Annual Pro?', a: "Monthly Basic is $7.99 a month and covers the AM/PM regimens for all five skin types, the do's and don'ts, the FAQs and the application guides. Annual Pro is $59.99 a year and adds everything personal: your skin profile, the shelf and routine check, local conditions, the skin diary with progress photos, the ask-a-question feature, reminders and seasonal kits." },
  { id: 'f2', q: 'How do I know which skin type I am?', a: 'Take the skin consultation quiz from the Home screen — it takes about two minutes and sets a starting point. You can change your type any time on the Profile tab of My Skin, and your esthetician will confirm it in person at your first visit.' },
  { id: 'f3', q: 'How does the routine check decide something conflicts?', a: 'It reads the active ingredient behind each product on your shelf, including ones you typed in or added by photo, then compares every pair against known interactions — acids with retinoids, benzoyl peroxide with retinal, vitamin C with acids. It also factors in your skin type and flags gaps, like tracking hyperpigmentation with no daily SPF. Every flag tells you why and what to do instead.' },
  { id: 'f4', q: 'Why did it not recognize a product I added?', a: 'Products are matched by their active ingredient, so a name with no recognizable active gets left out of the conflict check and flagged as unread. Rename it to include the active — for example "CeraVe 10% niacinamide" — and it will be included on the next scan.' },
  { id: 'f5', q: 'Are the answers in Ask about your skin from a real person?', a: 'No. They are generated from your profile — skin type, concerns, products and notes — and are meant for routine questions. Anything that needs to be looked at, or anything involving prescriptions or a medical condition, should come to an in-person consultation instead.' },
  { id: 'f6', q: 'Can I bring my information to a dermatologist?', a: 'Yes. On the More tab of My Skin, Export my skin summary builds a one-page document with your skin type, concerns, every product and its active, your routine timing, flagged interactions and your full diary history. Save it as a PDF or print it.' },
  { id: 'f7', q: 'Do the reminders actually notify my phone?', a: 'Not in this version. You can set the AM and PM times you want and toggle them on, and they are stored with your profile, but real push notifications require the installed app.' },
  { id: 'f8', q: 'Who can see my photos and notes?', a: 'Progress photos, product photos and your notes stay on your device with your profile. Nothing is shared with anyone unless you export the summary or show it at an appointment.' },
  { id: 'f9', q: 'How do I book an appointment?', a: 'Book Now sends you to our booking site, where you can see real availability and reserve instantly. Rescheduling and cancellations happen there too.' },
  { id: 'f10', q: 'How do I cancel my membership?', a: 'Email cryeraesthetics@gmail.com and we will cancel it. Annual Pro runs through the end of the year you paid for; Monthly Basic stops at the end of the current month.' },
];

export const CONFLICTS: Record<string, ConflictRule> = {
  'aha|retinoid': { level: 'avoid', why: 'Both speed up cell turnover. Used in the same session they strip the barrier and cause peeling.', fix: 'Alternate nights — acid one night, retinal the next.' },
  'bha|retinoid': { level: 'avoid', why: 'Salicylic acid plus a retinoid in one session is a common cause of irritation and flaking.', fix: 'Keep them on separate nights.' },
  'bpo|retinoid': { level: 'avoid', why: 'Benzoyl peroxide oxidizes retinaldehyde, cancelling most of its benefit and compounding dryness.', fix: 'BPO in the morning, retinal at night — never layered.' },
  'aha|bha': { level: 'avoid', why: 'Two exfoliating acids in one session over-exfoliates even resilient skin.', fix: 'One acid per night, twice a week at most.' },
  'aha|vitamin-c': { level: 'caution', why: 'Both are low-pH. Together they sting and destabilize the vitamin C.', fix: 'Vitamin C in the AM, acid in the PM.' },
  'bha|vitamin-c': { level: 'caution', why: 'Acid pH interferes with vitamin C and increases sensitivity.', fix: 'Split them across AM and PM.' },
  'retinoid|vitamin-c': { level: 'caution', why: 'A strong pairing for most barriers, especially sensitive skin.', fix: 'Vitamin C in the AM, retinal in the PM.' },
  'bpo|vitamin-c': { level: 'caution', why: 'Benzoyl peroxide can oxidize vitamin C and reduce its effect.', fix: 'Use at opposite ends of the day.' },
};

export const SAFE_ACTIVES = { ha: 1, niacinamide: 1, spf: 1 } as const;

export const ACTIVE_KEYWORDS: { active: string; activeLabel: string; match: string[] }[] = [
  { active: 'retinoid', activeLabel: 'Retinoid', match: ['retinol', 'retinal', 'retinaldehyde', 'tretinoin', 'adapalene', 'retinoid', 'granactive'] },
  { active: 'vitamin-c', activeLabel: 'Vitamin C', match: ['vitamin c', 'vit c', 'ascorbic', 'ascorbate', 'thd'] },
  { active: 'aha', activeLabel: 'AHA', match: ['glycolic', 'lactic', 'mandelic', 'aha', 'peel solution'] },
  { active: 'bha', activeLabel: 'BHA', match: ['salicylic', 'bha', 'beta hydroxy'] },
  { active: 'bpo', activeLabel: 'Benzoyl peroxide', match: ['benzoyl', 'bpo', 'panoxyl'] },
  { active: 'niacinamide', activeLabel: 'Niacinamide', match: ['niacinamide', 'vitamin b3'] },
  { active: 'ha', activeLabel: 'Hyaluronic acid', match: ['hyaluronic', 'ha serum', 'polyglutamic'] },
  { active: 'spf', activeLabel: 'SPF', match: ['spf', 'sunscreen', 'sunblock'] },
];

export const TYPE_CAUTIONS: Record<string, { actives: string[]; why: string; fix: string }> = {
  sensitive: { actives: ['retinoid', 'aha', 'bha', 'bpo'], why: 'You list sensitive skin, and this is one of the actives most likely to trigger stinging and redness on a reactive barrier.', fix: 'Use it twice a week to start, buffered over moisturizer, and stop if redness lingers past a day.' },
  dry: { actives: ['aha', 'bha', 'bpo'], why: 'Dry skin loses water faster, and exfoliating or drying actives compound that.', fix: 'Limit to two nights a week and follow with a ceramide moisturizer.' },
};

export const CONCERN_GAPS: { concern: string; needs: string[]; title: string; why: string; fix: string }[] = [
  { concern: 'hyperpigmentation', needs: ['spf'], title: 'Hyperpigmentation without daily SPF', why: 'Pigment recurs with UV exposure faster than any brightening active can fade it, so the rest of your routine works against itself.', fix: 'Add a mineral SPF 30+ as the last step every morning before adding more brighteners.' },
  { concern: 'dryness', needs: ['ha'], title: 'Dryness with no hydrating layer', why: 'Nothing in your profile holds water in the skin, which is usually why dryness persists even with a rich moisturizer.', fix: 'Add a hyaluronic acid serum on damp skin before your moisturizer.' },
  { concern: 'lines', needs: ['retinoid'], title: 'Fine lines with no retinoid', why: 'Retinoids are the best-evidenced ingredient for fine lines, and your shelf has none.', fix: 'Introduce a low-strength retinal two nights a week and build up slowly.' },
  { concern: 'acne', needs: ['bha', 'bpo', 'retinoid'], title: 'Breakouts with no acne active', why: 'Nothing in your routine targets the clogged pores and bacteria behind breakouts.', fix: 'Add one of salicylic acid, benzoyl peroxide or a retinoid — one at a time, not all three.' },
  { concern: 'dullness', needs: ['vitamin-c', 'aha'], title: 'Dullness with no brightening or exfoliating step', why: 'Dullness is usually surface cell buildup or lack of antioxidant support.', fix: 'Add either a morning vitamin C or a weekly gentle acid — not both on the same day.' },
];

export const LAYER_ORDER: LayerStep[] = [
  { step: '1', label: 'Cleanser', note: 'Lukewarm water, 60 seconds.' },
  { step: '2', label: 'Toner or essence', note: 'Optional — hydrating, not stripping.' },
  { step: '3', label: 'Water-based serum', note: 'Hyaluronic acid on damp skin.' },
  { step: '4', label: 'Niacinamide', note: 'Buffers stronger actives that follow.' },
  { step: '5', label: 'Treatment active', note: 'One per session: acid, retinoid or BPO.' },
  { step: '6', label: 'Moisturizer', note: 'Seals everything underneath.' },
  { step: '7', label: 'Facial oil (PM)', note: 'Always last before bed.' },
  { step: '8', label: 'SPF (AM)', note: 'Two finger-lengths, every morning.' },
];

export const TUTORIALS: Tutorial[] = [
  {
    id: 't5', title: 'Morning double cleanse', summary: 'A lighter version of the night routine, for heavy PM products or oily skin.',
    amount: '1 pump oil or micellar, 1 pump water cleanser', timing: 'AM, before serums', frequency: 'Only when skin feels coated on waking',
    steps: [
      'Decide whether you need it. A morning double cleanse is for skin that wakes up coated — heavy PM occlusives, rich balms, sunscreen slept in, or genuinely oily skin. Normal or dry skin should stick to one gentle cleanse.',
      'On dry skin, warm one pump of oil cleanser or a micellar water on a cotton pad and work it over the face for 30 seconds. Keep it brief; overnight residue lifts much faster than a day of SPF.',
      'Emulsify with a splash of lukewarm water until it turns milky, then rinse fully.',
      'Follow with one pump of a low-foaming water-based cleanser for 20–30 seconds. Concentrate on the T-zone and leave the cheeks mostly alone.',
      'Rinse with lukewarm water and pat dry only partially — leave skin damp for toner and serums.',
      'Check how skin feels 10 minutes later. Tightness or squeaking means the second cleanse was too much; drop back to a single cleanse.',
    ],
    avoid: ['Using a foaming or high-pH cleanser twice in a row', 'Doing this daily on dry or sensitized skin', 'Following it with an exfoliant — the skin is already thoroughly cleared'],
  },
  {
    id: 't6', title: 'Applying toner', summary: 'A hydrating step, not an astringent one — applied to damp skin.',
    amount: 'A 10p-sized pool in the palm, or 2 saturated cotton-pad passes', timing: 'Immediately after cleansing', frequency: 'AM and PM',
    steps: [
      'Apply within 60 seconds of rinsing, while skin is still damp. Toner is mostly water and humectants; damp skin lets it absorb rather than evaporate.',
      'For hydrating toners, pour a small pool into your palm, press your hands together, and pat it onto the face in light layers. Patting drives it in; wiping pulls it off.',
      'For exfoliating or clarifying toners, saturate a cotton pad and sweep it over the T-zone and any congested areas only — not the whole face, and never the eye area.',
      'Layer a second application on dry patches or anywhere that feels tight. Two thin layers hydrate better than one heavy one.',
      'Do not rinse and do not wait for it to dry completely. Move into serums while there is still a hint of moisture on the skin.',
      'If you use an exfoliating toner, use it at night and give it a full minute to settle before the next step.',
    ],
    avoid: ['Alcohol-heavy astringents unless a provider specifically recommended one', 'Using an exfoliating toner and a retinoid on the same night', 'Wiping vigorously with a pad, which counts as physical exfoliation'],
  },
  {
    id: 't7', title: 'Applying moisturizer', summary: 'The step that seals everything underneath — technique matters more than the amount.',
    amount: 'Pea to almond-sized for the face, plus the same again for the neck', timing: 'After serums, before SPF in the AM', frequency: 'AM and PM',
    steps: [
      'Apply while serums are still slightly tacky, not fully dry. Moisturizer over damp skin traps the water underneath instead of sealing a dry surface.',
      'Warm the product between your fingertips for a few seconds so it spreads without dragging.',
      'Dot it on five points — forehead, both cheeks, nose, chin — then spread outward and upward with flat fingers, not fingertips.',
      'Carry it down the neck and over the jawline. The neck loses moisture faster and is almost always underdressed.',
      'Press a second, thinner layer only onto areas that still feel tight after two minutes — usually cheeks in winter.',
      'In the morning, give it a full two minutes to absorb before SPF so the sunscreen film stays even.',
    ],
    avoid: ['Using a rich occlusive balm on acne-prone areas out of habit', 'Skipping it because skin feels oily — oily skin still needs a light gel-cream', 'Rubbing in circles hard enough to see the skin move'],
  },
  {
    id: 't1', title: 'Layering serums', summary: 'Thin to thick, water before oil — one active per session.',
    amount: '2–3 drops per serum', timing: 'PM, on damp skin', frequency: 'Nightly',
    steps: [
      'Cleanse and leave skin slightly damp. Do not towel dry completely — water-based serums spread further and absorb better on damp skin.',
      'Start with the thinnest, most water-like formula. Press 2–3 drops into your palm, warm it between fingertips, then press — not rub — over the face in outward strokes.',
      'Wait 60 seconds between layers. If the next product pills or rolls, the layer underneath has not absorbed yet.',
      'Move to thicker serums next. Oil-based or silicone-based formulas always go after water-based ones, or they seal the water out.',
      'Seal with moisturizer. Take a pea-sized amount, dot it on cheeks, forehead and chin, then spread upward and outward.',
    ],
    avoid: ['Rubbing serums in — it drags on skin and wastes product', 'Stacking two exfoliating acids, or an acid with retinal, in the same session', 'Applying to bone-dry skin, which makes actives sit on the surface'],
  },
  {
    id: 't2', title: 'Applying SPF properly', summary: 'How much to use and where people always miss.',
    amount: 'Two finger-lengths for the face and neck', timing: 'Last step of every AM routine', frequency: 'Reapply every 2 hours outdoors',
    steps: [
      'Wait until moisturizer has fully absorbed — about two minutes. SPF applied over wet moisturizer breaks into an uneven film.',
      'Squeeze sunscreen along your index and middle fingers, from base to tip. That is the measured dose for face and neck; anything less lowers the labeled protection.',
      'Dot it across forehead, both cheeks, nose, chin and jaw before spreading, so coverage is even instead of concentrated in one spot.',
      'Spread in a thin, even layer and let it set for 15 minutes before makeup or going outside.',
      'Cover the missed zones deliberately: hairline, ears and behind them, eyelids up to the lash line, the sides of the neck, and the tops of the hands.',
      'Reapply over makeup with a mineral powder or spray SPF — a full reapplication is still better, but a partial one is better than none.',
    ],
    avoid: ['Relying on the SPF in your foundation — nobody applies enough of it', 'Skipping cloudy or indoor days; UVA passes through glass and cloud', 'Rubbing until it disappears, which thins the film below its rated protection'],
  },
  {
    id: 't3', title: 'Night double cleanse', summary: 'Oil first to lift SPF, then a gentle second cleanse.',
    amount: '2 pumps oil cleanser, 1 pump water cleanser', timing: 'PM only', frequency: 'Nightly when wearing SPF or makeup',
    steps: [
      'Start with completely dry hands and a dry face. Water blocks an oil cleanser from binding to sunscreen and makeup.',
      'Warm two pumps of oil cleanser or balm in your palms, then massage over the face for a full 60 seconds — include the hairline, jaw and around the nose.',
      'Add a little lukewarm water and keep massaging so the oil emulsifies into a milky texture. This is what lifts the SPF off rather than smearing it around.',
      'Rinse thoroughly with lukewarm water. Hot water strips the barrier and leaves skin tight.',
      'Follow with one pump of a gentle water-based cleanser on damp skin for 30 seconds, then rinse.',
      'Pat — do not rub — with a clean towel, and move straight into your serums while skin is still damp.',
    ],
    avoid: ['Using a cleansing wipe as the first step; it moves makeup around instead of removing it', 'Scrubbing with a brush or cloth, which causes micro-irritation', 'Cleansing for longer than 60 seconds with the water-based step'],
  },
  {
    id: 't4', title: 'Dermaplane aftercare', summary: 'What to use — and skip — for 72 hours after treatment.',
    amount: 'Barrier moisturizer, morning and night', timing: 'First 72 hours post-treatment', frequency: 'Reassess on day 4',
    steps: [
      'Day 1: cleanse with lukewarm water and a cream cleanser only. No actives, no exfoliation, no fragrance.',
      'Apply a simple barrier moisturizer with ceramides morning and night. Skin has just lost its outermost layer, so it loses water faster than usual.',
      'Use mineral SPF 30 or higher every morning without exception. Freshly resurfaced skin pigments easily.',
      'Days 2–3: keep the routine minimal. Hyaluronic acid and niacinamide are fine; hold everything else.',
      'Day 4: reintroduce one active at a time, starting at half your usual frequency. Retinal last, and only if there is no residual sensitivity.',
      'Avoid heat and sweat for 48 hours — no sauna, hot yoga or intense workouts.',
    ],
    avoid: ['Any acid, retinoid or scrub for 72 hours', 'Makeup on day 1, especially with a brush or sponge', 'Touching or picking at flaking, which can leave marks'],
  },
];

export const KITS: Kit[] = [
  { id: 'spring', season: 'Spring reset', when: 'March – May', why: 'Pollen and rising humidity mean more congestion and reactivity.', items: ['Gentle enzyme exfoliant', 'Niacinamide 10% Serum', 'Lightweight gel moisturizer'] },
  { id: 'summer', season: 'Summer defense', when: 'June – August', why: 'Peak UV and sweat call for lighter texture and heavier protection.', items: ['Mineral SPF 50', 'Oil-free gel moisturizer', 'Antioxidant vitamin C serum'] },
  { id: 'fall', season: 'Fall repair', when: 'September – November', why: 'Cooler air is the window to correct summer pigment safely.', items: ['Mandelic Resurfacing 8%', 'Glow C+ Brightening Serum', 'Barrier repair cream'] },
  { id: 'winter', season: 'Winter barrier', when: 'December – February', why: 'Indoor heat drops humidity and dehydrates skin fast.', items: ['Cream cleanser', 'H.A. Collagen Serum', 'Ceramide night cream'] },
];

export const ENV = {
  place: 'Your area',
  metrics: [
    { id: 'uv', label: 'UV index', value: '7', rating: 'High' },
    { id: 'hum', label: 'Humidity', value: '38%', rating: 'Low' },
    { id: 'aqi', label: 'Air quality', value: '62', rating: 'Moderate' },
  ],
  impact: 'High UV and low humidity today: reapply SPF at midday, add a hydrating layer under your moisturizer, and hold off on your acid tonight — dry air makes exfoliation sting more. Moderate pollution means a thorough evening cleanse matters more than usual.',
};

export const SYMPTOMS: Symptom[] = [
  { id: 'dryness', label: 'Dryness' },
  { id: 'redness', label: 'Redness' },
  { id: 'breakouts', label: 'Breakouts' },
  { id: 'oiliness', label: 'Oiliness' },
];

export const SERVICES = [
  { id: 'consultation', label: 'Consultation' },
  { id: 'facial', label: 'Custom Facial' },
  { id: 'dermaplane', label: 'Dermaplane/Nano-Infusion' },
  { id: 'microderm', label: 'Microdermabrasion' },
  { id: 'highfrequency', label: 'High-Frequency' },
];

export const BOOKING_URL = 'https://cryeraestheticsskincare.glossgenius.com/';

export const PLANS = [
  { id: 'monthly' as const, label: 'Monthly Basic', sub: '$7.99 / month', price: '$7.99/mo', badge: null as string | null },
  { id: 'annual' as const, label: 'Annual Pro', sub: '$59.99 / year', price: '$59.99/yr', badge: 'Everything' },
];

export const BASIC_FEATURES = ["AM/PM regimens for all 5 skin types", "Do's & don'ts and FAQs", 'Application guides', 'Member product picks'];
export const PRO_FEATURES = ['Everything in Monthly Basic', 'Ask a skin question and get a tailored answer', 'Your skin profile, diary and progress photos', 'Local UV, humidity and pollution guidance', 'Routine check for conflicting actives', 'Seasonal transition kits and early booking'];

export const REPORT_REASONS = [
  { id: 'medical', label: 'Makes a medical claim or gives medical advice' },
  { id: 'false', label: 'False or misleading about results' },
  { id: 'offensive', label: 'Offensive or abusive' },
  { id: 'spam', label: 'Spam or not about Cryer Aesthetics' },
];

export const ASK_SUGGESTIONS = [
  'Can I use retinal and vitamin C in the same week?',
  'How long until I see results from my routine?',
  'What should I change in winter?',
];

export const CONTACT_EMAIL = 'cryeraesthetics@gmail.com';
