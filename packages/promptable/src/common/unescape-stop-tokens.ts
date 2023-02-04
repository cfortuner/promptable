/**
 * Replace any escaped stop tokens like "\\n" their unescaped versions
 *
 * @param stop_tokens
 * @returns
 */
export const unescapeStopTokens = (stop_tokens: string | string[]) => {
  console.debug(`Unescaping stop tokens: ${stop_tokens}`);
  if (Array.isArray(stop_tokens)) {
    return stop_tokens.map((token) => {
      return JSON.parse(`"${token}"`);
    });
  } else {
    return JSON.parse(`"${stop_tokens}"`);
  }
};
