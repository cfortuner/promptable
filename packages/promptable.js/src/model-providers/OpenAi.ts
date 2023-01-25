import axios, { AxiosRequestConfig } from "axios";
import GPT3Tokenizer from "gpt3-tokenizer";

import { Prompt } from "@prompts/Prompt";
import { ModelProviderType } from "./ModelProvider";
import { ModelProvider } from "./ModelProvider";
import { Configuration, OpenAIApi } from "openai";
import { unescapeStopTokens } from "src/utils/unescapeStopTokens";

/**
 * OpenAI Model Provider
 */
export class OpenAI extends ModelProvider {
  api: OpenAIApi;
  config: OpenAIConfig = DEFAULT_OPENAI_MODEL_CONFIG;

  constructor(apiKey: string, config?: Partial<OpenAIConfig>) {
    super(ModelProviderType.OpenAI);

    this.api = new OpenAIApi(
      new Configuration({
        apiKey: apiKey,
      })
    );

    if (config) {
      this.config = {
        ...this.config,
        ...config,
      };
    }
  }

  generate = async (prompt: Prompt) => {
    try {
      if (this.config.stop != null) {
        this.config.stop = unescapeStopTokens(this.config.stop);
      }

      const res = await this.api.createCompletion({
        prompt: prompt.format(),
        ...this.config,
      });

      return res.data;
    } catch (e) {
      // console.error(e);
    }
    return "failed";
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

/**
 * Count tokens in text using GPT3-Tokenizer
 *
 * @param text
 * @returns
 */
export const countTokens = (text: string): number => {
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(text);
  return encoded.bpe.length;
};
