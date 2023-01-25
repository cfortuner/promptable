import dotenv from "dotenv";
dotenv.config();
import { PromptStep, SequentialChain, OpenAI, z } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

// A Prompt Step. The thing that runs the prompt
const step = new PromptStep(new OpenAI(apiKey), "voice")
  // Validators
  .inputs(
    z.object({
      text: z.string(),
      variables: z.any(),
    })
  )
  .outputs(z.object({ voice: z.string() }));

// Run the steps sequentially
const chain = new SequentialChain("First");

await chain.run({
  // The steps in the chain
  steps: [step],
  // Get's passed into the first step
  // Doing this b/c it's useful to separate data from code.
  // This way, you can run the prompt step again with different inputs.
  // rather than making a new prompt step or something
  inputs: {
    text: "hi",
    variables: {},
  },
  // Nothing yet
  outputs: {},
});

console.log(
  JSON.stringify({
    inputs: step.calls[0].inputs,
    outputs: step.calls[0].outputs,
  })
);

console.log("FINISHED");
