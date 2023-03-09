type Split<S extends string, Delimiter extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : [S];

export type ExtractFormatObject<TPromptText extends string> = {
  [K in Split<TPromptText, "{{">[number] as K extends `${infer TName}}}${string}`
    ? TName
    : never]: string;
};
export type ExtractVariableNames<TPromptText extends string> = Array<
  keyof ExtractFormatObject<TPromptText>
>;
