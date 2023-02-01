import dotenv from "dotenv";
dotenv.config();
import { MemoryPromptStep, OpenAI, Prompt, PausingStateMachineStep } from "promptable";
import enquirer from "enquirer";
import { TokenBufferMemory } from "promptable";
import { logger } from "./utils/Logger"


const { prompt: ePrompt } = enquirer;

const apiKey = process.env.OPENAI_API_KEY || "missing";
const openai = new OpenAI(apiKey);
const memory = new TokenBufferMemory();

const greetingPrompt = new Prompt(`
You are Assistant. Help the user as much as possible.
user: {{userInput}}
Assistant:
`.trim(), ["userInput"]);
const followUpPrompt = new Prompt(`
{{memory}}
user: {{userInput}}
Assistant:
`.trim(), ["userInput"]);

const chatbot = new PausingStateMachineStep({
    name: "Chatbot",
    initialStep: "greeting",
    inputNames: ["userInput"],
    steps: {
        greeting: {
            step: new MemoryPromptStep({
                name: "Greeting",
                prompt: greetingPrompt,
                provider: openai,
                inputNames: ["userInput"],
                outputMap: { output: "assistantResponse" },
                memory
            }),
            nextStep: "followUp",
        },
        followUp: {
            step: new MemoryPromptStep({
                name: "Follow Up",
                prompt: followUpPrompt,
                provider: openai,
                inputNames: ["userInput"],
                outputMap: { output: "assistantResponse" },
                memory
            }),
            nextStep: "followUp",
        },
    }
});

export default async function run() {
    while (true) {
        logger.settings.minLevel = 5;
        // @ts-ignore
        const { inputPrompt } = await ePrompt({ type: 'input', name: 'inputPrompt', message: 'User: ' });
        const result = await chatbot.run({ inputs: { userInput: inputPrompt }, steps: [] });
        console.log(`Assistant:${result.assistantResponse}`)
    }
}