// "Ask about your skin" needs an LLM API key that hasn't been configured
// yet, so this is a rule-based stand-in: it matches the question against a
// few common topics and otherwise falls back to general guidance built
// from the member's own profile. Swap this out for a real model call once
// an API key is connected (see SETUP.md) — the UI/UX and thread storage
// are already real.
export interface AskProfile {
  skinTypeName: string;
  concernLabels: string[];
  shelfNames: string[];
  notes: string;
}

const MEDICAL_HINTS = ['hurt', 'pain', 'bleed', 'infect', 'fever', 'swoll', 'diagnos', 'prescri', 'cancer', 'mole'];

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export function mockAskAnswer(question: string, profile: AskProfile): string {
  const q = question.toLowerCase();
  const type = profile.skinTypeName || 'your skin type (not set yet)';

  if (includesAny(q, MEDICAL_HINTS)) {
    return `That sounds like something worth having looked at in person rather than guessed at here. Book a consultation and bring this up — we can examine it directly and, if needed, point you to a dermatologist. In the meantime keep the area clean and avoid introducing new actives near it. This is guidance, not a diagnosis.`;
  }

  if (includesAny(q, ['retinol', 'retinal', 'retinoid', 'vitamin c']) && includesAny(q, ['together', 'same time', 'same week', 'same night', 'combine'])) {
    return `Retinoids and vitamin C can both be part of the same routine, but layering them in one session is a common source of irritation, especially on ${type.toLowerCase()}. The simplest split is vitamin C in the morning and your retinoid at night, or alternate nights if you'd rather keep them fully separate. Check the Routine Check tab — it will flag this pairing directly against what's on your shelf.`;
  }

  if (includesAny(q, ['how long', 'results', 'see a difference', 'weeks', 'months'])) {
    return `Most actives take 4-6 weeks of consistent use before a real difference shows, and up to 12 weeks for slower-turnover concerns like fine lines or pigment. The most common reason a routine "doesn't work" is switching products before that window closes. Keep a few diary entries during that stretch — it makes the change easier to see than memory alone.`;
  }

  if (includesAny(q, ['winter', 'cold', 'dry season', 'heater'])) {
    return `Indoor heat and cold air both pull moisture out of skin faster, so most routines benefit from a richer moisturizer, a hydrating serum layered underneath it, and dialing back exfoliating acids to twice a week. SPF still matters — winter sun and snow glare both carry UV. If your notes mention ${type.toLowerCase()}, lean toward cream over gel textures for the season.`;
  }

  const concernPart = profile.concernLabels.length
    ? `your tracked concerns (${profile.concernLabels.join(', ')})`
    : 'your profile';
  const shelfPart = profile.shelfNames.length
    ? ` Based on what's on your shelf, the Routine Check tab is the fastest way to see if anything you already own conflicts.`
    : ' Once you add a few products to My Shelf, Routine Check can flag anything that shouldn\'t be layered together.';

  return `For ${type.toLowerCase()} skin with ${concernPart}, the fastest path is usually a simple routine (cleanser, one treatment step, moisturizer, daily SPF) held steady for a few weeks rather than changing several things at once.${shelfPart} Anything that feels like more than routine skin care — pain, spreading, or something that isn't settling — is worth an in-person consultation instead. Guidance, not a diagnosis.`;
}
