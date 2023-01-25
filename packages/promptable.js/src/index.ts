import GPT3Tokenizer from 'gpt3-tokenizer';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

export enum ModelProviderType {
  OpenAI,
}

export abstract class ModelProvider {
  type: ModelProviderType;

  constructor(type: ModelProviderType) {
    this.type = type;
  }

  abstract generate(prompt: Prompt): Promise<string>;
}

export class Prompt {
  text: string;
  variables: { [name: string]: string };
  outputName: string;
  constructor(
    text: string,
    variables: { [name: string]: string },
    outputName: string
  ) {
    this.text = text;
    this.variables = variables;
    this.outputName = outputName;
  }

  format() {
    return this.injectVariables();
  }

  private injectVariables() {
    return Object.entries(this.variables)?.reduce((acc, [name, value]) => {
      return acc.replaceAll(`{{${name}}}`, value);
    }, this.text);
  }
}

export interface CompletionRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  stop: string | string[] | null;
}

export interface RunCompletionArgs {
  req: CompletionRequest; // openai req
  apiKey: string;
}
export const DEFAULT_CONFIG = {
  model: 'text-davinci-003',
  max_tokens: 128,
  temperature: 0.7,
  stop: null,
};

export const MODEL_SETTINGS: {
  [key: string]: { maxLength: number };
} = {
  'text-davinci-003': {
    maxLength: 4000,
  },
  'text-davinci-002': {
    maxLength: 4000,
  },
  'code-davinci-002': {
    maxLength: 4000,
  },
  'text-curie-002': {
    maxLength: 2000,
  },
};

interface OpenAIConfig {
  model: string;
  temperature: number;
  max_tokens: number;
  stop: string[] | string | null;
}

export class OpenAI extends ModelProvider {
  api: OpenAIApi;
  config: OpenAIConfig = DEFAULT_CONFIG;
  apiKey: string;

  constructor(apiKey: string, config?: Partial<OpenAIConfig>) {
    super(ModelProviderType.OpenAI);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.api = new OpenAIApi(configuration);
    this.apiKey = apiKey;
    this.config = {
      ...this.config,
      ...config,
    };
  }

  private runCompletion = async (req: CompletionRequest) => {
    if (req.stop != null) {
      req.stop = unescapeStopTokens(req.stop);
    }

    const res = await this.api.createCompletion({
      ...req,
    });

    return res.data;
  };

  generate = async (prompt: Prompt) => {
    try {
      const data = await this.runCompletion({
        prompt: prompt.format(),
        ...this.config,
      });

      return data?.choices?.[0].text as string;
    } catch (e) {
      // console.error(e);
    }
    return 'failed';
  };
}

// replace any escaped stop tokens like "\\n" their unescaped versions
export const unescapeStopTokens = (stop_tokens: any) => {
  if (Array.isArray(stop_tokens)) {
    console.debug('found array of tokens');
    return stop_tokens.map((token) => {
      return JSON.parse(`"${token}"`);
    });
  } else {
    console.debug('found single token', stop_tokens);
    return JSON.parse(`"${stop_tokens}"`);
  }
};

export abstract class Chain<T> {
  abstract call(...args: any[]): any;
}

interface PromptChainData {
  providerType: ModelProviderType;
  prompt: Prompt;
  output: {
    [name: string]: any;
  };
}
export class PromptChain extends Chain<PromptChainData> {
  provider: ModelProvider;
  prompt: Prompt;
  data: PromptChainData;

  getData(): PromptChainData {
    return this.data;
  }

  constructor(provider: ModelProvider, prompt: Prompt) {
    super();
    this.provider = provider;
    this.prompt = prompt;
    this.data = {
      providerType: provider.type,
      prompt: prompt,
      output: {},
    };
  }

  async call() {
    const completion = await this.provider.generate(this.prompt);

    this.data.output[this.prompt.outputName] = completion;

    return completion;
  }
}

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

export const countTokens = (text: string): number => {
  // do something here
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(text);
  return encoded.bpe.length;
};

export const textSplitter = (text: string, maxLength: number): string[] => {
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(text);
  const res: string[] = [];
  for (let i = 0; i < encoded.text.length; i += maxLength) {
    res.push(encoded.text.slice(i, i + maxLength).join(''));
  }
  return res;
};

export const mergeOutputs = (results: string[]) => {};

export const injectVariables = (prompt: Prompt) => {
  return Object.entries(prompt.variables)?.reduce((acc, [name, value]) => {
    return acc.replaceAll(`{{${name}}}`, value);
  }, prompt.text);
};
