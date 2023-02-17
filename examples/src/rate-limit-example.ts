/** 
This example shows the built-in rate limiting functionality of Promptable.

We'll generate 25 requests and try to send them in parallel against the OpenAI API.
Since we're using the codex model, we have a rate limit of 20 requests per minute.

Without rate limiting, we'd expect some of the requests to fail.
With rate limiting, we expect all requests to succeed.
**/
import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

const attemptRequests = async (openai: OpenAI) => {
    const text = "this is a test";
    let responsesPromises = [];
    for (let i = 0; i < 25; i++) {
        responsesPromises.push(openai.generate(text, { model: "code-davinci-002" }));
    }
    const startTime = performance.now();
    let responses = await Promise.all(responsesPromises);
    const endTime = performance.now();
    let numFailed = responses.filter(r => r === "failed").length;
    return [numFailed, responses.length, endTime - startTime];
}

const run = async (_args: string[]) => {
    // Setting rateLimitConfig to null disables rate limiting
    const openaiNoLimit = new OpenAI(apiKey, { rateLimitConfig: null });
    let [numFailed, total, time] = await attemptRequests(openaiNoLimit);
    console.log(`Without rate limiting, ${numFailed}/${total} requests failed. Total time: ${time.toFixed(0)} ms`);
    console.log("Waiting 180 seconds for rate limit to reset...");
    // Sleep for 180 seconds to allow the rate limit to reset
    await new Promise(r => setTimeout(r, 180000));
    /* Since the default rateLimitConfig is set for text-davinci-003, we explicitly set the 
       rateLimitConfig to the codex model's rate limit with a lot of wiggle room (6 instead of 20)
       openai's rate limiter for codex is a little wonky so we use low rate limit */
    const openaiLimit = new OpenAI(apiKey, { rateLimitConfig: { requestsPerMinute: 6, tokensPerMinute: 20000 } });
    [numFailed, total, time] = await attemptRequests(openaiLimit);
    console.log(`With rate limiting, ${numFailed}/${total} requests failed. Total time: ${time.toFixed(0)} ms`);
};

export default run;
