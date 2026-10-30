import { useContext } from "react";
import { Ctx } from "./context";

export function useApp() {
  return useContext(Ctx);
}