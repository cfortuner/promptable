import {
  CompletionsModelProvider,
  CreateCompletionRequest,
  CreateEmbeddingsRequest,
  CreateEmbeddingsResponse,
  EmbeddingsModelProvider,
  ModelProviderType,
} from "./ModelProvider";
import { ModelProvider, Tokenizer } from "./ModelProvider";
import {
  Configuration,
  OpenAIApi,
  CreateEmbeddingRequest as CreateOpenAIEmbeddingsRequest,
  CreateEmbeddingResponse as CreateOpenAIEmbeddingResponse,
} from "openai";
import { Document } from "src";
import GPT3Tokenizer from "gpt3-tokenizer";
import { logger } from "@utils/Logger";

class OpenAIConfiguration extends Configuration {}

export type GenerateCompletionOptions = {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them.
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  model?: OPENAI_MODEL;
  /**
   * The suffix that comes after a completion of inserted text.
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  suffix?: string | null;
  /**
   * The maximum number of [tokens](/tokenizer) to generate in the completion.  The token count of your prompt plus `max_tokens` cannot exceed the model\'s context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  max_tokens?: number | null;
  /**
   * What [sampling temperature](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277) to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  top_p?: number | null;
  /**
   * How many completions to generate for each prompt.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  n?: number | null;
  /**
   * Whether to stream back partial progress. If set, tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message.
   * @type {boolean}
   * @memberof CreateCompletionRequest
   */
  stream?: boolean | null;
  /**
   * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.  The maximum value for `logprobs` is 5. If you need more than this, please contact us through our [Help center](https://help.openai.com) and describe your use case.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  logprobs?: number | null;
  /**
   * Echo back the prompt in addition to the completion
   * @type {boolean}
   * @memberof CreateCompletionRequest
   */
  echo?: boolean | null;
  /**
   *
   * @type {CreateCompletionRequestStop}
   * @memberof CreateCompletionRequest
   */
  stop?: string | string[] | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  presence_penalty?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  frequency_penalty?: number | null;
  /**
   * Generates `best_of` completions server-side and returns the \"best\" (the one with the highest log probability per token). Results cannot be streamed.  When used with `n`, `best_of` controls the number of candidate completions and `n` specifies how many to return – `best_of` must be greater than `n`.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  best_of?: number | null;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.  As an example, you can pass `{\"50256\": -100}` to prevent the <|endoftext|> token from being generated.
   * @type {object}
   * @memberof CreateCompletionRequest
   */
  logit_bias?: object | null;
  /**
   * A unique identifier representing your end-user, which will help OpenAI to monitor and detect abuse. [Learn more](/docs/usage-policies/end-user-ids).
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  user?: string;
};

type Options = {
  completionsConfig?: GenerateCompletionOptions;
  embeddingsConfig?: OpenAIEmbeddingsConfig;
};

export class OpenAI
  extends ModelProvider
  implements CompletionsModelProvider, EmbeddingsModelProvider
{
  apiKey: string;
  config: OpenAIConfiguration;
  api: OpenAIApi;
  completionsConfig: GenerateCompletionOptions;
  embeddingsConfig: OpenAIEmbeddingsConfig;
  tokenizer: OpenAITokenizer = new OpenAITokenizer();

  constructor(apiKey: string, options?: Options) {
    super(ModelProviderType.OpenAI);
    this.apiKey = apiKey;

    const config = new OpenAIConfiguration({
      apiKey,
    });

    this.config = config;
    this.completionsConfig =
      options?.completionsConfig ?? DEFAULT_COMPLETION_OPTIONS;
    this.embeddingsConfig =
      options?.embeddingsConfig ?? DEFAULT_OPENAI_EMBEDDINGS_CONFIG;

    this.api = new OpenAIApi(config);
  }

  countTokens(text: string) {
    return this.tokenizer.countTokens(text);
  }

  async generate(
    req: CreateCompletionRequest<any>,
    options: GenerateCompletionOptions = this.completionsConfig
  ) {
    const { prompt, variables } = req;

    try {
      const res = await this.api.createCompletion({
        prompt: prompt.format(variables),
        ...options,
        model: options.model || DEFAULT_COMPLETION_OPTIONS.model,
      });

      return {
        text: res.data.choices[0]?.text || "",
        providerResponse: res.data,
      };
    } catch (e) {
      logger.error(e as any);
      throw e;
    }
  }

  async createEmbeddings(
    req: CreateEmbeddingsRequest,
    options: Omit<CreateOpenAIEmbeddingsRequest, "input"> = this
      .embeddingsConfig
  ) {
    const { documents: docOrDocs } = req;

    const replaceNewlines = (text: string, char: string) =>
      text.replace(/\n/g, char);

    const input = Array.isArray(docOrDocs)
      ? docOrDocs.map((doc) => replaceNewlines(doc.content, " "))
      : [replaceNewlines(docOrDocs.content, " ")];

    const response = await this.api.createEmbedding({
      ...options,
      input,
    });

    return {
      documents: Array.isArray(docOrDocs) ? docOrDocs : [docOrDocs],
      embeddings: response?.data.data.map((d) => d.embedding),
      providerResponse: response.data,
    };
  }
}

export const DEFAULT_COMPLETION_OPTIONS = {
  model: "text-davinci-003" as OPENAI_MODEL,
  max_tokens: 128,
  temperature: 0.7,
  stop: null,
};

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

export class OpenAITokenizer implements Tokenizer {
  private tokenizer: GPT3Tokenizer;

  constructor(type: "gpt3" | "codex" = "gpt3") {
    this.tokenizer = new GPT3Tokenizer({ type: type });
  }

  encode(text: string) {
    const { bpe, text: texts } = this.tokenizer.encode(text);

    return {
      tokens: bpe,
      texts: texts,
    };
  }

  decode(tokens: number[]) {
    return this.tokenizer.decode(tokens);
  }

  truncate(text: string, maxTokens: number) {
    const { tokens } = this.encode(text);

    if (tokens.length > maxTokens) {
      return this.decode(tokens.slice(0, maxTokens));
    }

    return text;
  }

  countTokens(text: string) {
    const { tokens } = this.encode(text);
    return tokens.length;
  }

  countDocumentTokens(doc: Document) {
    return this.countTokens(doc.content);
  }
}
