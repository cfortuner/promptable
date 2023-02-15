export { BufferedChatMemory } from "./BufferedChatMemory";

export interface Memory {
  get: () => string;
}
