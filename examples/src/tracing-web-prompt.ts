import {
  trace,
  setTraceConfig,
  sendTraceToServer,
  Prompt,
  OpenAI,
} from "@promptable/server";
import { pipeAsync } from "ramda-async";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || "missing";

/**
 * An example showing how to send traces to the promptable web server.
 *
 * @param args
 */
const run = async (args: string[]) => {
  const openai = new OpenAI(apiKey);

  setTraceConfig({
    send: (trace) => {
      console.log("Received Trace", trace);
      sendTraceToServer(trace);
    },
  });

  const t = trace("tracing-web-prompt", async () => {
    const step1 = trace(
      "Create Poem about Animal",
      async (animal: string) => {
        const writePoemPromptText = new Prompt(
          "Write a poem about {{topic}}:",
          ["topic"]
        ).format({
          topic: animal,
        });
        const poem = await openai.generate(writePoemPromptText);

        return {
          poem,
        };
      },
      ["animal", "poem"]
    );
    const step2 = trace(
      "Remix Poem into Pirate Style",
      async (props: { poem: string }) => {
        const remixPoemPromptText = new Prompt(
          "Rewrite the poem in the style of a Pirate's writing: \n{{poem}}",
          ["poem"]
        ).format({
          poem: props.poem,
        });
        const remixedPoem = await openai.generate(remixPoemPromptText);
        return {
          remixedPoem,
        };
      },
      ["remix", "pirate"]
    );
    const step3 = trace(
      "Review the Poem",
      async (props: { remixedPoem: string }) => {
        const reviewPoemPromptText = new Prompt(
          "You are given the following poem\n{{poem}}\n Describe the author and subject of the poem",
          ["poem"]
        ).format({
          poem: props.remixedPoem,
        });
        const review = await openai.generate(reviewPoemPromptText);
        return {
          review,
        };
      },
      ["review"]
    );

    // pipe a few functions together
    const pipeline = pipeAsync(step1, step2, step3);

    const result = await pipeline("dog");
    console.log(result.review);
  });

  await Promise.all([t()]);
};

export default run;
