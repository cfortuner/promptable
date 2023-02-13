import R, { pipe } from "ramda";
import { withScope, trace, setTraceConfig } from "promptable";
import { pipeAsync, traversePromises } from "ramda-async";

const run = async (args: string[]) => {
  setTraceConfig({
    send: (trace) => {
      console.log("Received Trace", trace);
    },
  });

  withScope("tracing", async () => {
    const step1 = trace(
      "step1",
      async (dog: string) => {
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

    pipeline("dog");
  });
};
export default run;
