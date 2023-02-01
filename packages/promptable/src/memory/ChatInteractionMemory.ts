export class ChatInteractionMemory {
    botMessages: string[] = [];
    userMessages: string[] = [];

    constructor(protected botName = "Assistant",
        protected userName = "User",
        protected startingSpeaker: "user" | "bot" = "user") { }

    get() {
        const { firstSpeakerMessage, secondSpeakerMessage, firstSpeakerName, secondSpeakerName } = this.startingSpeaker === "user" ?
            {
                firstSpeakerMessage: this.userMessages, secondSpeakerMessage: this.botMessages,
                firstSpeakerName: this.userName, secondSpeakerName: this.botName
            } :
            {
                firstSpeakerMessage: this.botMessages, secondSpeakerMessage: this.userMessages,
                firstSpeakerName: this.botName, secondSpeakerName: this.userName
            };

        let buffer = "";
        // We iterate over secondSpeakerMessage length because it is the shorter array
        // and we don't want to put incomplete interaction turns in the buffer
        // TODO(rohan): Decide if we want to put incomplete interaction turns in the buffer
        for (let i = 0; i < secondSpeakerMessage.length; i++) {
            buffer += `${firstSpeakerName}: ${firstSpeakerMessage[i]}\n`;
            buffer += `${secondSpeakerName}: ${secondSpeakerMessage[i]}\n`;
        }
        return buffer.trim();
    }

    set(output: string, _completion: string, _promptText: string) {
        this.botMessages.push(output);
    }

    addUserInput(userInput: string) {
        this.userMessages.push(userInput);
    }
}