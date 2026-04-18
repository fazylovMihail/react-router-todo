import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  modificators?: string[];
}

export const Button: FC<ButtonProps> = ({ modificators = [], ...props }) => {
  const className = ["btn", ...modificators.map((mod) => `btn--${mod}`)].join(
    " ",
  );

  return <button {...props} className={className}></button>;
};

Button.displayName = 'Button';