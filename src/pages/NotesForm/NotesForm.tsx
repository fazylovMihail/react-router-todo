import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button, Input } from "../../ui";
import { NoteUiScheme, type NoteUi } from "../../api";
import { zodResolver } from "@hookform/resolvers/zod";

interface NotesFormProps {
  onSubmit: SubmitHandler<NoteUi>;
}

export const NotesForm: FC<NotesFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteUi>({
    resolver: zodResolver(NoteUiScheme),
  });

  const handleSubmitWithReset = (data: NoteUi) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className="notes-form" onSubmit={handleSubmit(handleSubmitWithReset)}>
      <div className="container">
        <div className="notes-form__content">
          <h2 className="notes-form__heading">Создать заметку</h2>
          <div className="notes-form__inner">
            <Input
              type="text"
              labelText="Название"
              id="title-input"
              {...register("title")}
              error={errors.title?.message}
            />
            <Input
              type="text"
              labelText="Описание"
              id="desc-input"
              {...register("desc")}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Создание..." : "Создать"}
          </Button>
        </div>
      </div>
    </form>
  );
};
