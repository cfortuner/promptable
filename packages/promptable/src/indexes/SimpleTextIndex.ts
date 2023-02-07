import { TextSplitter } from "@utils/TextSplitter";
import { Prompt } from "@prompts/Prompt";
import { ModelProvider } from "@model-providers/ModelProvider";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export class SimpleTextIndex {
    documents: { text: string }[];
    splitter: TextSplitter;
    chunks: { chunk: string, documentIndex: number }[] = [];

    constructor(documents: { text: string }[], { splitter }: { splitter: TextSplitter }) {
        this.documents = documents;
        this.splitter = splitter;
        this.createChunks();
    }

    async search(userQuery: string, { mode, prompt, provider }: { mode: "refine", prompt: Prompt, provider: ModelProvider }) {
        let answer = "NO PROVIDED ANSWER YET";
        for (const { chunk } of this.chunks) {
            //console.log("Chunk is: ", chunk);
            const formattedPrompt = prompt.format({ chunk, userQuery, answer });
            const tempAnswer = await provider.generate(formattedPrompt);
            // TODO(rohan): This is a total hack right now.
            if (tempAnswer !== "failed") {
                answer = tempAnswer;
            }
            await sleep(2000); // TODO(rohan): Implement proper rate limiting
        }
        return answer;
    }

    serialize() {
        return {
            documents: this.documents,
            splitter: this.splitter.serialize()
        }
    }

    protected createChunks() {
        this.documents.forEach((document, documentIndex) => {
            const chunks = this.splitter.splitText(document.text);
            chunks.forEach(chunk => {
                this.chunks.push({ chunk, documentIndex });
            });
        });
    }
}