import { Agent } from "..";
import { OpenAIApi, Configuration } from "openai";
import wiki from "wikijs"

const name = "Math"
const description = "I am an agent that knows how to do math calculations."
async function run(input: string) {
    return "not yet implemented"
}


export const mathAgent = new Agent(name, description, run);
