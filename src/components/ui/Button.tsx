import React from "react";

const Button = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-main text-white p-2 rounded-md cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
