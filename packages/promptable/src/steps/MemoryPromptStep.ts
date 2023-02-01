import type { PromptStepArgs, PromptStepInput, PromptStepOutput } from './PromptStep';
import { PromptStep } from './PromptStep';
import { RunStepArgs } from './Step';

interface MemoryPromptStepInput extends PromptStepInput { }
interface MemoryPromptStepOutput extends PromptStepOutput { }

interface PromptMemory {
    get: () => string
    set: (output: string, completion: string, promptText: string) => void
}

interface MemoryPromptStepArgs extends PromptStepArgs<MemoryPromptStepInput, MemoryPromptStepOutput> {
    memory: PromptMemory;
}

export class MemoryPromptStep extends PromptStep<MemoryPromptStepInput, MemoryPromptStepOutput> {
    memory: PromptMemory;
    constructor({ memory, ...args }: MemoryPromptStepArgs) {
        super(args);
        this.memory = memory;
    }

    async _run(args: RunStepArgs<MemoryPromptStepInput, MemoryPromptStepOutput>) {
        const memory: string = this.memory.get();
        const { output, completion, promptText } = await super._run({ steps: args.steps, inputs: { ...args.inputs, memory } })
        this.memory.set(output, completion, promptText);
        return { output, completion, promptText }
    }
}