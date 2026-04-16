import { useEffect, useState } from "react";
import z from "zod";

export const NoteScheme = z.object({
  id: z.string(),
  title: z.string().min(1, "Название обязательно для заметки"),
  desc: z.string().optional(),
});

export type Note = z.infer<typeof NoteScheme>;

export const NotesListScheme = z.array(NoteScheme);

export type NoteList = z.infer<typeof NotesListScheme>;

export const NoteUiScheme = NoteScheme.pick({
  title: true,
  desc: true,
});

export type NoteUi = z.infer<typeof NoteUiScheme>;

export function useNotes() {
  const [notes, setNotes] = useState<NoteList>(() => {
    try {
      const rawNotes = localStorage.getItem("notes");
      return rawNotes ? JSON.parse(rawNotes) : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  });

  useEffect(
    () => localStorage.setItem("notes", JSON.stringify(notes)),
    [notes],
  );

  const addNote = (title: string, desc?: string) => {
    setNotes([
      ...notes,
      {
        id: crypto.randomUUID(),
        title,
        ...(desc && { desc }),
      },
    ]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return [notes, addNote, deleteNote] as const;
}
