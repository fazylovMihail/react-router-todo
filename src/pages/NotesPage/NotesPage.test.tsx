import { render, screen } from "@testing-library/react";
import NotesPage from "./NotesPage";
import { MemoryRouter } from "react-router-dom";

describe("NotesPage", () => {
  it("Проверка нахождения кнопки в DOM и клик по кнопке", () => {
    renderNotesPage();

    const createNoteBtn = getCreateNoteBtn();
    expect(createNoteBtn).toBeInTheDocument();
  });

  function renderNotesPage() {
    return render(
      <MemoryRouter initialEntries={["/notes"]}>
        <NotesPage />
      </MemoryRouter>,
    );
  }

  function getCreateNoteBtn(): HTMLButtonElement {
    return screen.getByRole("button", { name: "Создать заметку" });
  }
});
