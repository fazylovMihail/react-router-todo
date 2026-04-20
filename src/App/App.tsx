import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LazyMainPage = lazy(() => import("../pages/MainPage"));
const LazyNotesPage = lazy(() => import("../pages/NotesPage"));

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="container"></div>
      </header>
      <main>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<LazyMainPage />} />
            <Route path="/notes" element={<LazyNotesPage />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
