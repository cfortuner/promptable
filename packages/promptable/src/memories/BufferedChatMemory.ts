import { Memory } from "src/memories/index";

export class BufferedChatMemory implements Memory {
  botMessages: string[] = [];
  userMessages: string[] = [];

  clear() {
    this.botMessages = [];
    this.userMessages = [];
  }

  constructor(
    protected botName = "Assistant",
    protected userName = "User",
    protected startingSpeaker: "user" | "bot" = "user",
    protected maxInteractionTurns = Infinity
  ) {}

  /**
   * get the interaction history
   *
   * @example
   *
   * const memory = new BufferedChatMemory();
   *
   * memory.addBotMessage("Hello");
   * memory.addUserMessage("Hi");
   * memory.addBotMessage("How are you?");
   * memory.addUserMessage("I'm fine, thanks");
   *
   * memory.get();
   * // Assistant: Hello
   * // User: Hi
   * // Assistant: How are you?
   * // User: I'm fine, thanks
   *
   *
   *
   * @returns a string containing the interaction history
   */
  get() {
    const {
      firstSpeakerMessage,
      secondSpeakerMessage,
      firstSpeakerName,
      secondSpeakerName,
    } =
      this.startingSpeaker === "user"
        ? {
            firstSpeakerMessage: this.userMessages,
            secondSpeakerMessage: this.botMessages,
            firstSpeakerName: this.userName,
            secondSpeakerName: this.botName,
          }
        : {
            firstSpeakerMessage: this.botMessages,
            secondSpeakerMessage: this.userMessages,
            firstSpeakerName: this.botName,
            secondSpeakerName: this.userName,
          };

    const numInteractionTurns = Math.min(
      firstSpeakerMessage.length,
      secondSpeakerMessage.length,
      this.maxInteractionTurns
    );
    let buffer = "";
    // We iterate the shorter array
    // because we don't want to put incomplete interaction turns in the buffer
    for (let i = 0; i < numInteractionTurns; i++) {
      buffer += `${firstSpeakerName}: ${firstSpeakerMessage[i]}\n`;
      buffer += `${secondSpeakerName}: ${secondSpeakerMessage[i]}\n`;
    }
    return buffer.trim();
  }

  addBotMessage(botMessage: string) {
    this.botMessages.push(botMessage);
  }

  addUserMessage(userMessage: string) {
    this.userMessages.push(userMessage);
  }
}
