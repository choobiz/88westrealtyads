"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

const QUESTIONS = [
  "Never owned a home anywhere in the world?",
  "Canadian citizen or permanent resident?",
  "Will live in the home as your primary residence?",
  "Home price under $835,000?",
];

export default function EligibilityChecker() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(QUESTIONS.map(() => null));

  const allYes = answers.every((a) => a === true);
  const anyNo = answers.some((a) => a === false);
  const allAnswered = answers.every((a) => a !== null);

  function toggle(index: number, value: boolean) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[600px] mx-auto px-5">
        <h2 className="text-med-navy text-[22px] md:text-[28px] font-bold text-center mb-2">
          Am I Eligible?
        </h2>
        <p className="text-text-secondary text-sm text-center mb-8">
          Quick check — most first-time buyers in BC qualify.
        </p>

        <div className="space-y-3">
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                answers[i] === true
                  ? "border-emerald-300 bg-emerald-50/50"
                  : answers[i] === false
                  ? "border-red-300 bg-red-50/50"
                  : "border-med-border"
              }`}
            >
              <p className="text-med-navy text-[14px] font-medium flex-1">{q}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => toggle(i, true)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    answers[i] === true
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-med-border text-text-muted hover:border-emerald-300"
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggle(i, false)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    answers[i] === false
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-med-border text-text-muted hover:border-red-300"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <div className={`mt-4 rounded-xl p-4 text-center text-[14px] font-semibold ${
            allYes ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"
          }`}>
            {allYes
              ? "✅ You qualify for up to $43,000 in government savings!"
              : anyNo
              ? "⚠️ You may not qualify for all programs, but developer incentives still apply. Talk to us."
              : ""}
          </div>
        )}

        {allYes && (
          <a
            href="#register"
            className="mt-4 w-full h-[48px] bg-brand-red text-white font-semibold rounded-full hover:bg-brand-red-hover transition-all flex items-center justify-center gap-2 text-[15px]"
          >
            See My First-Time Buyer Deals →
          </a>
        )}
      </div>
    </section>
  );
}
