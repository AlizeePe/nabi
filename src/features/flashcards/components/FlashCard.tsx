import { motion } from "framer-motion";

// Types
import type { Word } from "../../../types";

// Props
interface FlashCardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashCard({ word, isFlipped, onFlip }: FlashCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onFlip}
      aria-pressed={isFlipped}
      aria-label={isFlipped ? "Hide translation" : "Reveal translation"}
      className="w-full min-h-64 cursor-pointer"
      whileTap={{ scale: 0.99 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full min-h-64"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-3xl bg-gray-50 border-2 border-gray-100 flex flex-col items-center justify-between py-8 px-6 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">
            What does this mean?
          </p>
          <p className="text-5xl md:text-6xl font-bold text-gray-800">
            {word.hangul}
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Click to reveal
          </p>
        </div>

        <div
          className="absolute inset-0 rounded-3xl bg-gray-800 flex flex-col items-center justify-center p-8 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col items-center">
            <p className="text-2xl font-black text-white">{word.hangul}</p>
            <p className="text-sm text-gray-400">{word.romanization}</p>
          </div>

          <p className="text-4xl font-black text-white my-6 wrap-break-word text-center w-full">
            {word.english}
          </p>

          {word.exampleKorean && word.exampleEnglish && (
            <div className="flex flex-col items-center gap-1 mt-4">
              <p className="text-sm text-gray-400 text-center line-clamp-2">
                {word.exampleKorean}
              </p>
              <p className="text-xs text-gray-400 text-center line-clamp-2">
                {word.exampleEnglish}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}
