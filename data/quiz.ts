export type SkinTypeSlug = "normal" | "oily" | "dry" | "combination" | "sensitive";

export type QuizOption = {
  label: string;
  scores: Partial<Record<SkinTypeSlug, number>>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "feel-after-wash",
    question: "How does your skin feel a few hours after cleansing?",
    options: [
      { label: "Tight, rough, or flaky", scores: { dry: 2 } },
      { label: "Shiny all over", scores: { oily: 2 } },
      { label: "Shiny in the center, normal on the cheeks", scores: { combination: 2 } },
      { label: "Comfortable and balanced", scores: { normal: 2 } },
      { label: "Itchy, red, or irritated", scores: { sensitive: 2 } },
    ],
  },
  {
    id: "breakouts",
    question: "How often do you experience breakouts or clogged pores?",
    options: [
      { label: "Rarely, if ever", scores: { normal: 1, dry: 1 } },
      { label: "Frequently, especially forehead/nose/chin", scores: { oily: 2 } },
      { label: "Sometimes, mostly in the T-zone", scores: { combination: 2 } },
      { label: "Rarely, but I react easily with redness or bumps", scores: { sensitive: 1 } },
    ],
  },
  {
    id: "pore-size",
    question: "How would you describe your pores?",
    options: [
      { label: "Small and barely visible", scores: { normal: 1, dry: 1, sensitive: 1 } },
      { label: "Large, especially on the nose and forehead", scores: { oily: 2 } },
      { label: "Larger in the center, smaller on the cheeks", scores: { combination: 2 } },
    ],
  },
  {
    id: "reactivity",
    question: "Do new skincare products often cause redness, stinging, or itching?",
    options: [
      { label: "Yes, frequently", scores: { sensitive: 3 } },
      { label: "Occasionally", scores: { sensitive: 1 } },
      { label: "Rarely or never", scores: { normal: 1, oily: 1, dry: 1, combination: 1 } },
    ],
  },
  {
    id: "climate",
    question: "How does your skin behave in cold or dry weather?",
    options: [
      { label: "Gets very flaky, tight, and uncomfortable", scores: { dry: 2 } },
      { label: "Stays oily or shiny regardless", scores: { oily: 2 } },
      { label: "Cheeks get drier, T-zone stays oily", scores: { combination: 2 } },
      { label: "Stays fairly balanced", scores: { normal: 2 } },
    ],
  },
  {
    id: "midday-check",
    question: "By midday, how does your face look without touching it up?",
    options: [
      { label: "Shiny and needs blotting", scores: { oily: 2 } },
      { label: "Looks dry, dull, or flaky in patches", scores: { dry: 2 } },
      { label: "Shiny T-zone, matte or dry cheeks", scores: { combination: 2 } },
      { label: "Looks fresh and balanced", scores: { normal: 2 } },
      { label: "Looks flushed or slightly irritated", scores: { sensitive: 1 } },
    ],
  },
];

export function scoreQuiz(answers: Record<string, number>): SkinTypeSlug {
  const totals: Record<SkinTypeSlug, number> = {
    normal: 0,
    oily: 0,
    dry: 0,
    combination: 0,
    sensitive: 0,
  };

  quizQuestions.forEach((q) => {
    const chosenIndex = answers[q.id];
    const option = q.options[chosenIndex];
    if (!option) return;
    (Object.entries(option.scores) as [SkinTypeSlug, number][]).forEach(
      ([slug, pts]) => {
        totals[slug] += pts;
      }
    );
  });

  return (Object.entries(totals) as [SkinTypeSlug, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0][0];
}
