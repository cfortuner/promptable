export class TokenBufferMemory {
    buffer: string = "";

    get() {
        return this.buffer;
    }

    set(_output: string, completion: string, promptText: string, _inputs: any) {
        this.buffer = promptText + completion;
    }
}