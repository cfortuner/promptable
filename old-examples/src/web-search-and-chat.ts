// import fs from "fs";
// import axios from "axios";
// import enquirer from "enquirer";
// const { prompt: query } = enquirer;
// import {
//   EmbeddedDocument,
//   HTMLLoader,
//   OpenAI,
//   PromptTemplate,
//   TokenSplitter,
// } from "@promptable/promptable";
// import chalk from "chalk";

// const apiKey = process.env.OPENAI_API_KEY || "";
// const openai = new OpenAI(apiKey);

// function vectorSimilarity(x: number[], y: number[]): number {
//   let sum = 0;
//   for (let i = 0; i < x.length; i++) {
//     sum += x[i] * y[i];
//   }
//   return sum;
// }

// const generateParagraphTemplate = new PromptTemplate(
//   "You're writing a paper on {{topic}}. Given the following source information and the topic content, write a paragraph that summarizes the source information and includes the topic content.\n\nSOURCE:\n{{source}}\n\nTOPIC:\n{{topic}}\n\nPARAGRAPH:"
// );
// const brainstormTopicsTemplate = new PromptTemplate(
//   `You're writing a paper on {{topic}}. What are some things you should include?\n\nReturn the results as a list of strings separated by commas:\n\nEXAMPLE:\n\n"topic1, topic2, topic3, topic4, topic5"\n\nTOPIC:\n{{topic}}\n\nRESULTS:`
// );

// const run = async (args: string[]) => {
//   // first, supply web sources for the document
//   const sources = ["https://www.buildt.ai/blog/vm3qozd4qfrbbyzukqhynrwm9vb9tq"];

//   const htmlLoader = new HTMLLoader();
//   let embeddedDocuments: EmbeddedDocument[] = [];

//   for (const source of sources) {
//     // query the web sources and load them into documents
//     const response = await axios.get(source);
//     const html = await response.data;
//     const docs = await htmlLoader.load(html, { source: source, html });

//     // split
//     const textSplitter = new TokenSplitter({
//       chunk: true,
//       chunkSize: 1000,
//     });

//     const chunks = textSplitter.splitDocuments(docs);

//     // count tokens in each chunk
//     let total = 0;

//     for (const chunk of chunks) {
//       const tokens = openai.countTokens(chunk.data);
//       total += tokens;
//       // create embeddings for the web sources
//       const embeddingResponse = await openai.createEmbeddings({
//         input: chunk,
//       });

//       embeddedDocuments = embeddedDocuments.concat(embeddingResponse.documents);

//       // set some delay to avoid rate limiting
//       await new Promise((resolve) => setTimeout(resolve, 100));
//     }
//   }

//   const SystemMessage = {
//     role: "system",
//     content: "You are a helpful assistant explaining a article to a user.",
//   };

//   console.log(chalk.blue("Chatting with OpenAI..."));

//   const memory = new BufferedChatMemory();

//   while (true) {
//     const { userInput } = (await query({
//       type: "input",
//       name: "userInput",
//       message: "User: ",
//     })) as {
//       userInput: string;
//     };

//     if (userInput) {
//       if (userInput === "exit") break;

//       // first we need to find the most relevant document

//       // create an embedding for the user input
//       const queryEmbeddingRes = await openai.createEmbeddings({
//         input: userInput,
//       });

//       // update documents with scores
//       const docsWithSimilarityScore = embeddedDocuments.map((doc) => {
//         return {
//           ...doc,
//           score: vectorSimilarity(
//             doc.embedding,
//             queryEmbeddingRes.documents[0].embedding
//           ),
//         };
//       });

//       const results = docsWithSimilarityScore
//         .sort((a, b) => {
//           return a.score > b.score ? -1 : 1;
//         })
//         .slice(0, 3)
//         .map((doc) => {
//           return doc.data;
//         })
//         .join("\n\n");

//       memory.addUserMessage(`Input: ${userInput}, Context:${results}`);

//       const res = await openai.chat({ messages: memory.getChatMessages() });

//       memory.addBotMessage(res.message.content);

//       console.log(chalk.yellow("Assistant:", res.message.content));
//     }
//   }
// };

// export default run;
