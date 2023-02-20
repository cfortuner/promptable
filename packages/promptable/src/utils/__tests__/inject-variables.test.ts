import { injectVariables } from "@utils/inject-variables";

test("injectVariables", () => {
  expect(injectVariables("this is a test", {})).toEqual("this is a test")

  expect(injectVariables("this is a {{test}}", { test: "asdf" })).toEqual("this is a asdf")
  expect(injectVariables("this is a {{test}}{{test2}}", { test: "as", test2: "df" })).toEqual("this is a asdf")
  expect(injectVariables("this is a {{test}}{{test}}", { test: "as" })).toEqual("this is a asas")

  // @ts-expect-error
  expect(injectVariables("this is a {{test2}}", { test: "asdf" })).toEqual("this is a {{test2}}")
});
