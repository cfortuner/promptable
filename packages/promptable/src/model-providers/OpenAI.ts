import axios, { AxiosRequestConfig } from "axios";
import GPT3Tokenizer from "gpt3-tokenizer";

import { Prompt } from "@prompts/Prompt";
import { ModelProviderType } from "./ModelProvider";
import { ModelProvider } from "./ModelProvider";
import { Configuration, OpenAIApi } from "openai";
import { unescapeStopTokens } from "@utils/unescape-stop-tokens";
import { logger } from "@utils/Logger";
import { parseJsonSSE } from "@utils/parse-json-sse";

/**
 * OpenAI Model Provider
 */
export class OpenAI extends ModelProvider {
  apiKey: string;
  api: OpenAIApi;
  config: OpenAIConfig = DEFAULT_OPENAI_MODEL_CONFIG;

  constructor(apiKey: string, config?: Partial<OpenAIConfig>) {
    super(ModelProviderType.OpenAI);
    this.apiKey = apiKey;
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

  generate = async (prompt: Prompt, variables: { [key: string]: any }) => {
    try {
      if (this.config.stop != null) {
        this.config.stop = unescapeStopTokens(this.config.stop);
      }

      const promptText = prompt.format(variables);

      logger.debug(
        `OpenAi generate prompt: ${promptText}, config: ${this.config}`
      );

      const res = await this.api.createCompletion({
        prompt: prompt.format(variables),
        ...this.config,
      });

      logger.debug(`OpenAi generate response: ${res}`);

      return res.data.choices[0]?.text || "";
    } catch (e) {
      console.log(e);
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
