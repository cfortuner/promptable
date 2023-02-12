import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { chainRouter } from "src/server/api/routers/chains";

// change to get from prisma

const chains: any[] = [{name: "cat"}];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    chains.push(req.body.data.chain);
    res.status(200).send(null);
    return;
  }

  // GET
  res.status(200).json({ chains });
}
