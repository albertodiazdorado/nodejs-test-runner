import { getSecretNumber } from "./secret-numbers";

export const add = async (first: number, second: number) => Promise.resolve(first + second + getSecretNumber());