import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider, ModelProviderType } from "./ModelProvider";
import { ModelProvider } from "./ModelProvider";
import { Configuration, OpenAIApi, CreateEmbeddingRequestInput } from "openai";
import { unescapeStopTokens } from "@utils/unescape-stop-tokens";
import GPT3Tokenizer from "gpt3-tokenizer";

/**
 * OpenAI Model Provider
 */
export class OpenAI extends ModelProvider implements CompletionsModelProvider {
  apiKey: string;
  api: OpenAIApi;
  config: OpenAIConfig = DEFAULT_OPENAI_MODEL_CONFIG;
  tokenizer;

  constructor(apiKey: string, config?: Partial<OpenAIConfig>) {
    super(ModelProviderType.OpenAI);
    this.apiKey = apiKey;
    this.tokenizer = new GPT3Tokenizer({ type: "gpt3" });
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

      const res = await this.api.createCompletion({
        prompt: promptText,
        ...this.config,
      });

      return res.data.choices[0]?.text || "";
    } catch (e) {
      console.log(e);
    }
    return "failed";
  };

  /**
   * Count tokens in text using GPT3-Tokenizer
   *
   * @param text
   * @returns
   */
  countTokens = (text: string): number => {
    const encoded: { bpe: number[]; text: string[] } =
      this.tokenizer.encode(text);
    return encoded.bpe.length;
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
