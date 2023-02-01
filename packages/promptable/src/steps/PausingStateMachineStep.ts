import { Step, StepInput, StepOutput, RunStepArgs } from "./Step";
import { logger } from "@utils/Logger";


interface PausingStateMachineStepInput extends StepInput { }
interface PausingStateMachineStepOutput extends StepOutput { }

interface PausingStateMachineStepArgs<
    T extends PausingStateMachineStepInput,
    J extends PausingStateMachineStepOutput
> {
    inputNames: (keyof T)[];
    name?: string;
    steps: Steps
    initialStep: keyof Steps;
}

type Steps = { [key: string]: { step: Step<StepInput, StepOutput, any>, nextStep: keyof Steps } };


export class PausingStateMachineStep<T extends PausingStateMachineStepInput, J extends PausingStateMachineStepOutput> extends Step<T, J, any> {
    nodes: Steps;
    currentStep: keyof Steps;
    inputNames: (keyof T)[] = [];

    constructor({ name, steps, initialStep, inputNames }: PausingStateMachineStepArgs<T, J>) {
        super(name || "PausingStateMachine");
        this.nodes = steps;
        this.currentStep = initialStep;
        this.inputNames = inputNames;
    }

    async _run(args: RunStepArgs<PausingStateMachineStepInput, PausingStateMachineStepOutput>) {
        logger.info(`Running PausingStateMachine: ${this.name}, with args: ${args} and currentStep: ${this.currentStep}`);

        const node = this.nodes[this.currentStep];
        const output = await node.step.run(args);

        logger.debug(`PausingStateMachine: ${this.name} in step: ${this.currentStep} output: ${output}`);
        logger.debug(`PausingStateMachine: ${this.name} transitioning to step: ${node.nextStep}`);
        this.currentStep = node.nextStep;

        return output;
    }

    _serialize = () => {
        // TODO: fix this serialization
        return {
            currentStep: this.currentStep,
            nodes: Object.keys(this.nodes).reduce((acc, key: string) => {
                // @ts-expect-error
                acc[key] = {
                    step: this.nodes[key].step.serialize(),
                    nextStep: this.nodes[key].nextStep
                }
                return acc
            }, {})
        }
    }

}