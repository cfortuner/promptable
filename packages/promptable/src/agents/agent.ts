import { OpenAIApi, Configuration, type ChatCompletionRequestMessage } from "openai";

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
    const conversation : ChatCompletionRequestMessage[] = [
        { role: "system", content: "I am an agent who makes calls to agents and receives information from them. Use this information to answer the user's question." },
        { role: "user", content: prompt}
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
    conversation.push({role: "assistant", content: callMessage})

    // use agent, add results to director information
    const info = await agent.run(prompt);
    const infoMessage = `@${agent.name} found information - ${info}`
    conversation.push({role: "assistant", content: infoMessage})


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