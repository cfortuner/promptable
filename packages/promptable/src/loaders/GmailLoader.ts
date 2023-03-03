import { google } from "googleapis";
import { TextDocument } from "src/documents/Document";
import { Loader } from ".";

export class GmailLoader implements Loader {
  private gmail: any;

  constructor(credentials: any, token: any) {
    const auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0]
    );
    auth.setCredentials(token);
    this.gmail = google.gmail({ version: "v1", auth });
  }

  async load(messageId: string) {
    const { data: message } = await this.gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "full",
    });
    const text = message.payload.parts
      .map((part: any) => part.body.data)
      .join("");
    const headers = message.payload.headers.reduce((acc: any, header: any) => {
      acc[header.name] = header.value;
      return acc;
    }, {});
    return [
      new TextDocument(text, {
        source: `https://mail.google.com/mail/u/0/#inbox/${messageId}`,
        headers,
      }),
    ];
  }
}
