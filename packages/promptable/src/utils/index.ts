import { injectVariables } from "./inject-variables";
import { unescapeStopTokens } from "./unescape-stop-tokens";
import { TextSplitter, CharacterTextSplitter } from "./TextSplitter";

const utils = {
  TextSplitter,
  CharacterTextSplitter,
  unescapeStopTokens,
  injectVariables,
};

export default utils;
