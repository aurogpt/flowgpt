import { v4 as uuidv4 } from "uuid";

export type IStep = {
    name: string;
    description: string;
    instructions: string;
};

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
