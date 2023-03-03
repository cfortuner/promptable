import { Octokit } from "@octokit/rest";
import { TextDocument } from "src/documents/Document";
import { Loader } from ".";

export class GithubLoader implements Loader {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async load(repo: string, path: string, ref?: string) {
    const { data } = await this.octokit.repos.getContent({
      owner: repo.split("/")[0],
      repo: repo.split("/")[1],
      path,
      ref,
    });
    if (Array.isArray(data)) {
      // handle directory
      const documents: any[] = await Promise.all(
        data.map(async (item: any) => await this.load(repo, item.path, ref))
      );

      return documents.flat();
    } else {
      // handle file
      const { data: file } = await this.octokit.repos.getContent({
        owner: repo.split("/")[0],
        repo: repo.split("/")[1],
        path: data.path,
        ref,
      });

      //@ts-ignore
      const text = Buffer.from(file.content || "", "base64").toString();
      const source = `https://github.com/${repo}/blob/${ref}/${path}`;
      return [new TextDocument(text, { source })];
    }
  }
}
