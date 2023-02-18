import {
  CompletionRequest,
  CompletionsModelProvider,
  EmbeddingsModelProvider,
  ModelProviderType,
  ModelProvider,
  Tokenizer,
  utils,
  Document,
} from "@promptable/core";
import {
  OpenAIApi,
  CreateEmbeddingRequest,
  CreateCompletionRequest,
  Configuration,
} from "openai";
import GPT3Tokenizer from "gpt3-tokenizer";

export class OpenAI
  extends ModelProvider
  implements CompletionsModelProvider, EmbeddingsModelProvider
{
  apiKey: string;
  config: Configuration;
  api: OpenAIApi;
  completionsConfig = DEFAULT_COMPLETION_OPTIONS;
  embeddingsConfig = DEFAULT_OPENAI_EMBEDDINGS_CONFIG;
  tokenizer: OpenAITokenizer = new OpenAITokenizer();

  constructor(apiKey: string) {
    super(ModelProviderType.OpenAI);
    this.apiKey = apiKey;

    const config = new Configuration({
      apiKey,
    });

    this.config = config;

    this.api = new OpenAIApi(config);
  }

  countTokens(text: string) {
    return this.tokenizer.countTokens(text);
  }

  async generate(req: CompletionRequest<any>) {
    try {
      if (req.stop != null) {
        req.stop = utils.unescapeStopTokens(req.stop);
      }

      const prompt = req.prompt.format(req.variables);

      const options: any = {
        ...req,
      };
      delete options["prompt"];
      delete options["variables"];

      const res = await this.api.createCompletion({
        prompt,
        ...options,
        model: options.model || DEFAULT_COMPLETION_OPTIONS.model,
      });

      return res.data.choices[0]?.text || "";
    } catch (e) {
      console.log(e);
    }
    return "failed";
  }

  async embed(
    text: string,
    options?: Omit<CreateEmbeddingRequest, "input">
  ): Promise<number[]>;
  async embed(
    texts: string[],
    options?: Omit<CreateEmbeddingRequest, "input">
  ): Promise<number[][]>;
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

    return result?.data.data[0].embedding;
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

    return batchResults.map((result) => result?.data.data[0].embedding);
  };
}

const DEFAULT_COMPLETION_OPTIONS = {
  model: "text-davinci-003" as OPENAI_MODEL,
  max_tokens: 128,
  temperature: 0.7,
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
