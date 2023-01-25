import axios, { AxiosRequestConfig } from 'axios'
import GPT3Tokenizer from "gpt3-tokenizer";

import { Prompt } from "@prompts/Prompt";
import { ModelProviderType } from "./ModelProvider";
import { ModelProvider } from "./ModelProvider";

/**
 * OpenAI Model Provider
 */
export class OpenAi extends ModelProvider {
  api: OpenAiApi;
  apiKey: string;

  constructor(apiKey: string, config?: Partial<OpenAIConfig>) {
    super(ModelProviderType.OpenAI);
    this.apiKey = apiKey;
    this.api = new OpenAiApi(this.apiKey);
  }

  generate = async (prompt: Prompt, config: OpenAIConfig) => {
    let cfg = { ...config };
    try {
      if (cfg.stop != null) {
        cfg.stop = unescapeStopTokens(config.stop);
      }

      const data = await this.api.createCompletion({
        prompt: prompt.format(),
        ...cfg,
      });

      return data?.choices?.[0].text as string;
    } catch (e) {
      // console.error(e);
    }
    return "failed";
  };
}

/**
 * API Client for interacting with OpenAi
 */
export interface CreateCompletionRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  stop: string | string[] | null;
}

export interface CreateCompletionResponse {
  
}

export class OpenAiApi {
  apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  createCompletion = async ( createCompletionRequest: CreateCompletionRequest, options?: AxiosRequestConfig): Promise<CreateCompletionResponse>) => {

  };
}

/** Configs */

export const DEFAULT_OPENAI_MODEL_CONFIG = {
  model: "text-davinci-003",
  max_tokens: 128,
  temperature: 0.7,
  stop: null,
};

export const OPENAI_MODEL_SETTINGS: {
  [key: string]: { maxLength: number };
} = {
  "text-davinci-003": {
    maxLength: 4000,
  },
  "text-davinci-002": {
    maxLength: 4000,
  },
  "code-davinci-002": {
    maxLength: 4000,
  },
  "text-curie-002": {
    maxLength: 2000,
  },
};

interface OpenAIConfig {
  model: string;
  temperature: number;
  max_tokens: number;
  stop: string[] | string | null;
}

/** Utilities */
const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

// replace any escaped stop tokens like "\\n" their unescaped versions
export const unescapeStopTokens = (stop_tokens: any) => {
  if (Array.isArray(stop_tokens)) {
    console.debug("found array of tokens");
    return stop_tokens.map((token) => {
      return JSON.parse(`"${token}"`);
    });
  } else {
    console.debug("found single token", stop_tokens);
    return JSON.parse(`"${stop_tokens}"`);
  }
};

export const countTokens = (text: string): number => {
  // do something here
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(text);
  return encoded.bpe.length;
};

export const splitTextByTokens = (
  text: string,
  maxTokens: number
): string[] => {
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(text);
  const res: string[] = [];
  for (let i = 0; i < encoded.text.length; i += maxTokens) {
    res.push(encoded.text.slice(i, i + maxTokens).join(""));
  }
  return res;
};
