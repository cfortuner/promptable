import { injectVariables } from "./inject-variables";
import { unescapeStopTokens } from "./unescape-stop-tokens";
import { TextSplitter, CharacterTextSplitter } from "./TextSplitter";
import { logger } from "./Logger";

const utils = {
  TextSplitter,
  CharacterTextSplitter,
  unescapeStopTokens,
  injectVariables,
  logger,
};

export default utils;
