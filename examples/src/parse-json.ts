import dotenv from "dotenv";
dotenv.config();
import { OpenAI, prompts, JSONParser } from "@promptable/promptable";
import chalk from "chalk";

/**
 * Extract json from data.
 *
 * The ExtractJSONPrompt is a prompt that asks for data and a type definition
 * and then returns the JSON representation of the data.
 *
 * It also has a parser that parses the JSON output into a JavaScript object
 * or throws an error if the JSON is invalid.
 */
export default async function run() {
  const apiKey = process.env.OPENAI_API_KEY || "missing";

  const openai = new OpenAI(apiKey);
  const prompt = prompts.extractJSON();

  // Calendly email
  const data = `
Hi Colin,

A new event has been scheduled.

Event Type:
30 Minute Meeting

Invitee:
Your mom

Invitee Email:
yourmom@gmail.com

Event Date/Time:
11:00am - Tuesday, February 7, 2023 (Pacific Time - US & Canada)

Location:

This is a Google Meet web conference. Join now
Invitee Time Zone:
Pacific Time - US & Canada`;

  const response = await openai.generate(
    prompt.format({
      data,
      type: `{
        meeting_type: string, 
        Date: Date,
        Location: string,
        invitee_name: string,
        invitee_email: string,
    }`,
    })
  );

  const output = new JSONParser().parse(response.text);

  console.log(chalk.greenBright(`JSON`, JSON.stringify(output, undefined, 4)));
}
