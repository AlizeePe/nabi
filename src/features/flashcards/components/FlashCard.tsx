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
      className="min-h-64 w-full cursor-pointer"
      whileTap={{ scale: 0.99 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative min-h-64 w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-3xl border-2 border-gray-100 bg-gray-50 px-6 py-8"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <p className="text-sm font-bold tracking-widest text-gray-600 uppercase">
            What does this mean?
          </p>
          <p className="text-5xl font-bold text-gray-800 md:text-6xl">
            {word.hangul}
          </p>
          <p className="text-xs tracking-widest text-gray-500 uppercase">
            Click to reveal
          </p>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gray-800 p-8"
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

          <p className="my-6 w-full text-center text-4xl font-black wrap-break-word text-white">
            {word.english}
          </p>

          {word.exampleKorean && word.exampleEnglish && (
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="line-clamp-2 text-center text-sm text-gray-400">
                {word.exampleKorean}
              </p>
              <p className="line-clamp-2 text-center text-xs text-gray-400">
                {word.exampleEnglish}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}
