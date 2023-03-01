import dotenv from "dotenv";
dotenv.config();
import enquirer from "enquirer";

const { prompt: query } = enquirer;
import { BufferedChatMemory, OpenAI } from "@promptable/promptable";
import chalk from "chalk";

const run = async (args: string[]) => {
  const apiKey = process.env.OPENAI_API_KEY || "";
  const openai = new OpenAI(apiKey);

  const SystemMessage = {
    role: "system",
    content: "You are a helpful assistant.",
  };

  console.log(chalk.blue("Chatting with OpenAI..."));

  const memory = new BufferedChatMemory();

  while (true) {
    const { userInput } = (await query({
      type: "input",
      name: "userInput",
      message: "User: ",
    })) as {
      userInput: string;
    };

    if (userInput) {
      if (userInput === "exit") break;

      memory.addUserMessage(userInput);
      const res = await openai.chat({ messages: memory.getChatMessages() });
      memory.addBotMessage(res.message.content);

      console.log(chalk.yellow("Assistant:", res.message.content));
    }
  }
};

export default run;
