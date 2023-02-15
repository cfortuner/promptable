export { BufferedChatInteractionMemory } from "./BufferedChatInteractionMemory";
export interface Memory {
    get: () => string
}