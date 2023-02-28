export function injectVariables(
  template: string,
  variables: { [key: string]: any }
): string {
  let result = template;
  for (const key in variables) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), variables[key]);
  }
  return result;
}
