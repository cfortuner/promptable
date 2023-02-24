type Split<S extends string, Delimiter extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : [S];

export type ExtractFormatObject<TPrompt extends string> = {
  [K in Split<TPrompt, "{{">[number] as K extends `${infer TName}}}${string}`
    ? TName
    : never]: string;
};
export type ExtractVariableNames<TPrompt extends string> = Array<
  keyof ExtractFormatObject<TPrompt>
>;
