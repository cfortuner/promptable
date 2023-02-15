import fs from "fs";
import { Readable } from "stream";
import * as p from "promptable";
import { createParser } from "eventsource-parser";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiRequest
) {
  const openai = new p.OpenAI(process.env.OPENAI_API_KEY || "");

  const oaiRes: any = await openai.api.createCompletion(
    {
      prompt: "Write a poem about dogs",
      model: "text-davinci-003",
      max_tokens: 128,
      stream: true,
    },
    { responseType: "stream" }
  );

  console.log(oaiRes);

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: any) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of oaiRes.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}
