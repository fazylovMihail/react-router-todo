import { useSearchParams } from "react-router-dom";
import { useNotes } from "../../api";
import { Button } from "../../ui";
import { NoteCard } from "../../ui/NoteCard";
import type { NoteUi } from "../../api";
import { NotesForm } from "../NotesForm/NotesForm";
import { useCallback } from "react";

export const NotesPage = () => {
  const [notes, addNote, deleteNote] = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();

  const isNotesFormOpen = Boolean(searchParams.get("notes-form-open")); // Параметр открытия формы

  // Ф-я для открытия формы
  const handleOpenNotesForm = useCallback(() => {
    setSearchParams((prev) => {
      prev.set("notes-form-open", "true");
      return prev;
    });
  }, [setSearchParams]);

  // Ф-я для закрытия формы
  const handleCloseNotesForm = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("notes-form-open");
      return prev;
    });
  }, [setSearchParams]);

  return (
    <>
      <section className="notes">
        <div className="container">
          <h1 className="notes__heading">Заметки</h1>
          <Button
            type="button"
            onClick={handleOpenNotesForm}
            disabled={isNotesFormOpen}
          >
            Создать заметку
          </Button>
          <ul className="notes__list">
            {notes.map(({ id, title, desc }) => (
              <li key={id} className="notes__list-item">
                <NoteCard
                  id={id}
                  title={title}
                  desc={desc}
                  onDelete={deleteNote}
                />
              </li>
            ))}
          </ul>
        </div>
        {isNotesFormOpen && (
          <NotesForm onAdd={addNote} onClose={handleCloseNotesForm} />
        )}
      </section>
    </>
  );
};
