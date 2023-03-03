/**
 * Computes the cosine similarity between two embedding vectors.
 *
 * ## Notes
 *
 * - Since OpenAI embeddings are normalized, the dot product is equivalent to the cosine similarity.
 *
 * @private
 * @param x - first vector
 * @param y - second vector
 * @returns dot product
 */
export function vectorSimilarity(x: number[], y: number[]): number {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i] * y[i];
  }
  return sum;
}
