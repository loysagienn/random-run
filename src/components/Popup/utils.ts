import { createRef, createContext } from "react";
import type { RefObject } from "react";

export const containerContext = createContext<RefObject<HTMLDivElement> | null>(
  null
);

export const { Provider } = containerContext;
