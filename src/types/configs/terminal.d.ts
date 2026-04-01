import type { ReactElement } from "react";

export interface TerminalData {
  id: string;
  title: string;
  type: string;
  content?: ReactElement | string;
  children?: TerminalData[];
}
