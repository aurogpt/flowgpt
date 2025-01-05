import { v4 as uuidv4 } from "uuid";
import type { Scenario } from "./scenario";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { MarkdownPromptLoader } from "./utils/markdown-prompt-loader";
import { CanFormatString } from "./base/can-format-string";
import { z } from "zod";
import type { Step } from "./step";

export type IFlowBot = {
    name: string;
    description: string;
    scenarios: Scenario[];
    instructionModel: BaseChatModel;
    detectionModel: BaseChatModel;
};

export const detectResponse = z.object({
    scenarioId: z.string(),
    stepId: z.string(),
});

export const instructionResponse = z.object({
    what_bot_should_do: z.string(),
    should_reply: z.boolean(),
});

export class FlowBot extends CanFormatString {
    readonly id = uuidv4();
    public name: string;
    public description: string;
    public scenarios: Scenario[];
    public instructionModel: BaseChatModel;
    public detectionModel: BaseChatModel;
    public instructionModelPrompt: string;
    public detectionModelPrompt: string;

    constructor(object: IFlowBot) {
        super();
        this.name = object.name;
        this.description = object.description;
        this.scenarios = object.scenarios;
        this.instructionModel = object.instructionModel;
        this.detectionModel = object.detectionModel;
        this.instructionModelPrompt = MarkdownPromptLoader.fromFile(
            "./contents/instruction-prompt.md"
        ).getContent();
        this.detectionModelPrompt = MarkdownPromptLoader.fromFile(
            "./contents/detection-prompt.md"
        ).getContent();
    }

    static create(object: IFlowBot): FlowBot {
        return new FlowBot(object);
    }

    private findCurrentStep(stepId: string) {
        for (const scenario of this.scenarios) {
            const step = scenario.steps.find((step) => step.id === stepId);
            if (step) {
                return { scenario, step };
            }
        }
        throw new Error(`Step with ID '${stepId}' not found in any scenario.`);
    }

    private findNextStep(currentStepId: string, steps: Step[]): Step | null {
        const currentIndex = steps.findIndex(
            (step) => step.id === currentStepId
        );
        if (currentIndex >= 0 && currentIndex < steps.length - 1) {
            return steps[currentIndex + 1];
        }
        return null;
    }

    async detectCurrentStage(input: string) {
        const llm = this.detectionModel.withStructuredOutput(detectResponse);
        const prompt = this.formatString(this.detectionModelPrompt, {
            input,
            scenarios: this.scenarios.map((s) => s.toString()).join(", "),
        });

        const output = await llm.invoke(prompt);
        return this.findCurrentStep(output.stepId);
    }

    async invoke(input: string) {
        const { scenario, step: currentStep } = await this.detectCurrentStage(
            input
        );
        const nextStep = this.findNextStep(currentStep.id, scenario.steps);

        if (!nextStep) {
            throw new Error(
                `No next step found for step ID '${currentStep.id}'.`
            );
        }

        return nextStep.instructions;
    }
}
