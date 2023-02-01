import dotenv from "dotenv";
dotenv.config();
import { MemoryPromptStep, OpenAI, Prompt, PausingStateMachineStep } from "promptable";
import enquirer from "enquirer";
import { ChatInteractionMemory } from "promptable";
import { logger } from "./utils/Logger"

const { prompt: ePrompt } = enquirer;

const apiKey = process.env.OPENAI_API_KEY || "missing";
const openai = new OpenAI(apiKey);
const memory = new ChatInteractionMemory();

const chatPrompt = new Prompt(`
You are Assistant. Help the user as much as possible.
{{memory}}
User: {{userInput}}
Assistant:
`.trim(), ["userInput", "memory"]);

const chatbot = new MemoryPromptStep({
    name: "ChatBotMemoryPrompt",
    prompt: chatPrompt,
    provider: openai,
    inputNames: ["memory", "userInput"], // FIXME(rohan): This seems repetitive
    outputMap: { output: "assistantResponse" },
    memory
});

export default async function run() {
    logger.settings.minLevel = 5;
    while (true) {
        // @ts-ignore
        const { inputPrompt } = await ePrompt({ type: 'input', name: 'inputPrompt', message: 'User: ' });
        memory.addUserInput(inputPrompt);
        const result = await chatbot.run({ inputs: { userInput: inputPrompt }, steps: [] });
        console.log(`Assistant:${result.assistantResponse}`);
    }
}