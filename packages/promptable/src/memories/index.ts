export { BufferedChatMemory } from "./BufferedChatMemory";

export interface Memory {
  get: (...args: any[]) => string;
  clear: (...args: any[]) => void;
}
