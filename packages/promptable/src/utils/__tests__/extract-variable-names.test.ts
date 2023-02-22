import { extractVariableNames } from "@utils/extract-variable-names";

test("extractVariableNames", () => {
  expect(extractVariableNames("this is a test.")).toEqual([]);
  expect(extractVariableNames("this is a {{test}}.")).toEqual(["test"]);
  expect(extractVariableNames("this is a {{test}} {{test}}.")).toEqual([
    "test",
  ]);
  expect(extractVariableNames("this is a {{test}} {{test2}}.")).toEqual([
    "test",
    "test2",
  ]);
  expect(extractVariableNames("{{test}}{{test2}}")).toEqual(["test", "test2"]);
  expect(extractVariableNames("{{test}}{{test2}}{{test3}}")).toEqual([
    "test",
    "test2",
    "test3",
  ]);
});
