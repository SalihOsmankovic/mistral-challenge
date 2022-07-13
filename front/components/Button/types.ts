import { ReactNode, MouseEventHandler } from "react";

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  isLoading?: boolean;
};
