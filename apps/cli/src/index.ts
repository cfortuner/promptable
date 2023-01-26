import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
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
const chain = new SequentialChain("Second");

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
});

console.log(step.calls);

console.log(
  JSON.stringify({
    inputs: step.calls[0].inputs,
    outputs: step.calls[0].outputs,
  })
);

await axios.post("http://localhost:3000/api/chains", {
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    chain: {
      name: step.name,
      inputs: step.calls[0].inputs,
      outputs: step.calls[0].outputs,
    },
  },
});

console.log("FINISHED");
