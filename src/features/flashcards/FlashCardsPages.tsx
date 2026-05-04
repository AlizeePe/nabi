// Library
import { useState } from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

// Components
import { FlashCard } from "./components/FlashCard";

// Data
import wordsData from "../../data/words.json";

// Types
import type { Word, SRSRating } from "../../types";

const words: Word[] = wordsData.words as Word[];

const TRANSITION_DURATION = 400;

const CELEBRATE_ANIMATE = { y: [0, -20, 0] };
const CELEBRATE_TRANSITION = { duration: 1, repeat: 2, delay: 1 } as const;

export function FlashcardsPage() {
  // Navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Card
  const [isFlipped, setIsFlipped] = useState(false);

  // Session score
  const [gotIt, setGotIt] = useState(0);
  const [dontKnow, setDontKnow] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (words.length === 0) {
    return <div className="p-6">No flashcards available.</div>;
  }

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  const handleFlip = () => {
    // Prevent double-tap during flip animation
    if (isAnimating) return;
    setIsFlipped((prev) => !prev);
  };

  const runTransition = (callback: () => void) => {
    setIsAnimating(true);
    setIsFlipped(false);

    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  };

  const updateScore = (rating: SRSRating) => {
    if (rating === "known") {
      setGotIt((prev) => prev + 1);
    } else {
      setDontKnow((prev) => prev + 1);
    }
  };

  const handleNext = (rating?: SRSRating) => {
    if (isAnimating) return;

    if (rating) updateScore(rating);

    // Last word → end session
    if (isLastWord) {
      setIsComplete(true);
      return;
    }

    runTransition(() => {
      setCurrentIndex((i) => i + 1);
    });
  };

  const handlePrevious = () => {
    if (isAnimating || currentIndex <= 0) return;

    runTransition(() => {
      setCurrentIndex((i) => i - 1);
    });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setGotIt(0);
    setDontKnow(0);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-6 p-6 pt-16">
        <motion.img
          src="/nabi/nabi.svg"
          alt="Nabi celebrating"
          className="h-28 w-28"
          animate={CELEBRATE_ANIMATE}
          transition={CELEBRATE_TRANSITION}
        />

        <div className="text-center">
          <h1 className="text-2xl font-black text-gray-800">
            Session complete!
          </h1>
          <p className="mt-1 text-sm text-gray-400">Here's how you did</p>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex-1 rounded-2xl bg-green-50 p-4 text-center">
            <p className="text-3xl font-black text-green-500">{gotIt}</p>
            <p className="mt-1 text-xs font-bold text-green-400">Got it</p>
          </div>
          <div className="flex-1 rounded-2xl bg-red-50 p-4 text-center">
            <p className="text-3xl font-black text-red-400">{dontKnow}</p>
            <p className="mt-1 text-xs font-bold text-red-300">Don't know</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="bg-primary w-full rounded-2xl py-4 text-base font-bold text-white"
        >
          Try again →
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-start gap-6 p-6 pt-16 pb-20 md:pb-6">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-400">
          {currentIndex + 1} / {words.length}
        </span>

        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>

      <FlashCard word={currentWord} isFlipped={isFlipped} onFlip={handleFlip} />

      {isFlipped && (
        <div className="flex gap-3 md:mt-0">
          <button
            type="button"
            onClick={() => handleNext("known")}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-400 py-4 text-base font-bold text-green-900"
          >
            <Check size={16} /> Got it
          </button>
          <button
            type="button"
            onClick={() => handleNext("unknown")}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-400 py-4 text-base font-bold text-red-900"
          >
            <X size={16} /> Don't know
          </button>
        </div>
      )}

      {!isFlipped && (
        <div className="flex gap-3 md:mt-0">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isAnimating}
            className={`flex-1 rounded-2xl border-2 border-gray-100 py-4 text-base font-bold text-gray-500 ${currentIndex === 0 ? "opacity-30" : ""}`}
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => handleNext()}
            disabled={isLastWord || isAnimating}
            className={`flex-1 rounded-2xl bg-gray-200 py-4 text-base font-bold text-gray-600 ${isLastWord ? "opacity-30" : ""}`}
          >
            Skip →
          </button>
        </div>
      )}
    </div>
  );
}
