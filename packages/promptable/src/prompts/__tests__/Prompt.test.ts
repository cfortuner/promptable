import { Prompt } from "@prompts/Prompt";

test("Prompt Class", () => {
  const p = new Prompt("this is a {{test}}");

  // saves the template
  expect(p.template).toEqual("this is a {{test}}");

  // Valid, returns a new prompt
  const formattedPrompt = p.format({ test: "123" });
  expect(formattedPrompt.text).toEqual("this is a 123");
  expect(formattedPrompt).not.toBe(p);

  // Invalid
  // @ts-expect-error
  expect(p.format({ invalid: "123" }).text).toEqual("this is a {{test}}");
});
