import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export type InputProps = {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  error?: string;
};
