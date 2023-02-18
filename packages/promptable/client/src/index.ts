// the following code is used to open a stream to the server
type openStream = (api: string) => Promise<Response> || (api: string,
  onChunk?: (chunk: string) => void,
  onFinish?: () => void,
  onError?: (error: any) => void
) => Promise<void>

export const openStream = (
  api: string,
  onChunk?: (chunk: string) => void,
  onFinish?: () => void,
  onError?: (error: any) => void
) => {
  const stream = new EventSource(api);

  stream.onmessage = (event) => {
    onChunk(event.data);
  };

  stream.onerror = (error) => {
    onError(error);
  };

  stream.onopen = () => {
    onFinish();
  };

  return stream;
};


import { OpenAI } from '@promptable/core'
class OpenAI extends OpenAI