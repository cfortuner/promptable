import { utils, OpenAI, Prompt } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

const run = async (args: string[]) => {
  const openai = new OpenAI(apiKey);

  const prompt = new Prompt("Write a poem about {{topic}}:", ["topic"]);
  await openai.stream(
    prompt,
    {
      topic: "dogs",
    },
    (response) => {
      console.log(response);
    }
  );
};

export default run;
