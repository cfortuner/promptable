/** 
Chains are pre-built workflows for executing specific tasks.

The MemoryLLMChain is a chain which combines a prompt, a model provider and memory.
Memory is a way to store and retrieve data between chain runs.

This example uses MemoryLLMChain to create a simple Chatbot based on a prompt.
BufferedChatInteractionMemory is a memory which stores the user and bot messages in a buffer,
up a max number of interactions (defaulted at Infinity).
MemoryLLMChain will automatically extract the memory from the BufferedChatInteractionMemory and
pass it to the prompt.
    
Note:
Since this example uses CLI input, which is not supported by pnpm, to run this example
cd into the examples directory and run `npm start chain-memory`
**/
import dotenv from "dotenv";
dotenv.config();
import { OpenAI, MemoryLLMChain, setTraceConfig, Trace, graphTraces, prompts, BufferedChatInteractionMemory } from "promptable";
import chalk from "chalk";
import enquirer from "enquirer";

const { prompt: query } = enquirer;

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
    const memory = new BufferedChatInteractionMemory();
    const memoryChain = new MemoryLLMChain(prompts.chatbot(), openai, memory);
    while (true) {
        // @ts-expect-error:
        const { userInput } = await query({ type: 'input', name: 'userInput', message: 'User: ' });
        if (userInput) {
            if (userInput === "exit") break;
            memory.addUserMessage(userInput);
            const botOutput = await memoryChain.run({ userInput });
            memory.addBotMessage(botOutput);
            console.log(chalk.yellow("Assisant:", botOutput));
        }
    }
    graphTraces(traces);
}
