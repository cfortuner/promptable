import { OpenAIApi, Configuration, type ChatCompletionRequestMessage } from "openai";
import wiki from "wikijs"

export class Agent {
    name: string;
    prompt: string;
    run: (input: string) => Promise<string>

    constructor(name: string, prompt: string, run: (input: string) => Promise<string>) {
        this.name = name;
        this.prompt = prompt;
        this.run = run;
    }
}

export async function agentRun(prompt: string, agents: Agent[]) {
    const conversation: ChatCompletionRequestMessage[] = [
        { role: "system", content: "I am an agent who makes calls to agents and receives information from them. Use this information to answer the user's question." },
        { role: "user", content: prompt }
    ];

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // TODO: find appropriate agent to use for prompt
    // implement vector similarity search comparing hypothetical tool for prompt with agent name/description
    const agent = agents[0];

    const callMessage = `Making call to @${agent.name}: ${prompt}`
    console.log(`@director: ${callMessage}`)
    conversation.push({ role: "assistant", content: callMessage })

    // use agent, add results to director information
    const info = await agent.run(prompt);
    const infoMessage = `@${agent.name} found information - ${info}`
    conversation.push({ role: "assistant", content: infoMessage })


    // director thought based on prompt and information
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversation,
    });

    const answer = response.data.choices[0]?.message?.content;
    if (answer === undefined) {
        return "no answer"
    }

    return answer
}

async function chat(conversation: ChatCompletionRequestMessage[]) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversation,
    });

    const answer = response.data.choices[0]?.message?.content;
    if (answer === undefined) {
        return "undefined chat response!"
    }

    return answer;
}

function parseAction(text: string) {
    const input = text;
    const regex = /\[(.*?)\]/; // match text between square brackets
    const match = input.match(regex);
    const output = match ? match[1] : "COULDN'T PARSE ACTION"; // extract matched text or set empty string
    if (output == "COULDN'T PARSE ACTION") {
        console.log("ERROR: COULDN'T PARSE ACTION")
    }
    return output
}

// ReAct: https://arxiv.org/pdf/2210.03629.pdf
export async function reactRun(prompt: string) {
    console.log("PROMPT", prompt);

    const monologue: ChatCompletionRequestMessage[] = [
        { role: "system", content: "I am an agent who makes calls to agents and receives information from them. Use this information to answer the user's question." },
        { role: "user", content: prompt }
    ];

    var finished = false;

    // thought
    monologue[0] = { role: "system", content: thoughtSystemPrompt }
    const thought = await chat(monologue);
    monologue.push({ role: "assistant", content: thought })
    console.log("THOUGHT:", thought)

    // action
    monologue[0] = { role: "system", content: actionSystemPrompt }
    const action = await chat(monologue);
    monologue.push({ role: "assistant", content: action });
    const wikiTitle = (await wiki().search(parseAction(action), 1)).results[0];
    const wikiSummary = await (await wiki().page(wikiTitle)).summary();
    // console.log("wiki summary:", wikiSummary)
    monologue.push({ role: "assistant", content: wikiSummary });
    console.log("ACTION:", action)


    // observation
    monologue[0] = { role: "system", content: observationSystemPrompt }
    const observation = await chat(monologue);
    console.log("OBSERVATION:", observation)
}

const thoughtSystemPrompt = `You are an assistant who solves the user's prompt by giving thoughts, actions, and observations. Don't ask the user for any information, simply say what you should search for.

Complete the next thought

Here are examples:
User: What is the elevation range for the area that the eastern sector of the
Colorado orogeny extends into?
Assistant: I need to search Colorado orogeny, find the area that the eastern sector
of the Colorado orogeny extends into, then find the elevation range of the
area.
`

const actionSystemPrompt = `You are an agent who solves the user's prompt by giving thoughts, actions, and observations.

Complete the action based on the given thought. Actions are formatted in the following, "Search [topic]", where topic is the name for a valid wikipedia page you want to search fore

Here are examples:
Question: What is the elevation range for the area that the eastern sector of the
Colorado orogeny extends into?
Thought: I need to search Colorado orogeny, find the area that the eastern sector
of the Colorado orogeny extends into, then find the elevation range of the
area.
Action: Search [Colorado orogeny]
`

const observationSystemPrompt = `You are an agent who solves the user's prompt by giving thoughts, actions, and observations.

Make an observation based on the following information you received in your search

Here is an example:
Question: What is the elevation range for the area that the eastern sector of the
Colorado orogeny extends into?
Thought: I need to search Colorado orogeny, find the area that the eastern sector
of the Colorado orogeny extends into, then find the elevation range of the
area.
Action: Search [Colorado orogeny]
Observation: The Colorado orogeny was an episode of mountain building (an orogeny) in
Colorado and surrounding areas.
`