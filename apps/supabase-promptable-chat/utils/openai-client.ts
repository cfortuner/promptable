import { OpenAI } from 'promptable';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI env var');
}

export const openaiClient = new OpenAI(`${process.env.OPENAI_API_KEY}`);
