import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MASCOT_ANIMATE = { y: [0, -10, 0, -6, 0] };
const MASCOT_TRANSITION = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
} as const;

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center pt-16 pb-20 md:pb-0">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-white p-6 shadow-lg md:max-w-lg md:p-8">
        <motion.img
          src="/nabi/nabi.svg"
          alt="Nabi, the cat mascot"
          className="h-28 w-28"
          animate={MASCOT_ANIMATE}
          transition={MASCOT_TRANSITION}
        />
        <h1 className="font-korean mt-4 text-2xl font-black text-gray-800">
          안녕하세요!
        </h1>
        <h2 className="text-lg font-bold text-gray-800">Welcome to Nabi</h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Learn Korean step by step — TOPIK 1 vocabulary, Hangul alphabet, and
          more.
        </p>
        <p className="mt-1 text-center text-sm text-gray-500">
          <span className="text-primary font-bold">나비</span> means butterfly
          in Korean — and is also a cat's name 🦋
        </p>
        <Link
          to="/flashcards"
          className="bg-primary mt-6 w-full rounded-2xl p-4 text-center text-lg font-bold text-white"
        >
          Start learning <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
