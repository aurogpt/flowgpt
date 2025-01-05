import { v4 as uuidv4 } from "uuid";
import { Step, type IStep } from "./step";
import { CanCreate } from "./base/can-create";

interface IScenario {
    name: string;
    description: string;
    steps: Step[];
}

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
