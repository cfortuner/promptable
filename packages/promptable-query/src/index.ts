import { printNode, zodToTs } from "zod-to-ts";
import z from "zod";
import promptable from "promptable";
import {
  FetchQueryOptions,
  QueryClient,
  QueryFunction,
  QueryKey,
} from "react-query";

// Possibly swap zod for https://github.com/sinclairzx81/typebox

/**
 * GPTQueryClient
 * 
 * @description
 * A wrapper around react-query's QueryClient that allows 
 * for the use of zod to define the types of the query's
 * inputs and outputs, and to automatically generate the
 * data using the openai GPT-3 API via Promptable.
 * 
 * Usage:
 * 
 * @example
 * const c = new GPTQueryClient();

 * const run = async () => {
 *   const { data } = await c.fetchQuery<any>("fetchTodos", {
 *     meta: {
 *       type: z.object({
 *         name: z.string(),
 *         date: z.date(),
 *         score: z.optional(z.number()),
 *         players: z.array(z.string()),
 *         team: z.union([z.string(), z.null()]),
 *       }),
 *     },
 *   });

 *   console.log(JSON.stringify(data, undefined, 2));
 * };

 * run();

 * */
class GPTQueryClient extends QueryClient {
  apiKey: string;
  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  fetchQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >(
    options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ): Promise<TData>;
  fetchQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >(
    queryKey: TQueryKey,
    options?:
      | FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
      | undefined
  ): Promise<TData>;
  fetchQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?:
      | FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
      | undefined
  ): Promise<TData>;
  async fetchQuery<TData = unknown>(
    queryKey: unknown,
    options?: unknown
  ): Promise<TData> | Promise<TData> | Promise<TData> {
    const prompt = new promptable.Prompt(
      `Given this typescript type return a valid, stringified JSON Object representing an instance of the type.
      Make sure the response is JUST the object. Not a variable or anything else.
      Examples:

      Correct:
      {
        "name": "John",
      }

      Wrong:
      const data = {
        "name": "John",
      }

      Note:
      - undefined and null is not a valid json fields, instead, just leave out the field
      - use a random stringified iso date format for dates
      - optional, undefined or nullable fields in the response mean that you can skip them OR you can add them. Choose randomly.
       
      
      Okay, here's the type:
      {{type}}

      const VALID_STRINGIFIED_JSON=`,
      ["type"],
      new promptable.JSONParser()
    );
    // const provider = new promptable.OpenAI(this.apiKey, {
    //   temperature: 1,
    // });

    // const step = new PromptStep({
    //   name: "get data",
    //   prompt,
    //   provider,
    //   inputNames: ["type"],
    //   outputNames: ["data"],
    // });

    //@ts-ignore
    const node = printNode(zodToTs(options.meta.type).node);

    // const { data } = await step.run({
    //   steps: [step],
    //   inputs: {
    //     //@ts-ignore
    //     type: node,
    //   },
    // });

    return null as unknown as TData;
  }
}
