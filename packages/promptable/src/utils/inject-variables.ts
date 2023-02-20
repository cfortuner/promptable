import { ExtractVariableNames, ExtractFormatObject } from '@utils/type-utils';

export function injectVariables<T extends string>(
  template: T,
  variables: ExtractFormatObject<T>
): string {
  let result: string = template;
  for (const key of Object.keys(variables) as ExtractVariableNames<T>) {
    result = result.replaceAll(`{{${key}}}`, variables[key] as string);
  }
  return result;
}
