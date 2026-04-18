import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  modificators?: string[];
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, modificators = [], error, id, ...props }, ref) => {
    const className = [
      "custom-input",
      ...modificators.map((mod) => `custom-input--${mod}`),
    ].join(" ");

    return (
      <div className={className}>
        <input ref={ref} className="custom-input__field" id={id} {...props} />
        <label htmlFor={id} className="custom-input__label">
          {labelText}
        </label>
        {error && <span className="custom-input__error">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
