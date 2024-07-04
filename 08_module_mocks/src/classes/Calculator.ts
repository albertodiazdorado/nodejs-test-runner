import { getSecretNumber as gsn } from "../modules/secret-numbers";

export class Calculator {
    constructor(private readonly getSecretNumber: typeof gsn) {}
    async add(first: number, second: number) {
        return Promise.resolve(first + second + this.getSecretNumber());
    }
}