import * as p from "@promptable/promptable";

export default async function run(...args: any[]) {
  const openai = new p.OpenAI("sk-...");

  const store = new p.InMemoryVectorStore<p.TextDocument>({
    name: "test",
  });

  const doc = new p.TextDocument({ text: "test" });

  const { embeddings } = await openai.createEmbeddings({
    docs: [doc],
  });

  await store.add({
    embeddings,
  });
}
