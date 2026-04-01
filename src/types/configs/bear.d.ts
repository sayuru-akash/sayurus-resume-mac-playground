import type { ReactElement } from "react";

export interface BearMdData {
  id: string;
  title: string;
  file: string;
  icon: ReactElement;
  excerpt: string;
  link?: string;
}

export interface BearData {
  id: string;
  title: string;
  icon: ReactElement;
  md: BearMdData[];
}
