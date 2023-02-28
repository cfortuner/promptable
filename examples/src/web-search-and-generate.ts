import fs from "fs";
import axios from "axios";
import {
  EmbeddedDocument,
  HTMLLoader,
  OpenAI,
  PromptTemplate,
  TokenSplitter,
} from "@promptable/promptable";

const apiKey = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI(apiKey);

function vectorSimilarity(x: number[], y: number[]): number {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i] * y[i];
  }
  return sum;
}

const generateParagraphTemplate = new PromptTemplate(
  "You're writing a paper on {{topic}}. Given the following source information and the topic content, write a paragraph that summarizes the source information and includes the topic content.\n\nSOURCE:\n{{source}}\n\nTOPIC:\n{{topic}}\n\nPARAGRAPH:"
);
const brainstormTopicsTemplate = new PromptTemplate(
  `You're writing a paper on {{topic}}. What are some things you should include?\n\nReturn the results as a list of strings separated by commas:\n\nEXAMPLE:\n\n"topic1, topic2, topic3, topic4, topic5"\n\nTOPIC:\n{{topic}}\n\nRESULTS:`
);

const run = async (args: string[]) => {
  // first, supply web sources for the document
  const sources = ["https://en.wikipedia.org/wiki/Artificial_intelligence"];

  const htmlLoader = new HTMLLoader();
  let embeddedDocuments: EmbeddedDocument[] = [];

  for (const source of sources) {
    // query the web sources and load them into documents
    const response = await axios.get(source);
    const html = await response.data;
    const docs = await htmlLoader.load(html, { source: source, html });

    // split
    const textSplitter = new TokenSplitter({
      chunk: true,
      chunkSize: 1000,
    });

    const chunks = textSplitter.splitDocuments(docs);

    // count tokens in each chunk
    let total = 0;

    let embeddedDocuments: EmbeddedDocument[] = [];
    for (const chunk of chunks) {
      const tokens = openai.countTokens(chunk.data);
      console.log("tokens", tokens);
      total += tokens;
      // create embeddings for the web sources
      const embeddingResponse = await openai.createEmbeddings({
        input: chunk,
      });

      embeddedDocuments = embeddedDocuments.concat(embeddingResponse.documents);

      // set some delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  console.log("Documents embedded, generating paragraphs");

  // then show a few prompts that generate text using a

  const brainstormTopicPrompt = brainstormTopicsTemplate.build({
    topic: "artificial intelligence",
  });

  // todo: retries
  const brainstormResult = await openai.generate(brainstormTopicPrompt);
  const topics = brainstormResult.text.split(",").map((t) => t.trim());

  // for each topic, generate a paragraph using the source material
  const paragraphs = await Promise.all(
    topics.map(async (topic: string) => {
      const query = "What is artificial intelligence?";
      const queryEmbeddingRes = await openai.createEmbeddings({
        input: query,
      });
      const queryEmbedding = queryEmbeddingRes.documents[0].embedding;

      // update documents with scores
      const docsWithSimilarityScore = embeddedDocuments.map((doc) => {
        return {
          ...doc,
          score: vectorSimilarity(doc.embedding, queryEmbedding),
        };
      });

      const results = docsWithSimilarityScore
        .sort((a, b) => {
          return a.score > b.score ? -1 : 1;
        })
        .slice(0, 3);

      const generateParagraphPrompt = generateParagraphTemplate.build({
        topic,
        source: results.map((r) => r.data).join("\n\n"),
      });

      const generateParagraphResult = await openai.generate(
        generateParagraphPrompt
      );

      const paragraph = generateParagraphResult.text;
      return paragraph;
    })
  );

  console.log("paragraphs", paragraphs);
};

export default run;
