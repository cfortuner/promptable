import { Prompt } from "@prompts/Prompt";
import { ModelProvider, ModelProviderType } from "src/model-providers/ModelProvider";
import { Chain } from "./Chain";


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