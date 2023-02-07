import { Step, StepInput, StepOutput, RunStepArgs } from "./Step";
import { logger } from "@utils/Logger";
import { TextSplitter } from "@utils/TextSplitter";
import { SimpleTextIndex } from "../indexes/SimpleTextIndex";

interface CreateSimpleTextIndexStepInput extends StepInput {
    documents: string[];
}
interface CreateSimpleTextIndexStepOutput extends StepOutput { }

interface CreateSimpleTextIndexStepArgs<
    T extends CreateSimpleTextIndexStepInput,
    J extends CreateSimpleTextIndexStepOutput
> {
    name: string
    splitter: TextSplitter
}

export class CreateSimpleTextIndexStep<T extends CreateSimpleTextIndexStepInput, J extends CreateSimpleTextIndexStepOutput> extends Step<T, J, any> {
    splitter: TextSplitter;

    constructor({ name, splitter }: CreateSimpleTextIndexStepArgs<T, J>) {
        super(name || "CreateSimpleTextIndex");
        this.splitter = splitter;
    }

    async _run(args: RunStepArgs<CreateSimpleTextIndexStepInput, CreateSimpleTextIndexStepOutput>) {
        logger.info(`Running CreateSimpleTextIndexStep: ${this.name}, with args: ${args}`);
        const { documents, splitter } = args.inputs;
        const index = new SimpleTextIndex(documents, { splitter });
        return { index };
    }

    _serialize = () => {
        return {
            splitter: this.splitter.serialize()
        }
    }
}