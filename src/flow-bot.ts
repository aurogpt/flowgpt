import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { CanFormatString } from "./utils/can-format-string";

// Types
import type { Scenario } from "./scenario";
import type { Step } from "./step";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

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

/**
 * A FlowBot is a bot that follows a predefined sequence of steps to achieve a specific goal.
 * It is a collection of scenarios that are executed in order, with each scenario being a sequence of steps.
 *
 * @param name - The name of the flow bot.
 * @param description - A description of the flow bot.
 * @param scenarios - An array of scenarios that make up the flow bot.
 * @param instructionModel - The model to use for generating instructions.
 * @param detectionModel - The model to use for detecting the current stage.
 * @returns A new flow bot object.
 *
 * @example
 * const flowBot = FlowBot.create({
 *   name: "Test Flow Bot",
 *   description: "A test flow bot",
 *   scenarios,
 *   instructionModel: new ChatOpenAI({
 *     modelName: "gpt-4o",
 *     apiKey: "sk-XXXXXX",
 *   }),
 *   detectionModel: new ChatOpenAI({
 *     apiKey: "sk-XXXXXX",
 *   }),
 * });
 */
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
        this.instructionModelPrompt = `
        You are BossGPT, a system designed to guide other bots on their next actions based on a given scenario and step. Please always give next action for the bot neither previous nor for user.

        ### Current Inputs:

        -   **Scenario Context:** "{{scenario}}"
        -   **Current Step ID:** "{{stepId}}"
        -   **User Interaction History:** "{{input}}"

        ### Task:

        Analyze the provided information and determine the next best action for the bot. Your response should be:

        1. **Clear:** Provide a concise action the bot should perform next.
        2. **Contextual:** Ensure your suggestion aligns with the scenario and the current step.
        3. **Actionable:** Offer a specific instruction or decision the bot can implement immediately.
        `;

        this.detectionModelPrompt = `
        You are an advanced AI system designed to analyze input history, detect the appropriate scenario, and identify the user's current step within that scenario.

        Here are the scenarios:

        {{ scenarios }}

        Given the following input history, identify the scenario and step that the user is currently in:

        {{ input }}
        `;
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
