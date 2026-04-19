// Library
import { useState } from "react";
import { Check, X } from "lucide-react";

// Components
import { FlashCard } from "./components/FlashCard";

// Data
import wordsData from "../../data/words.json";

// Types
import type { Word } from "../../types";

const TRANSITION_DURATION = 400;

export function FlashcardsPage() {
  const words: Word[] = wordsData.words as Word[];

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

  const updateScore = (rating: "known" | "unknown") => {
    if (rating === "known") {
      setGotIt((prev) => prev + 1);
    } else {
      setDontKnow((prev) => prev + 1);
    }
  };

  const handleNext = (rating?: "known" | "unknown") => {
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
      <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex flex-col items-center justify-center gap-6">
        <span className="text-6xl">🐱</span>

        <div className="text-center">
          <h1 className="text-2xl font-black text-gray-800">
            Session complete!
          </h1>
          <p className="text-sm text-gray-400 mt-1">Here's how you did</p>
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex-1 bg-green-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-green-500">{gotIt}</p>
            <p className="text-xs font-bold text-green-400 mt-1">Got it</p>
          </div>
          <div className="flex-1 bg-red-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-red-400">{dontKnow}</p>
            <p className="text-xs font-bold text-red-300 mt-1">Don't know</p>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 rounded-2xl bg-red-400 text-white font-bold text-sm"
        >
          Try again →
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-sm font-bold text-gray-400">
          {currentIndex + 1} / {words.length}
        </span>

        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>

      <FlashCard word={currentWord} isFlipped={isFlipped} onFlip={handleFlip} />

      {isFlipped && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => handleNext("known")}
            className="flex-1 py-3 rounded-2xl bg-green-400 text-green-900 font-bold text-sm flex items-center justify-center gap-2"
          >
            <Check size={16} /> Got it
          </button>
          <button
            onClick={() => handleNext("unknown")}
            className="flex-1 py-3 rounded-2xl bg-red-400 text-red-900 font-bold text-sm flex items-center justify-center gap-2"
          >
            <X size={16} /> Don't know
          </button>
        </div>
      )}

      {!isFlipped && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isAnimating}
            className={`flex-1 py-3 rounded-2xl border-2 border-gray-100 text-gray-400 font-bold text-sm ${currentIndex === 0 ? "opacity-30" : ""}`}
          >
            ← Previous
          </button>
          <button
            onClick={() => handleNext()}
            disabled={isLastWord || isAnimating}
            className={`flex-1 py-3 rounded-2xl bg-gray-200 text-gray-600 font-bold text-sm ${isLastWord ? "opacity-30" : ""}`}
          >
            Skip →
          </button>
        </div>
      )}
    </div>
  );
}
