import { useSearchParams } from "react-router-dom";
import { useNotes } from "../../api";
import { Button } from "../../ui";
import { NoteCard } from "../../ui/NoteCard";
import { lazy, Suspense, useCallback } from "react";

const LazyNotesForm = lazy(() => import("../NotesForm"));

const NotesPage = () => {
  const { notes, addNote, deleteNote } = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const FORM_KEY = "notes-form-open";

  const isNotesFormOpen = Boolean(searchParams.get(FORM_KEY)); // Параметр открытия формы

  // Ф-я для открытия формы
  const handleOpenNotesForm = useCallback(() => {
    setSearchParams((prev) => {
      prev.set(FORM_KEY, "true");
      return prev;
    });
  }, [setSearchParams]);

  // Ф-я для закрытия формы
  const handleCloseNotesForm = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete(FORM_KEY);
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
          <Suspense fallback={null}>
            <LazyNotesForm onAdd={addNote} onClose={handleCloseNotesForm} />
          </Suspense>
        )}
      </section>
    </>
  );
};

NotesPage.displayName = "NotesPage";

export default NotesPage;
