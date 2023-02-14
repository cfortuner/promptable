import R, { pipe } from "ramda";
import { trace, setTraceConfig, Trace, graphTraces } from "promptable";
import { pipeAsync, traversePromises } from "ramda-async";

const run = async (args: string[]) => {
  const traces: Trace[] = [];

  setTraceConfig({
    send: (trace) => {
      console.log("Received Trace", trace);
      traces.push(trace);
    },
  });

  const scopedFns = async () => {
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
        return props;
      },
      ["example"]
    );

    // pipe a few functions together
    const pipeline = pipeAsync(
      step1,
      step2,
      // trace("substep", pipeAsync(step2, step3)),
      step3
    );

    await pipeline("dog");
  };

  await Promise.all([
    trace("first", scopedFns)(),
    trace("second", scopedFns)(),
  ]);

  // create a graph of the traces
  graphTraces(traces);
};
export default run;
