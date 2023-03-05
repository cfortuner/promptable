import { openaiClient } from '@/utils/openai-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Embeddings, prompts } from 'promptable';
import { supabaseAdmin } from '@/utils/supabase-client';

/**
 * Todo add promptable prompts, LLM generation, and test via supabase
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { question: query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'No question in the request' });
    }

    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuery = query.trim().replaceAll('\n', ' ');

    //embed user query
    const embeddings = await openaiClient.embed(sanitizedQuery);

    console.log('\nembeddingResponse: \n', embeddings);

    //perform similarity search
    const { error: matchError, data: documents } = await supabaseAdmin.rpc(
      'match_page_sections',
      {
        embeddings,
        similarity_threshold: 0.1, // Choose an appropriate threshold for your data
        match_count: 10, // Choose the number of matches
      },
    );

    if (matchError) {
      console.log('Failed to match page sections', matchError);
      return new Response('Error', { status: 500 });
    }

    console.log('documents', documents);

    /**
     * TODO
     *
     * 1. concat matched docs into context based on max tokens
     * 2. craft prompt to send with context to LLM
     */

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('error', error);
    return res.status(500).json({ message: 'Error occured, please try again' });
  }
}
