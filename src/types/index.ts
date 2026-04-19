// ─────────────────────────────────────────────
// VOCABULARY
// ─────────────────────────────────────────────

export type TopikLevel = 1 | 2;

export type WordType = "noun" | "verb" | "adjective" | "adverb" | "expression";

export type Category =
  | "daily life"
  | "family"
  | "food"
  | "school"
  | "transport"
  | "time"
  | "nature"
  | "body"
  | "emotions"
  | "numbers"
  | "places"
  | "actions";

export interface Word {
  id: string;
  hangul: string;
  romanization: string;
  french: string;
  english: string;
  level: TopikLevel;
  type: WordType;
  categories: Category[];
  exampleKorean?: string;
  exampleFrench?: string;
  exampleEnglish?: string;
}

// ─────────────────────────────────────────────
// HANGEUL
// ─────────────────────────────────────────────

export type LetterType = "consonant" | "vowel";

export interface Letter {
  id: string;
  character: string;
  romanization: string;
  type: LetterType;
  pronunciation: string;
  exampleWord: string;
  exampleWordMeaning: string;
}

// ─────────────────────────────────────────────
// NUMBERS
// ─────────────────────────────────────────────

export interface KoreanNumber {
  value: number;
  sino: string;
  native: string;
  sinoRomanization: string;
  nativeRomanization: string;
  usageSino: string;
  usageNative: string;
}

// ─────────────────────────────────────────────
// SRS SYSTEM
// ─────────────────────────────────────────────

export type SRSRating = "known" | "unknown";

export interface WordProgress {
  wordId: string;
  interval: number; // days until next review
  easeFactor: number; // difficulty coefficient (starts at 2.5)
  nextReview: string; // ISO date string
  repetitions: number; // total number of reviews
  lastRating: SRSRating;
}

// ─────────────────────────────────────────────
// USER STATS
// ─────────────────────────────────────────────

export interface UserStats {
  streak: number;
  lastStudyDate: string; // ISO date string
  totalReviewed: number;
  wordsLearned: string[]; // array of mastered word ids
}

// ─────────────────────────────────────────────
// QUIZ
// ─────────────────────────────────────────────

export interface QuizQuestion {
  word: Word;
  options: string[]; // 4 possible answers
  correctIndex: number; // index of correct answer in options[]
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongWordIds: string[];
  date: string;
}

// ─────────────────────────────────────────────
// FLASHCARD SESSION
// ─────────────────────────────────────────────

export interface FlashcardSession {
  words: Word[];
  currentIndex: number;
  isFlipped: boolean;
  ratings: Record<string, SRSRating>; // wordId -> rating
}
