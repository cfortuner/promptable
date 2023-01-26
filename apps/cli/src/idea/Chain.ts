import { LLM } from "./llm";
import { Prompt } from "./Prompt";

type Context = {
  prompt: Prompt | string;
  [key: string]: any;
}

type ChainCall<C extends Context> = (ctx: C) => Promise<Prompt | string>;

abstract class Chain<C extends Context> {
  abstract get _type(): string;
  abstract call(_call: ChainCall<C>): Promise<Prompt | string>;
}

abstract class SequentialChain<C extends Context> extends Chain<C> {
  private readonly _chains: Chain<C>[];

  constructor(chains: Chain<C>[]) {
    super();
    this._chains = chains;
  }

  get _type(): string {
    return "sequential";
  }

  async call(_call: ChainCall<C>): Promise<Prompt | string> {
    let result: Prompt | string = "";
    for (const chain of this._chains) {
      result = await chain.call(_call);
    }
    return result;
  }
}

abstract class ParallelChain<C extends Context> extends Chain<C> {
  private readonly _chains: Chain<C>[];

  constructor(chains: Chain<C>[]) {
    super();
    this._chains = chains;
  }

  get _type(): string {
    return "parallel";
  }

  async call(_call: ChainCall<C>): Promise<Prompt | string> {
    const results = await Promise.all(this._chains.map((chain) => chain.call(_call)));
    return results.join("\n\n");
  }
}

type BaseChain<C extends Context> = SequentialChain<C> | ParallelChain<C>;

class LLMChain<C extends Context> extends Chain<C> {
  private readonly _llm: LLM;
  private readonly _chain: BaseChain<C>;

  constructor(llm: LLM, chain: BaseChain<C>) {
    super();
    this._llm = llm;
    this._chain = chain;
  }

  get _type(): string {
    return "llm";
  }

  async call(_call: ChainCall<C>): Promise<Prompt | string> {
    return this._chain.call(async (ctx) => {
      const prompt = await _call(ctx);
      return this._llm.generate(prompt);
    });
  }
}
