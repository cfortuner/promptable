export function injectVariables(
  template: string,
  variables: { [key: string]: any }
): string {
  let result = template;
  for (const key in variables) {
    result = result.replaceAll(`{{${key}}}`, variables[key]);
  }
  return result;
}
