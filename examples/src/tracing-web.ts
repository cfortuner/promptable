import { trace, setTraceConfig, sendTraceToServer } from "@promptable/server";
import { pipeAsync } from "ramda-async";

/**
 * An example showing how to send traces to the promptable web server.
 *
 * @param args
 */
const run = async (args: string[]) => {
  setTraceConfig({
    send: (trace) => {
      console.log("Received Trace", trace);
      sendTraceToServer(trace);
    },
  });

  const t = trace("tracing-web", async () => {
    const step1 = trace(
      "step1",
      async (dog: string) => {
        await new Promise((resolve) => {
          resolve(1);
        });
        return {
          dog,
        };
      },
      ["example"]
    );
    const step2 = trace(
      "step2",
      (props: { dog: string }) => {
        return {
          dog: {
            dog: props.dog,
          },
        };
      },
      ["example"]
    );
    const step3 = trace(
      "step3",
      (props: { dog: { dog: string } }) => {
        console.log("Finished!", props);
      },
      ["example"]
    );

    // pipe a few functions together
    const pipeline = pipeAsync(step1, step2, step3);

    await pipeline("dog");
  });

  await Promise.all([t()]);
};

export default run;
