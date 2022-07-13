import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
  title: string;
  isLoading?: boolean;
  previousPage?: {
    href: string;
    label: string;
  };
};
