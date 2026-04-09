import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotes } from "../../api";
import { Button } from "../../ui";
import { NoteCard } from "../../ui/NoteCard";
import type { NoteUi } from "../../api";
import { NotesForm } from "../NotesForm/NotesForm";

export const NotesPage = () => {
  const [notes, addNote, deleteNote] = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isNotesFormOpen = Boolean(searchParams.get("notes-form-open")); // Параметр открытия формы

  // Ф-я для открытия формы
  const handleOpenNotesForm = () => {
    if (!isNotesFormOpen) {
      setSearchParams({ "notes-form-open": "true" });
    }
  };

  // Ф-я для закрытия формы
  const handleCloseNotesForm = () => {
    navigate(-1);
  };

  const handleNotesFormSubmit = ({ title, desc }: NoteUi) => {
    handleCloseNotesForm();
    addNote(title, desc);
  };

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
        {isNotesFormOpen && <NotesForm onSubmit={handleNotesFormSubmit} />}
      </section>
    </>
  );
};
