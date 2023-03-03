import { WebClient } from "@slack/web-api";
import { TextDocument } from "src/documents/Document";
import { Loader } from ".";

export class SlackLoader implements Loader {
  private slack: WebClient;

  constructor(token: string) {
    this.slack = new WebClient(token);
  }

  async load(channelId: string, latestTs?: string, oldestTs?: string) {
    const { messages } = await this.slack.conversations.history({
      channel: channelId,
      latest: latestTs,
      oldest: oldestTs,
    });
    const documents = messages?.map((message: any) => {
      const text = message.text;
      const source = `https://app.slack.com/client/T024BE7LD/${channelId}/thread/${message.ts}`;
      return new TextDocument(text, { source });
    });

    return documents || [];
  }
}
