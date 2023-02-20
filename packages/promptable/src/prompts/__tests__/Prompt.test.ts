import { Prompt, prompt } from '@prompts/Prompt';

test("Prompt Class", () => {
    const p = new Prompt("this is a {{test}}", ['test']);
    expect(p.format({ test: "123" })).toEqual("this is a 123");
    // @ts-expect-error
    expect(p.format({ invalid: "123" })).toEqual("this is a {{test}}");
})

test("Prompt Class", () => {
    const p = prompt("this is a {{test}}", ['test']);
    expect(p.format({ test: "123" })).toEqual("this is a 123");
    // @ts-expect-error
    expect(p.format({ invalid: "123" })).toEqual("this is a {{test}}");
})