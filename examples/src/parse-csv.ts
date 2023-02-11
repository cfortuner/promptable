import dotenv from "dotenv";
dotenv.config();
import {
  ExtractCSVPrompt,
  FileLoader,
  OpenAI,
  CharacterTextSplitter,
} from "promptable";

/**
 * Extract CSV from Data
 *
 * The ExtractCSVPrompt is a prompt that uses for data and a header definitions
 * and then returns the CSV representation of the data.
 *
 * It also has a parser that parses the CSV output into a CSV object
 * or throws an error if the output is invalid.
 */
export default async function run() {
  const apiKey = process.env.OPENAI_API_KEY || "missing";

  const openai = new OpenAI(apiKey, {
    max_tokens: 2000,
  });

  const prompt = ExtractCSVPrompt;

  // Load the file
  const filepath = "./data/bens-bites-email.txt";
  const loader = new FileLoader(filepath);
  const splitter = new CharacterTextSplitter("\n");

  // load and split the documents
  let docs = loader.load();
  docs = splitter.splitDocuments(docs);

  const headers = ["link", "title", "tldr", "category"];

  const rows = await Promise.all(
    docs.map((docs) => {
      return openai.generate(prompt, {
        data: docs.content,
        headers: headers.join(","),
      });
    })
  );

  const csvs = prompt.parse(rows);
}
