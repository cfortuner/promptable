import { S } from "ts-toolbelt";

export type ExtractFormatObject<TPrompt extends string> = {
  [K in S.Split<TPrompt, "{{">[number] as K extends `${infer TName}}}${string}`
    ? TName
    : never]: string;
};
export type ExtractVariableNames<TPrompt extends string> = Array<
  keyof ExtractFormatObject<TPrompt>
>;
