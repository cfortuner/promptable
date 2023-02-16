import axios from "axios";
import * as promptable from "promptable";
import { NextApiRequest, NextApiResponse } from "next";

// Note: this only works for one client at a time.
const chatHistory = new promptable.BufferedChatMemory();

interface Message {
  isUserMessage: boolean;
  text: string;
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.body", req.body);
  const { userInput, clear, prevMessages } = req.body;

  // clear the chat history
  if (clear) {
    chatHistory.clear();
    return res.status(200).json({});
  }

  const messages = prevMessages as Message[];

  // We don't know what the last message was b/c we streamed it to the client.
  // so we need to find it in the list of previous messages.
  const lastBotMessage = messages.reverse().find((m) => !m.isUserMessage);
  console.log("The last bot message was:", lastBotMessage);
  chatHistory.addBotMessage(lastBotMessage?.text ?? "");

  // then add the user message
  chatHistory.addUserMessage(userInput);

  const chatbotPrompt = promptable.prompts.chatbot();

  const promptText = chatbotPrompt.format({
    memory: chatHistory.get(),
    userInput,
  });

  const oaiRes = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: promptText,
      model: "text-davinci-003",
      max_tokens: 1000,
      stream: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      responseType: "stream",
    }
  );

  oaiRes.data.pipe(res);
}
