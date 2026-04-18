import type { FC } from "react";
import { Button } from "../Button";
import type { Note } from "../../api";

interface NoteCardProps extends Note {
  onDelete: (id: string) => void;
}

export const NoteCard: FC<NoteCardProps> = ({ id, title, desc, onDelete }) => {
  return (
    <div className="note-card">
      <h3 className="note-card__title">{title}</h3>
      {desc && <p className="note-card__desc">{desc}</p>}
      <Button type="button" onClick={() => onDelete(id)}>
        Удалить
      </Button>
    </div>
  );
};

NoteCard.displayName = "NotesCard";
