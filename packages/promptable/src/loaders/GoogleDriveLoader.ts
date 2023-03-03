import { google } from "googleapis";
import { Document } from "src/documents/Document";
import { Loader } from "@loaders/Loader";
import { ImageDocument } from "@documents/ImageDocument";
import { AudioDocument } from "@documents/AudioDocument";
import { TextDocument } from "@documents/TextDocument";

export class GoogleDriveLoader implements Loader<any> {
  private drive: any;

  constructor(credentials: any, token: any) {
    const auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0]
    );
    auth.setCredentials(token);
    this.drive = google.drive({ version: "v3", auth });
  }

  async load(fileId: string) {
    const { data } = await this.drive.files.get({
      fileId,
      alt: "media",
      responseType: "arraybuffer",
    });
    const file = await this.drive.files.get({
      fileId,
      fields: "name, mimeType",
    });
    const extension = file.data.mimeType.split("/")[1];
    let document: Document;

    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "svg":
        document = new ImageDocument({ image: new Uint8Array(data) });
        break;
      case "wav":
      case "mp4":
      case "mp3":
        document = new AudioDocument({ audio: new Uint8Array(data) });
        break;
      case "txt":
      case "csv":
      case "json":
      default:
        document = new TextDocument({ text: Buffer.from(data).toString() });
        break;
    }

    return [document];
  }
}
