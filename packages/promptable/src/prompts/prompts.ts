import { Prompt } from "@prompts/Prompt";

/**
 * 
Given the following document, answer the question if you can.
If you don\'t have enough information, don't return anything.

Document:
{{document}}

Question:
{{question}}

Answer:`
 */
export const QA = () =>
  new Prompt(
    `Given the following document, answer the question if you can.If you don\'t have enough information, don't return anything.\nDocument: {{document}}\nQuestion: {{question}}\nAnswer:`,
    { question: "", document: "" }
  );

/**
 *Use the following portion of a long document to see if any of the text is relevant to answer the question. 

Return any relevant text verbatim.

{{document}}

Question: {{question}}

Relevant text, if any: 
 */
export const extractText = () =>
  new Prompt(
    `
Use the following portion of a long document to see if any of the text is relevant to answer the question. 
Return any relevant text verbatim.
{{document}}
Question: {{question}}
Relevant text, if any:`.trim(),
    { question: "", document: "" }
  );

/**
 * Write a concise summary of the document below:

{{document}}

Summary:
 */
export const summarize = () =>
  new Prompt(
    `Write a concise summary of the text below:

{{document}}

Summary:`.trim(),
    { document: "" }
  );

/**
You are Assistant. Help the user as much as possible.

{{memory}}
User: {{userInput}}
Assistant:
*/
export const chatbot = () =>
  new Prompt(
    `You are Assistant. Help the user as much as possible.

{{memory}}
User: {{userInput}}
Assistant:`.trim(),
    { memory: "", userInput: "" }
  );

/**
  Given this typescript type return a valid, stringified JSON Object representing an instance of the type.
  Make sure the response is JUST the object. Not a variable or anything else.
  Examples:

  Correct:
  {
    "name": "John",
  }

  Wrong:
  const data = {
    "name": "John",
  }

  Note:
  - undefined and null is not a valid json fields, instead, just leave out the field
  - use a random stringified iso date format for dates
  - optional, undefined or nullable fields in the response mean that you can skip them OR you can add them. Choose randomly.
   
  
  Okay, here's the type:
  {{type}}

  const VALID_STRINGIFIED_JSON=
 */
export const extractJSON = () =>
  new Prompt(
    `Given this data and a typescript type, return a valid, stringified JSON Object representing an instance of the type.
  Make sure the response is JUST the object. Not a variable or anything else.
  Example:

  Data: Hey my name is Colin.
  Type:
  {
    name: string
  }
  Stringified JSON:
  {
    "name": "John",
  }

  ---

  Notes:
  - undefined and null are not valid json fields, instead, just leave out the field.
  - convert date information to stringified iso date format for dates.
  - optional, undefined or nullable fields in the response mean that you can skip them OR you can add them depending on the data.

  ---
   
  Okay, here's the Data and the Type:
  Data:
  {{data}}

  Type:
  {{type}}

  Stringified JSON:
  `.trim(),
    { data: "", type: "" }
  );

/**
Given this data and a list of headers, return a CSV file containing the column data.
    Example:
  
    Data: Hey my name is Colin and I'm a 29 year old software engineer.
    Headers: Name, 
    CSV:
    Name,Age,Occupation
    Colin,29,Software Engineer
  
    Notes:
    - undefined and null are not valid csv fields, instead, just leave out the field.
    - convert date information to stringified iso date format for dates.
    - optional, undefined or nullable fields in the response mean that you can skip them OR you can add them depending on the data.
    - the first row of the csv should be the headers
  
    ---
     
    Okay, here is the Data and the Headers:
    Data:
    {{data}}
  
    Headers:
    {{headers}}
  
    CSV:
 */
export const extractCSV = () =>
  new Prompt(
    `Given this data and a list of headers, return a CSV file containing the column data.
    Example:
  
    Data: Hey my name is Colin and I'm a 29 year old software engineer.
    Headers: Name,Age,Occupation 
    CSV:
    Name,Age,Occupation
    Colin,29,Software Engineer
  
    Notes:
    - if the data contains ',' then escape it with a backslash. 
    - If no value exists for a header, then leave the cell empty.
    - convert date information to stringified iso date format for dates.
    - the first row of the csv should be the headers
    - DON't add any additional headers. Only the ones provided.
    - ONLY output the data for the columns, nothing else.
    - Make sure there is no extra whitespace around the csv data.
  
    ---
     
    Okay, here is the Data and the Headers:
    Data:
    {{data}}

    Headers:
    {{headers}}

    CSV:
    {{headers}}
    `.trim(),
    { data: "", headers: "" }
  );

/**
  Use this prompt to fix a markup language document that is not parsing correctly.

  Set the markupLanguage to the markup language that is being used. (ex. JSON, yaml, markdown, etc.)
  Set the documentType to the type of document that is being parsed. (ex. object, array, string, document, etc.)
  Set the markup to the markup that is not parsing correctly.
**/

export const fixMarkup = () =>
  new Prompt(
    `
    The following is supposed to be a {{markupLanguage}} {{documentType}} which is not parsing correctly.
    Ensure the data is a valid {{markupLanguage}} {{documentType}}.
    Note: if there are newlines in strings in the {{documentType}}, they must be replaced with \n
    Return the updated {{markupLanguage}} {{documentType}}.

    Input Data:
    {{markup}}
    Response:
    `.trim(),
    { markup: "", markupLanguage: "", documentType: "" }
  );
