import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";
import { api } from "src/utils/api";
import { PrismaClient } from "@prisma/client";
// change to get from prisma

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const prisma = new PrismaClient()
    const trace = req.body;
    console.log("adding trace:", trace)

    try {
      async function addTrace() {
        await prisma.trace.create({
          data: {
            trace: JSON.stringify(trace)
          }
        })
      }
      addTrace();
      res.status(200).send(null);
    } catch (error) {
      console.error(`Error adding traces to server: ${(error as Error).message}`);
    }
  }

  // GET
  res.status(200).json("get response");
}
