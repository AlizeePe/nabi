// Library
import { HashRouter, Routes, Route } from "react-router-dom";

// Pages
import { FlashcardsPage } from "../features/flashcards/FlashCardsPages";
import { HomePage } from "../features/home/HomePage";
import { Layout } from "../components/Layout";

export function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
