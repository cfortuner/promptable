import GPT3Tokenizer from "gpt3-tokenizer";


function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
    }
}


export class SimpleTokenSplitter {
    tokenizer: GPT3Tokenizer;
    constructor(public maxTokens: number) {
        this.tokenizer = new GPT3Tokenizer({ type: "gpt3" });
    }

    splitText(text: string): string[] {
        const { bpe } = this.tokenizer.encode(text);
        const chunked = [...chunks(bpe, this.maxTokens)];
        return chunked.map(chunk => this.tokenizer.decode(chunk));
    }
}