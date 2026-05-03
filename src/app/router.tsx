// Library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { FlashcardsPage } from "../features/flashcards/FlashCardsPages";
import { HomePage } from "../features/home/HomePage";

export function Router() {
  return (
    <BrowserRouter basename="/nabi/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
