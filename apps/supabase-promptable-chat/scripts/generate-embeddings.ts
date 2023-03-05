import cheerio, { CheerioAPI } from 'cheerio';
import { supabaseAdmin } from '@/utils/supabase-client';
import { openaiClient } from '@/utils/openai-client';
import * as p from 'promptable';

const generateEmbeddings = async () => {
  /**
   * script to generate embeddings using openai via promptable
   */
};

// /**
//  * draft solution

// // try {
// //   const embeddingResponse = await openaiClient.embed(input);

// //   const [{ embedding }] = embeddingResponse.data.data;

// //   const {error: insertDocumentError, data: Document} = await supabaseAdmin.from('documents').insert({
// //     content: input,
// //     embedding,
// //     url,
// //   }).select().limit(1).single()
// // } catch (error) {
// //     console.log('error', error);
// // }
