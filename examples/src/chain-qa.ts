/** 
Chains are pre-built workflows for executing specific tasks.
The simplest chain is the LLMChain, a chain which combines a prompt and a model provider.
This example uses LLMChain to use the OpenAI Completions API to generate a poem about the moon.

This example also uses tracing to log the steps of the chain. 
Chains often have many steps, and tracing can help you understand what is happening in your chain.
**/
import dotenv from "dotenv";
dotenv.config();
import {
  Prompt,
  OpenAI,
  LLMChain,
  setTraceConfig,
  Trace,
  graphTraces,
} from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

export default async function run() {
  const traces: Trace[] = [];

  setTraceConfig({
    send: (trace) => {
      console.log("Received Trace", trace);
      traces.push(trace);
    },
  });

  const openai = new OpenAI(apiKey);

  const writePoemPrompt = new Prompt("Write a poem about {{topic}}:", [
    "topic",
  ]);

  const llmChain = new LLMChain(writePoemPrompt, openai);

  const poem = await llmChain.run({ topic: "the moon" });

  console.log(poem);

  graphTraces(traces);
}
