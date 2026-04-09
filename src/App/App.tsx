import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { NotesPage } from "../pages/NotesPage/NotesPage";

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="container"></div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
