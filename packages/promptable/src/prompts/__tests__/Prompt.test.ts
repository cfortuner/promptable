import { prompt } from "@prompts/Prompt";

const PROMPT_TEXT = "this is a {{test}}";

describe("prompt", () => {
  test("should throw type errors if prompt requires variables but does not provide them", () => {
    // @ts-expect-error
    prompt(PROMPT_TEXT, {});

    // @ts-expect-error
    expect(prompt(PROMPT_TEXT).text).toEqual(PROMPT_TEXT);
  });

  test("Can serialize prompt to JSON", () => {
    const variables = { test: "test" };
    const p = prompt(PROMPT_TEXT, variables)
    const configuration = { max_tokens: 128, stop: null, temperature: 0.7 };
    expect(p.toJSON()).toEqual({ 
      configuration,
      variables,
      text: "this is a test",
      template: {
        configuration,
        text: PROMPT_TEXT,
      }
    });
  });

  test("Can clone prompt", () => {
    const variables = { test: "test" };
    const p = prompt(PROMPT_TEXT, variables);
    const pClone = p.clone({ variables: { test: "test2" } })
    expect(pClone.text).toEqual("this is a test2")
  });

});

