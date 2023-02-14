import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";
import { api } from "src/utils/api";
// change to get from prisma

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // chains.push(req.body.data.chain);
    console.log("adding trace:", req.body.data.trace)
    api.trace.add.useMutation().mutate({trace: req.body.data.trace})
    res.status(200).send(null);
    return;
  }

  // GET
  // res.status(200).json("get response");
}
