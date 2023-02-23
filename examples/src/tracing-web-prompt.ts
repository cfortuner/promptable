import { trace, setTraceConfig, sendTraceToServer } from "@promptable/tracing";
import { Prompt, OpenAI } from "@promptable/promptable";
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
        const writePoemPrompt = new Prompt("Write a poem about {{topic}}:", {
          topic: animal,
        });
        const { text: poem } = await openai.generate(writePoemPrompt);

        return {
          poem,
        };
      },
      ["animal", "poem"]
    );
    const step2 = trace(
      "Remix Poem into Pirate Style",
      async (props: { poem: string }) => {
        const remixPoemPrompt = new Prompt(
          "Rewrite the poem in the style of a Pirate's writing: \n{{poem}}",
          {
            poem: props.poem,
          }
        );
        const { text: remixedPoem } = await openai.generate({
          text: remixPoemPrompt.text,
        });
        return {
          remixedPoem,
        };
      },
      ["remix", "pirate"]
    );
    const step3 = trace(
      "Review the Poem",
      async (props: { remixedPoem: string }) => {
        const reviewPoemPrompt = new Prompt(
          "You are given the following poem\n{{poem}}\n Describe the author and subject of the poem",
          {
            poem: props.remixedPoem,
          }
        );
        const { text: review } = await openai.generate({
          text: reviewPoemPrompt.text,
        });
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
