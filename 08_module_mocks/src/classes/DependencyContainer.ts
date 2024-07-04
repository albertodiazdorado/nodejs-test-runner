import { Calculator } from "./Calculator"
import { getSecretNumber } from "../modules/secret-numbers"
type Dependencies = {
    calculator: Calculator
}

export class DependencyContainer {
    getDependencies(): Dependencies {
        return {
            calculator: new Calculator(getSecretNumber)
        }
    }
}