import fs from "fs";
import { Document } from "src/documents/Document";
import { Loader } from "./Loader";
import { ImageDocument } from "@documents/ImageDocument";
import { AudioDocument } from "@documents/AudioDocument";
import { TextDocument } from "@documents/TextDocument";

export class FileLoader implements Loader<Document> {
  async load(filepaths: string[]): Promise<Document[]> {
    const documents: Document[] = [];

    for (const filepath of filepaths) {
      try {
        const stat = fs.statSync(filepath);

        if (stat.isDirectory()) {
          const files = fs.readdirSync(filepath);
          const dirDocuments = await this.load(
            files.map((f) => `${filepath}/${f}`)
          );
          documents.push(...dirDocuments);
        } else {
          const data = await fs.promises.readFile(filepath);
          const filename = filepath.split("/").pop();
          const extension = filename?.split(".").pop();
          if (!extension) {
            throw new Error(`No extension found for file ${filepath}`);
          }

          let document: Document;

          switch (extension) {
            case "png":
            case "jpg":
            case "jpeg":
            case "svg":
              document = new ImageDocument({
                image: data,
                metadata: { source: filepath },
              });
              break;
            case "wav":
            case "mp4":
            case "mp3":
              document = new AudioDocument({
                audio: data,
                metadata: { source: filepath },
              });
              break;
            case "txt":
            case "csv":
            case "json":
            default:
              document = new TextDocument({
                text: data.toString(),
                metadata: {
                  source: filepath,
                },
              });
              break;
          }

          documents.push(document);
        }
      } catch (error) {
        console.error(`Error loading file ${filepath}: ${error}`);
      }
    }

    return documents;
  }

  async loadTexts(filepaths: string[]): Promise<TextDocument[]> {
    return (await this.load(filepaths)) as TextDocument[];
  }
}
