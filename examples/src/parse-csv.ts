// import dotenv from "dotenv";
// dotenv.config();
// import { prompts, FileLoader, OpenAI, CharacterTextSplitter } from "@promptable/promptable";

// /**
//  * Extract CSV from Data
//  *
//  * The ExtractCSVPrompt is a prompt that uses for data and a header definitions
//  * and then returns the CSV representation of the data.
//  *
//  * It also has a parser that parses the CSV output into a CSV object
//  * or throws an error if the output is invalid.
//  *
//  *
//  * NOTE: Doesn't work reliably yet.
//  */
export {};
// export default async function run() {
//   const apiKey = process.env.OPENAI_API_KEY || "missing";

//   const openai = new OpenAI(apiKey);

//   const prompt = prompts.extractCSV();

//   // Load the file
//   const filepath = "./data/bens-bites-email.txt";
//   const loader = new FileLoader(filepath);
//   const splitter = new CharacterTextSplitter("\n");

//   // load and split the documents
//   let docs = await loader.load();
//   docs = splitter.splitDocuments(docs);

//   const headers = ["link", "title", "tldr", "category"];

//   const rows = await Promise.all(
//     docs.map((docs) => {
//       const promptText = prompt.format({
//         data: docs.content,
//         headers: headers.join(","),
//       });

//       return openai.generate(promptText);
//     })
//   );

//   console.log(rows);

//   const csvs = prompt.parse(rows);

//   console.log(JSON.stringify(csvs, null, 2));
// }
