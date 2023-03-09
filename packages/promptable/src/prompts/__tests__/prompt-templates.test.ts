import {
    QA,
    ExtractText,
    Summarize,
    Chatbot,
    ExtractJSON,
    ExtractCSV,
    FixMarkup,
} from "@prompts/prompt-templates";
import { Expect, Equal } from "@utils/__tests__/type-utils.test";
import { ExtractVariableNames } from "@utils/type-utils";

test("ExtractVariableNames", () => {
  // These tests will cause a compile time error if the types don't match
  type tests = [
        Expect<Equal<
            ExtractVariableNames<typeof QA.text>, 
            Array<"document" | "question">
        >>,
        Expect<Equal<
            ExtractVariableNames<typeof ExtractText.text>, 
            Array<"document" | "question">
        >>,
        Expect<Equal<
            ExtractVariableNames<typeof Summarize.text>, 
            Array<"document">
        >>,
        Expect<Equal<
            ExtractVariableNames<typeof Chatbot.text>, 
            Array<"memory" | "userInput">
        >>,
        Expect<Equal<
            ExtractVariableNames<typeof ExtractJSON.text>, 
            Array<"data" | "type">
        >>,
        Expect<Equal<
            ExtractVariableNames<typeof ExtractCSV.text>, 
            Array<"data" | "headers">
        >>,
        Expect<Equal<
            ExtractVariableNames<typeof FixMarkup.text>,
            Array<"markupLanguage" | "documentType" | "markup">
        >>,
    ];
});
