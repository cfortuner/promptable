import { NextApiRequest, NextApiResponse } from "next";
import { Prompt, OpenAI, LLMChain } from "promptable";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    type bulletBody = {
        organization: string,
        title: string
    }

    // Ensure key is properly processed
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing env var from OpenAI");
    }

    // Retrieve organization and title params from request body
    const { organization, title }: bulletBody = req.body;

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    // Check for incorrect request
    if (!organization || !title) {
        return res.status(400).send("Improper request")
    }

    // Create prompt with the given variables
    const generateBulletPrompt = new Prompt(`Write 3 resume professional "\u2022" points for a {{title}} at {{organization}}. 
    If relevant to the position one should be quanitifiable, do not label it as quanitifiable.`, ['title', 'organization']);

    // Create LLMChain with prompt and provider; run the chain
    const bulletChain = new LLMChain(generateBulletPrompt, openai)

    const bullets = await bulletChain.run({title: title, organization: organization})

    // Return response if text generated successfully; otherwise fail and return 400
    if (bullets) {
        return res.status(200).json({bullets: bullets})    
    } else {
        return res.status(400).send("Error generating bullets")
    }
}