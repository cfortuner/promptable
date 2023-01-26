import { OpenAIApi, Configuration } from "openai";
import { Prompt } from "./Prompt";

abstract class LLM {
  abstract get _type(): string;
  abstract generate(prompt: Prompt | string): Promise<string>;
}

type OpenAIConfig = {
  apiKey?: string;
  organization?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  n?: number;
  best_of?: number;
};

class OpenAI extends LLM {
  private readonly _client: OpenAIApi;
  private readonly _model: string;
  private readonly _temperature: number;
  private readonly _maxTokens: number;
  private readonly _top_p: number;
  private readonly _frequency_penalty: number;
  private readonly _presence_penalty: number;
  private readonly _n: number;
  private readonly _best_of: number;

  constructor(config: OpenAIConfig) {
    super();
    const configuration = new Configuration({
      apiKey: config.apiKey,
      organization: config.organization,
    });
    this._client = new OpenAIApi(configuration);
    this._model = config.model || "davinci";
    this._temperature = config.temperature || 0.7;
    this._maxTokens = config.maxTokens || 256;
    this._top_p = config.top_p || 1;
    this._frequency_penalty = config.frequency_penalty || 0;
    this._presence_penalty = config.presence_penalty || 0;
    this._n = config.n || 1;
    this._best_of = config.best_of || 1;
  }

  get _type(): string {
    return "openai";
  }

  async generate(prompt: Prompt | string): Promise<string> {
    try {
      const promptText = typeof prompt === "string" ? prompt : prompt.format();
      const data = await this._client.createCompletion({
        model: this._model,
        prompt: promptText,
        temperature: this._temperature,
        max_tokens: this._maxTokens,
        top_p: this._top_p,
        frequency_penalty: this._frequency_penalty,
        presence_penalty: this._presence_penalty,
        n: this._n,
        best_of: this._best_of,
      });
      return data.data.choices[0].text || "client returned undefined";
    } catch (e) {
      console.error(e);
      return "failed to generate";
    }
  }
}

export { LLM, OpenAI };