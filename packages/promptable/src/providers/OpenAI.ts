import { Readable } from "stream";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { Prompt } from "@prompts/Prompt";
import {
  CompletionsModelProvider,
  EmbeddingsModelProvider,
  ModelProviderType,
} from "./ModelProvider";
import { ModelProvider } from "./ModelProvider";
import {
  Configuration,
  CreateEmbeddingResponse,
  OpenAIApi,
  CreateCompletionRequest,
  CreateEmbeddingRequest,
} from "openai";
import axios, { AxiosResponse } from "axios";
import { unescapeStopTokens } from "@utils/unescape-stop-tokens";
import { parseJsonSSE } from "@utils/parse-json-sse";

class OpenAIConfiguration extends Configuration {}

export class OpenAI
  extends ModelProvider
  implements CompletionsModelProvider, EmbeddingsModelProvider
{
  apiKey: string;
  config: OpenAIConfiguration;
  api: OpenAIApi;
  completionsConfig = DEFAULT_COMPLETION_OPTIONS;
  embeddingsConfig: OpenAIEmbeddingsConfig = DEFAULT_OPENAI_EMBEDDINGS_CONFIG;

  constructor(apiKey: string) {
    super(ModelProviderType.OpenAI);
    this.apiKey = apiKey;

    const config = new OpenAIConfiguration({
      apiKey,
    });

    this.config = config;

    this.api = new OpenAIApi(config);
  }

  async generate<T extends string>(
    prompt: Prompt<T>,
    variables: Record<T, string>,
    options: Omit<CreateCompletionRequest, "prompt" | "model" | "stream"> & {
      model: OPENAI_MODEL;
    } = DEFAULT_COMPLETION_OPTIONS
  ) {
    try {
      if (options.stop != null) {
        options.stop = unescapeStopTokens(options.stop);
      }

      const promptText = prompt.format(variables);

      const res = await this.api.createCompletion({
        prompt: promptText,
        ...options,
      });

      return res.data.choices[0]?.text || "";
    } catch (e) {
      console.log(e);
    }
    return "failed";
  }

  async stream<T extends string>(
    prompt: Prompt<T>,
    variables: Record<T, string>,
    onChunk: (chunk: string) => void,
    options: Omit<CreateCompletionRequest, "prompt" | "model"> & {
      model: OPENAI_MODEL;
    } = DEFAULT_COMPLETION_OPTIONS
  ) {
    if (options.stop != null) {
      options.stop = unescapeStopTokens(options.stop);
    }

    const promptText = prompt.format(variables);

    const payload = {
      prompt: promptText,
      ...options,
      stream: true,
    };

    try {
      const res = await this.api.createCompletion(payload, {
        responseType: "stream",
      });

      //@ts-ignore
      res.data.on("data", (data) => {
        const lines = data
          .toString()
          .split("\n")
          //@ts-ignore
          .filter((line) => line.trim() !== "");
        for (const line of lines) {
          const message = line.replace(/^data: /, "");
          if (message === "[DONE]") {
            return; // Stream finished
          }
          try {
            const parsed = JSON.parse(message);
            console.log(parsed.choices[0].text);
          } catch (error) {
            console.error(
              "Could not JSON parse stream message",
              message,
              error
            );
          }
        }
      });
    } catch (error) {
      //@ts-ignore
      if (error.response?.status) {
        //@ts-ignore
        console.error(error.response.status, error.message);
        //@ts-ignore
        error.response.data.on("data", (data) => {
          const message = data.toString();
          try {
            const parsed = JSON.parse(message);
            console.error("An error occurred during OpenAI request: ", parsed);
          } catch (error) {
            console.error("An error occurred during OpenAI request: ", message);
          }
        });
      } else {
        console.error("An error occurred during OpenAI request", error);
      }
    }
  }

  async embed(
    texts: string[],
    options: Omit<CreateEmbeddingRequest, "input">
  ): Promise<CreateEmbeddingResponse[]>;
  async embed(
    text: string,
    options: Omit<CreateEmbeddingRequest, "input">
  ): Promise<CreateEmbeddingResponse>;
  async embed(
    textOrTexts: any,
    options: Omit<
      CreateEmbeddingRequest,
      "input"
    > = DEFAULT_OPENAI_EMBEDDINGS_CONFIG
  ) {
    if (Array.isArray(textOrTexts)) {
      return this.embedMany(textOrTexts, options);
    } else {
      return this.embedOne(textOrTexts, options);
    }
  }

  private embedOne = async (
    text: string,
    options: Omit<CreateEmbeddingRequest, "input">
  ) => {
    const result = await this.api.createEmbedding({
      ...options,
      input: text.replace(/\n/g, " "),
    });

    return result?.data;
  };

  private embedMany = async (
    texts: string[],
    options: Omit<CreateEmbeddingRequest, "input">
  ) => {
    const batchResults = await Promise.all(
      texts.map((text) =>
        this.api.createEmbedding({
          ...options,
          input: text.replace(/\n/g, " "),
        })
      )
    );

    return batchResults.map((result) => result?.data);
  };
}

const DEFAULT_COMPLETION_OPTIONS = {
  model: "text-davinci-003" as OPENAI_MODEL,
  max_tokens: 128,
  temperature: 0.7,
  stop: null,
};

/** Configs */

// const configuration = new Configuration({
//     apiKey?: string | Promise<string> | ((name: string) => string) | ((name: string) => Promise<string>);
//     organization?: string;
//     username?: string;
//     password?: string;
//     accessToken?: string | Promise<string> | ((name?: string, scopes?: string[]) => string) | ((name?: string, scopes?: string[]) => Promise<string>);
//     basePath?: string;
//     baseOptions?: any;
//     formDataCtor?: new () => any;
// });

export const DEFAULT_OPENAI_EMBEDDINGS_CONFIG = {
  model: "text-embedding-ada-002",
};

type OPENAI_MODEL =
  | "text-davinci-003"
  | "text-davinci-002"
  | "code-davinci-002"
  | "text-curie-002";

export const OPENAI_MODEL_SETTINGS = {
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

interface OpenAIEmbeddingsConfig {
  model: string;
}
