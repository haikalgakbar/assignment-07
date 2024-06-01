import { IUserAtom } from "@/interfaces/user";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<IUserAtom | null>("user", null);
