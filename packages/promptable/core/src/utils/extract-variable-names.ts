/**
 * Extracts *unique* {{variables}} from a string
 *
 * @param text
 * @returns
 */
export const extractVariableNames = (text: string) => {
  const matches = text.match(/{{(.*?)}}/g);
  const inputsFound = new Set<string>();

  return (
    matches
      ?.map((match) => {
        return match.slice(2, -2).trim().replaceAll(" ", "-");
      })
      .filter((s) => {
        if (inputsFound.has(s)) {
          return false;
        }
        inputsFound.add(s);
        return true;
      })
      .map((s) => s) || []
  );
};
