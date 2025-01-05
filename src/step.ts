import { v4 as uuidv4 } from "uuid";

export type IStep = {
    name: string;
    description: string;
    instructions: string;
};

/**
 * A step represents a single action that a user takes to achieve a specific goal.
 * It is a function that takes the user's input and returns the next step to execute.
 *
 * @param name - The name of the step.
 * @param description - A description of the step.
 * @param instructions - The instructions for the step.
 * @returns A new step object.
 *
 * @example
 * const step = Step.create({
 *   name: "Add to Cart",
 *   description: "Confirm the user wants to add the product to the cart",
 *   instructions:
 *     "Confirm the product selection and display cart contents.",
 * });
 */
export class Step {
    readonly id = uuidv4();
    public name: string;
    public description: string;
    public instructions: string;

    constructor(options: IStep) {
        this.name = options.name;
        this.description = options.description;
        this.instructions = options.instructions;
    }

    static create(object: IStep): Step {
        return new Step(object);
    }

    toObject(): IStep {
        return {
            name: this.name,
            description: this.description,
            instructions: this.instructions,
        };
    }

    toString(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            description: this.description,
            instructions: this.instructions,
        });
    }
}
