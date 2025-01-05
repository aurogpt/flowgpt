import { v4 as uuidv4 } from "uuid";
import { Step, type IStep } from "./step";
import { CanCreate } from "./utils/can-create";

interface IScenario {
    name: string;
    description: string;
    steps: Step[];
}
/**
 * A scenario represents a sequence of steps that a user follows to achieve a specific goal.
 * It is a collection of steps that are executed in order, with each step being a function
 * that takes the user's input and returns the next step to execute.
 *
 * @param name - The name of the scenario.
 * @param description - A description of the scenario.
 * @param steps - An array of steps that make up the scenario.
 * @returns A new scenario object.
 *
 * @example
 * const scenario = Scenario.create({
 *   name: "Browse Products",
 *   description: "Helps customers find and browse products",
 *   steps: [
 *     {
 *       name: "Greet User",
 *       description: "Welcome the user to the store",
 *       instructions:
 *         "Send a greeting message with options like 'View Products' or 'Search for a Product'.",
 *     },
 *     {
 *       name: "Product Search",
 *       description: "Assist the user in finding specific products",
 *       instructions:
 *         "Ask for the product name or category and display matching results.",
 *     },
 *     {
 *       name: "View Product Details",
 *       description:
 *         "Provide detailed information about a selected product",
 *       instructions:
 *         "Show product details, price, and an 'Add to Cart' option.",
 *     },
 *   ],
 * });
 */
export class Scenario extends CanCreate<IScenario> {
    readonly id = uuidv4();
    public name: string;
    public description: string;
    public steps: Step[];

    constructor({ name, description, steps }: IScenario) {
        super();
        this.name = name;
        this.description = description;
        this.steps = steps;
    }

    public addStep(step: Step): this {
        this.steps.push(step);
        return this;
    }

    static loadObject({
        name,
        description,
        steps,
    }: {
        name: string;
        description: string;
        steps: IStep[];
    }): Scenario {
        return new Scenario({
            name,
            description,
            steps: steps.map(Step.create),
        });
    }

    toString(): string {
        return JSON.stringify(
            {
                id: this.id,
                name: this.name,
                description: this.description,
                steps: this.steps.map((step) => JSON.parse(step.toString())),
            },
            null,
            4
        );
    }
}
