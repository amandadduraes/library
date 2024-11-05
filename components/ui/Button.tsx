import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames"; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  const buttonClass = classNames(
    "px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none",
    {
      "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
      "bg-gray-200 text-black hover:bg-gray-300": variant === "secondary",
    }
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
