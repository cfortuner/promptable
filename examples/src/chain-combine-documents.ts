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
  OpenAI,
  CharacterTextSplitter,
  utils,
  FileLoader,
} from "@promptable/promptable";
import { CombineDocumentsChain } from "./chains";

export default async function run() {
  const filepath = "./data/startup-mistakes.txt";
  const loader = new FileLoader(filepath);
  let docs = await loader.load();

  const combineDocumentsChain = new CombineDocumentsChain(
    new CharacterTextSplitter(),
    utils.mergeDocumentsWithSeparator("\n\n")
  );

  const result = await combineDocumentsChain.run(docs, {
    chunk: true,
    chunkSize: 500,
  } as any);

  console.log("result", result);
}
