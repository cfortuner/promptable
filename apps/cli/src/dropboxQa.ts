import { Dropbox } from 'dropbox';
import pdf from "pdf-parse";
import Cache from "file-system-cache";
// @ts-expect-error
import { countTokens, Prompt } from "promptable"; // FIXME(rohan): Not sure why this isn't working, turbo is weird
import { utils } from "promptable";
import { CreateSimpleTextIndexStep } from "promptable";
import { Indexes, OpenAI } from "promptable";
import { logger } from "./utils/Logger"

const apiKey = process.env.OPENAI_API_KEY || "missing";
const openai = new OpenAI(apiKey);


class Document {
    constructor(public text: string, public metadata: { [key: string]: string }) {
    }
}

// Get an access token here: https://dropbox.github.io/dropbox-api-v2-explorer/#files_list_folder
// eslint-disable-next-line turbo/no-undeclared-env-vars
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
if (!DROPBOX_ACCESS_TOKEN) {
    throw new Error('DROPBOX_ACCESS_TOKEN environment variable is not set.');
}


// @ts-expect-error
const cache = Cache.default({ // NOTE(rohan): Not sure why we have to call .default here, turbo is weird
    basePath: "./.cache",
    ns: "dropbox-qa"
});

const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });
const path = "/Cursor/1.0 Corporate/1.1 Corporate Matters";


async function getDbxFile(entry: { path_lower?: string, content_hash?: string }) {
    if (!entry.path_lower || !entry.content_hash) {
        return undefined;
    }
    const cachedFile = await cache.get(entry.content_hash);
    if (cachedFile) {
        return cachedFile;
    } else {
        console.log(`Cache miss for ${entry.path_lower}, downloading`)
        const file = await dbx.filesDownload({ path: entry.path_lower });
        // @ts-expect-error
        const fileBinary = file.result.fileBinary;
        await cache.set(entry.content_hash, fileBinary);
        return fileBinary;
    }
}

async function getDbxDocuments(path: string) {
    const documents = [];
    let tokens = 0;
    const response = await dbx.filesListFolder({ path: path });
    console.log(`There are ${response.result.entries.length} files in ${path}.`)
    for (const entry of response.result.entries) {
        if (entry['.tag'] === 'file' && entry.name.endsWith('.pdf') && entry.path_lower) { //&& entry.name.includes("IRS")) {
            const fileBinary = await getDbxFile(entry);
            const pdfFile = await pdf(fileBinary);
            // regex to find more than 2 newlines in a row
            const text = pdfFile.text.replace(/\n{3,}/g, "\n\n");
            documents.push(new Document(text, { path: entry.path_lower }));
            tokens += countTokens(pdfFile.text);
        }
    }
    return { documents, tokens };
}

export default async function run() {
    logger.settings.minLevel = 5;
    const { documents, tokens } = await getDbxDocuments(path);
    console.log("Starting");
    console.log(`There are ${documents.length} documents in ${path} with ${tokens} tokens.`);
    console.log(`Estimated cost: $${((tokens / 1000) * 0.02).toFixed(2)}`);
    console.log("Use CTRL-C to exit");

    const splitter = new utils.SimpleTokenSplitter(2000);

    const queryPrompt = new Prompt(`The original question is as follows: {{userQuery}}
We have provided an existing answer: {{answer}}

The following document is provided to you:
DOCUMENT STARTS HERE

{{chunk}}

DOCUMENT ENDS HERE

Given the document above, refine the original answer to better answer the question.
If the context isn't useful, return the original answer.

Answer is:`.trim(), ["chunk", "userQuery", "answer"]);

    const userQuery = "What is the company's EIN?";
    console.log(`Executing query: ${userQuery}`)

    const index = new Indexes.SimpleTextIndex(documents, { splitter });
    const answer = await index.search(userQuery, { mode: "refine", prompt: queryPrompt, provider: openai });
    console.log(`Got answer: ${answer}`)
    /*

    const { index } = new CreateSimpleTextIndexStep({
        name: "index",
        splitter
    }).run({ documents });

    const response = new IndexSearchStep({
        name: "query",
        mode: "refine",
        prompt: queryPrompt
    }).run({ index, userQuery });
    */


    // Or one step
    /*
    const response = SequentialStep({
        steps: [
            new CreateTextIndexStep({
                name: "indexStep",
                splitter
            }),
            new IndexSearchStep({
                name: "queryStep",
                mode: "refine",
                prompt: queryPrompt
            })
        ]
    }).run({ documents, userQuery })
    */
}