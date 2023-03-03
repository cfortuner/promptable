import { WebClient } from "@slack/web-api";
import { TextDocument } from "@documents/TextDocument";
import { Loader } from "@loaders/Loader";

export class SlackLoader implements Loader<TextDocument> {
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

      return new TextDocument({
        text,
        metadata: { source },
      });
    });

    return documents || [];
  }
}
