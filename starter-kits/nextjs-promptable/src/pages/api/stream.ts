// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

import * as promptable from "promptable";

const openai = new promptable.OpenAI(process.env.OPENAI_API_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await openai.stream("This is a test");

  return response;
}
