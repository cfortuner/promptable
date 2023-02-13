import { utils, OpenAI, Prompt } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

const run = async (args: string[]) => {
  const openai = new OpenAI(apiKey);

  const prompt = new Prompt("Write a poem about {{topic}}:", ["topic"]);

  const promptText = prompt.format({
    topic: "dogs",
  });

  await openai.stream(promptText, (chunk) => {
    console.log(chunk);
  });
};

export default run;
