import { Agent } from "..";
import { OpenAIApi, Configuration } from "openai";
import wiki from "wikijs"

const name = "Wikipedia"
const description = "I am an agent that knows how to look up information about any topic, be it a person, place, thing, or event."
async function run(input: string) {
    console.log("@wikipedia: Finding information for - ", input)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // TODO: add generic prompt property to Agent class
    const prompt = `I am an agent that knows how to look up information about any topic, be it a person, place, thing, or event. When I need to look up a topic, I say, "Func[info]: <TOPIC>" to look up information for <TOPIC>. Make sure the topic is the title for a wikipedia page.

Examples:
Q: I need information on Bill Gates
Func[info]: Bill Gates
A: {info about Bill Gates}

Here is the question:
Q: ${input}`
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 200,
        temperature: 0,
        stop: "A: "
    });
    const s = response.data.choices[0]?.text;
    if (s === undefined) {
        return "completion error";
    }
    const searchString = "Func[info]:";

    const index = s.indexOf(searchString);
    if (index !== -1) {
        const result = s.substring(index + searchString.length);
        console.log("@wikipedia: Searching for wikipedia page - ", result)
        // TODO: ERROR HANDLING:
        const res = await wiki().page(result).then(page => page.summary());
        console.log("@wikipedia: Found information - ", res)
        return res;
    }

    return "no wiki page found"
}


export const wikipediaAgent = new Agent(name, description, run);
