import { v4 as uuid } from "uuid";
import fs from "fs";
import {
  AudioDocument,
  Document,
  ImageDocument,
  TextDocument,
} from "src/documents/Document";
import { Loader } from ".";

export class FileLoader implements Loader {
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
              document = new ImageDocument(data, { source: filepath });
              break;
            case "wav":
            case "mp4":
            case "mp3":
              document = new AudioDocument(data, { source: filepath });
              break;
            case "txt":
            case "csv":
            case "json":
            default:
              document = new TextDocument(data.toString(), {
                source: filepath,
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
}
