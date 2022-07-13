import { Dispatch, ReactNode, SetStateAction } from "react";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
