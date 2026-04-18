import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotesForm } from "./NotesForm";

describe("NotesForm", () => {
  const onAdd = jest.fn();
  const onClose = jest.fn();
  const testValue = "lorem";

  beforeEach(() => {
    onAdd.mockClear();
    onClose.mockClear();
  });

  it("Проверка нахождения инпутов в DOM и тест тайпинга", async () => {
    const user = userEvent.setup();
    renderNotesForm();

    const inputs = getInputs();

    for (const input of Object.values(inputs)) {
      await user.type(input, testValue);
      expect(input).toHaveValue(testValue);
    }

    const errorLabel = getErrorLabel();
    expect(errorLabel).not.toBeInTheDocument();
  });

  it("Проверка отправки формы с двумя заполненными полями", async () => {
    const user = userEvent.setup();
    renderNotesForm();

    const inputs = getInputs();
    const submitBtn = getSubmitBtn();

    for (const input of Object.values(inputs))
      await user.type(input, testValue);

    await user.click(submitBtn);
    expect(onAdd).toHaveBeenCalledWith({
      title: testValue,
      desc: testValue,
    });

    const errorLabel = getErrorLabel();
    expect(errorLabel).not.toBeInTheDocument();
  });

  it("Проверка отправки формы с одним обязательным полем", async () => {
    const user = userEvent.setup();
    renderNotesForm();

    const { inputTitle } = getInputs();
    const submitBtn = getSubmitBtn();

    await user.type(inputTitle, testValue);
    await user.click(submitBtn);

    expect(onAdd).toHaveBeenCalledWith({
      title: testValue,
      desc: "",
    });

    const errorLabel = getErrorLabel();
    expect(errorLabel).not.toBeInTheDocument();
  });

  it("Проверка отправки формы с одним необязательным полем", async () => {
    const user = userEvent.setup();
    renderNotesForm();

    const { inputDesc } = getInputs();
    const submitBtn = getSubmitBtn();

    await user.type(inputDesc, testValue);
    await user.click(submitBtn);

    expect(onAdd).toHaveBeenCalledTimes(0);

    const errorLabel = getErrorLabel();
    expect(errorLabel).toBeInTheDocument();
  });

  it("Проверка отправки формы с двумя незаполненными значениями", async () => {
    const user = userEvent.setup();
    renderNotesForm();

    const submitBtn = getSubmitBtn();

    await user.click(submitBtn);

    expect(onAdd).toHaveBeenCalledTimes(0);

    const errorLabel = getErrorLabel();
    expect(errorLabel).toBeInTheDocument();
  });

  interface Inputs {
    inputTitle: HTMLInputElement;
    inputDesc: HTMLInputElement;
  }

  function renderNotesForm(): RenderResult {
    return render(<NotesForm onAdd={onAdd} onClose={onClose} />);
  }

  function getInputs(): Inputs {
    const inputTitle = getInputByLabelText("Название");
    const inputDesc = getInputByLabelText("Описание");

    return { inputTitle, inputDesc };
  }

  function getInputByLabelText(labelText: string): HTMLInputElement {
    return screen.getByLabelText(labelText);
  }

  function getSubmitBtn(): HTMLButtonElement {
    return screen.getByRole("button", { name: "Создать" });
  }

  function getErrorLabel(): HTMLSpanElement | null {
    return screen.queryByText("Название обязательно для заметки");
  }
});
