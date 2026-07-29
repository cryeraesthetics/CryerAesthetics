"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { quizQuestions, scoreQuiz, type SkinTypeSlug } from "@/data/quiz";
import { getSkinType } from "@/data/skinTypes";
import PaywallGate from "@/components/PaywallGate";

export default function QuizForm({
  isLoggedIn,
  isMember,
}: {
  isLoggedIn: boolean;
  isMember: boolean;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<SkinTypeSlug | null>(null);
  const [saving, setSaving] = useState(false);

  const question = quizQuestions[step];
  const progress = Math.round((step / quizQuestions.length) * 100);

  function selectOption(optionIndex: number) {
    const nextAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(nextAnswers);

    if (step + 1 < quizQuestions.length) {
      setStep(step + 1);
    } else {
      const skinType = scoreQuiz(nextAnswers);
      setResult(skinType);
      if (isLoggedIn) {
        setSaving(true);
        fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skinType, answers: nextAnswers }),
        }).finally(() => setSaving(false));
      }
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  if (result) {
    const data = getSkinType(result)!;
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-sand-200 bg-cream-50 p-8 text-center">
          <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-700">
            Your Result
          </span>
          <div className="mx-auto mt-4 h-40 w-40 overflow-hidden rounded-full border-4 border-sand-200">
            <Image
              src={data.image}
              alt={data.name}
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="mt-4 font-serif text-3xl text-cocoa-800">
            You have {data.name}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-cocoa-600">{data.tagline}</p>
          {saving && (
            <p className="mt-2 text-xs text-cocoa-400">Saving your result…</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="mb-3 font-serif text-2xl text-cocoa-800">
            Your Starter Recommendations
          </h2>
          <PaywallGate unlocked={isMember}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {data.regimen.am.map((step) => (
                <li
                  key={step}
                  className="rounded-xl border border-sand-200 bg-cream-50 px-4 py-3 text-sm text-cocoa-700"
                >
                  {step}
                </li>
              ))}
            </ul>
          </PaywallGate>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/skin-types/${data.slug}`}
            className="rounded-full bg-cocoa-600 px-5 py-2.5 font-semibold text-cream-50 transition hover:bg-cocoa-700"
          >
            View Full {data.name} Guide
          </Link>
          <button
            onClick={restart}
            className="rounded-full border border-cocoa-300 px-5 py-2.5 font-semibold text-cocoa-700 transition hover:bg-cocoa-50"
          >
            Retake Analysis
          </button>
          {!isLoggedIn && (
            <Link
              href="/signup"
              className="rounded-full border border-sage-400 px-5 py-2.5 font-semibold text-sage-700 transition hover:bg-sage-50"
            >
              Create an account to save results
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-cocoa-500">
          <span>
            Question {step + 1} of {quizQuestions.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-sand-200">
          <div
            className="h-full rounded-full bg-sage-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h1 className="mb-6 font-serif text-2xl text-cocoa-800">
        {question.question}
      </h1>

      <div className="flex flex-col gap-3">
        {question.options.map((option, i) => (
          <button
            key={option.label}
            onClick={() => selectOption(i)}
            className="rounded-xl border border-sand-200 bg-cream-50 px-5 py-4 text-left text-cocoa-700 transition hover:border-sage-400 hover:bg-sage-50"
          >
            {option.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 text-sm text-cocoa-500 hover:text-cocoa-700"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
