import { Prompt } from "@prompts/Prompt";
import {
  CompletionsModelProvider,
  EmbeddingsModelProvider,
  ModelProviderType,
} from "./ModelProvider";
import { ModelProvider } from "./ModelProvider";
import { Configuration, CreateEmbeddingResponse, OpenAIApi } from "openai";
import { unescapeStopTokens } from "@utils/unescape-stop-tokens";
import GPT3Tokenizer from "gpt3-tokenizer";

export class OpenAI
  extends ModelProvider
  implements CompletionsModelProvider, EmbeddingsModelProvider
{
  apiKey: string;
  api: OpenAIApi;
  config: OpenAIConfig = DEFAULT_OPENAI_MODEL_CONFIG;
  embeddingsConfig: OpenAIEmbeddingsConfig = DEFAULT_OPENAI_EMBEDDINGS_CONFIG;
  tokenizer: GPT3Tokenizer;

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

  async generate<T extends string>(
    prompt: Prompt<T>,
    variables: Record<T, string>,
    ...args: any[]
  ) {
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
  }

  async embed(texts: string[]): Promise<CreateEmbeddingResponse[]>;
  async embed(text: string): Promise<CreateEmbeddingResponse>;
  async embed(textOrTexts: any) {
    if (Array.isArray(textOrTexts)) {
      return this.embedMany(textOrTexts);
    } else {
      return this.embedOne(textOrTexts);
    }
  }

  private embedOne = async (text: string) => {
    const result = await this.api.createEmbedding({
      model: this.embeddingsConfig.model,
      input: text.replace(/\n/g, " "),
    });

    return result?.data;
  };

  private embedMany = async (texts: string[], chunkSize: number = 1000) => {
    const results: any[] = [];
    for (let i = 0; i < texts.length; i += chunkSize) {
      const batch = texts.slice(i, i + chunkSize);
      const batchResults = await Promise.all(
        batch.map((text) =>
          this.api.createEmbedding({
            model: this.embeddingsConfig.model,
            input: text.replace(/\n/g, " "),
          })
        )
      );
      results.push(...batchResults.map((result) => result?.data));
    }
    return results;
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

export const DEFAULT_OPENAI_EMBEDDINGS_CONFIG = {
  model: "text-embedding-ada-002",
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

interface OpenAIEmbeddingsConfig {
  model: string;
}
