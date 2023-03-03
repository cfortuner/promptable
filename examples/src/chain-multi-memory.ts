// /**
// Chains are pre-built workflows for executing specific tasks.

// The MemoryLLMChain is a chain which combines a prompt, a model provider and memory.
// Memory is a way to store and retrieve data between chain runs.

// This example exnteds the chain-memory example to support multiple users.

// This works by just creating a map of users to memory & chain.
// **/
// import dotenv from "dotenv";
// dotenv.config();
// import { OpenAI, Templates } from "@promptable/promptable";
// import chalk from "chalk";
// import enquirer from "enquirer";
// import { MemoryLLMChain } from "./chains";

// const { prompt: query } = enquirer;

// const apiKey = process.env.OPENAI_API_KEY || "missing";

// export default async function run() {
//   const openai = new OpenAI(apiKey);
//   const map = new Map<
//     string,
//     {
//       memory: BufferedChatMemory;
//       chain: MemoryLLMChain<any>;
//     }
//   >();

//   const users = ["User1", "User2", "User3"];

//   // Create a memory chain for each user
//   for (const user of users) {
//     const memory = new BufferedChatMemory();
//     const memoryChain = new MemoryLLMChain(
//       promptTemplates.Chatbot,
//       openai,
//       memory
//     );

//     map.set(user, {
//       memory: memory,
//       chain: memoryChain,
//     });
//   }

//   // Run the memory chain for each user
//   for (const user of users) {
//     const userInput = `Hello, I am ${user}`;
//     console.log(chalk.blue(user, ":", userInput));
//     const { chain, memory } = map.get(user)!;
//     memory.addUserMessage(userInput);
//     const botOutput = await chain.run({ userInput });
//     memory.addBotMessage(botOutput);
//     console.log(chalk.yellow("Assistant:", botOutput));
//   }
// }
export {};
