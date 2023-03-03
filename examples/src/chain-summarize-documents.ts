// /**
// Chains are pre-built workflows for executing specific tasks.
// The simplest chain is the LLMChain, a chain which combines a prompt and a model provider.
// This example uses LLMChain to use the OpenAI Completions API to generate a poem about the moon.

// This example also uses tracing to log the steps of the chain.
// Chains often have many steps, and tracing can help you understand what is happening in your chain.
// **/
// import dotenv from "dotenv";
// dotenv.config();
// import {
//   OpenAI,
//   Utils,
//   Loaders,
//   Templates,
//   Splitters,
// } from "@promptable/promptable";
// import { CombineDocumentsChain, LLMChain } from "./chains";

// const apiKey = process.env.OPENAI_API_KEY || "";

// export default async function run() {
//   const filepath = "./data/startup-mistakes.txt";
//   const loader = new Loaders.FileLoader();
//   let docs = await loader.load([filepath]);

//   const openai = new OpenAI(apiKey);

//   const summarizeChain = new LLMChain(Templates.Summarize, openai, {
//     model: "text-davinci-003",
//     max_tokens: 500,
//   });

//   const combineDocumentsChain = new CombineDocumentsChain(
//     new Splitters.SentenceTextSplitter(),
//     Utils.mergeDocumentsWithSeparator("\n\n"),
//     summarizeChain
//   );

//   const result = await combineDocumentsChain.run(docs, {
//     chunk: true,
//   });

//   console.log("result", result);
// }

export {};
