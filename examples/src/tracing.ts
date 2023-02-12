import R, { pipe } from "ramda";
import { scope, setTraceConfig } from "promptable";
import { pipeAsync, traversePromises } from "ramda-async";

const run = async (args: string[]) => {
  setTraceConfig({
    send: (trace) => {
      console.log("Received Trace", trace);
    },
  });
  const p = scope("tracing-example");

  const step1 = p.trace(
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
  const step2 = p.trace(
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
  const step3 = p.trace(
    "step3",
    (props: { dog: { dog: string } }) => {
      console.log("Finished!", props);
    },
    ["example"]
  );

  // pipe a few functions together
  const pipeline = pipeAsync(step1, step2, step3);

  pipeline("dog");
};
export default run;
