import { logger } from "./Logger";

// todo: Possibly replace with https://handlebarsjs.com/guide/expressions.html#html-escaping
export const injectVariables = (
  text: string,
  variables: { [name: string]: any }
) => {
  logger.debug(
    `Injecting variables into text: ${text} with variables: ${variables}`
  );
  return Object.entries(variables)?.reduce((acc, [name, value]) => {
    return acc.replaceAll(`{{${name}}}`, value);
  }, text);
};
