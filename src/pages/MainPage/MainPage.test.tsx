import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import NotesPage from "../NotesPage/NotesPage";

describe("MainPage", () => {
  it("Снапшот тестирование", () => {
    const { asFragment } = renderPage();
    expect(asFragment()).toMatchSnapshot();
  });

  it("Тестирование ссылки", async () => {
    const user = userEvent.setup();
    renderPage();

    const link = screen.getByRole("link", { name: "Заметки" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/notes");
  });

  function renderPage() {
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </MemoryRouter>,
    );
  }
});
