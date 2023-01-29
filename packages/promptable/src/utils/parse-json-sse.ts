// todo: https://github.com/openai/openai-node/issues/18#issuecomment-1369996933
// there is definitely a better api that we should create for making it simple
// to stream completions on the frontend or backend.

/**
 * Handle Server Sent Events (SSE) and parse JSON
 * 
 * Taken from
 * https://www.beskar.co/blog/streaming-openai-completions-vercel-edge
 * 
 * Usage:
 * ```
 *  const res = await fetch("https://api.openai.com/v1/completions", {
 *    headers: {
 *      "Content-Type": "application/json",
 *      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
 *    },
 *    method: "POST",
 *    body: JSON.stringify({
 *      prompt: data.prompt,
 *      model: "text-davinci-003",
 *      max_tokens: 128,
 *      temperature: 0.7,
 *      stream: true,
 *    }),
 *  });

 *  parseJsonSSE({
 *    data: res.body,
 *    onParse: (data) => onMessage(data.choices?.[0].text);
 *    onFinish: onClose,
 *  });
 * ``` 
 * */
export const parseJsonSSE = async <T>({
  data,
  onParse,
  onFinish,
}: {
  data: ReadableStream;
  onParse: (object: T) => void;
  onFinish: () => void;
}) => {
  const reader = data.getReader();
  const decoder = new TextDecoder();

  let done = false;
  let tempState = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const newValue = decoder.decode(value).split("\n\n").filter(Boolean);

    if (tempState) {
      newValue[0] = tempState + newValue[0];
      tempState = "";
    }

    // On the edge (vercel), events can be fragmented and json can be invalid
    // https://socket.dev/npm/package/@beskar-labs/parse-json-sse
    newValue.forEach((newVal) => {
      try {
        const json = JSON.parse(newVal.replace("data: ", "")) as T;

        onParse(json);
      } catch (error) {
        tempState = newVal;
      }
    });
  }

  onFinish();
};
