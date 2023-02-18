import chalk from "chalk";
import { AsyncLocalStorage } from "async_hooks";
import { v4 } from "uuid";
import axios, { AxiosError } from "axios";

export interface TraceConfig {
  serverUrl: string;
  send: (trace: Trace) => Promise<void> | void;
}

const defaultConfig: TraceConfig = {
  // TODO: what if localhost:3000 is not the port where promptable visualizer is, i.e. another app uses localhost:3000?
  serverUrl: "http://localhost:3000/api/traces",
  send: () => {},
};

let config: TraceConfig = defaultConfig;

/**
 * Set the trace config for your application
 *
 * This is useful for setting the server URL or the send function.
 *
 * @param newConfig
 */
export const setTraceConfig = (newConfig: Partial<TraceConfig>) => {
  console.log("Setting trace config:", newConfig);
  config = { ...defaultConfig, ...newConfig };
};

// Log the trace on the server
export async function sendTraceToServer(trace: Trace) {
  try {
    await axios.post(config.serverUrl, {
      ...trace,
    });
  } catch (error) {
    console.error(`Error logging to server: ${(error as AxiosError).message}`);
  }
}

export type Trace = {
  name: string;
  inputs: any[];
  outputs: any | null;
  tags: string[];
  id: string;
  parentId: string | undefined;
  children: Trace[];
  error?: any;
  timestamp: number;
};

// Need to use AsyncLocalStorage because the trace context
// needs to be passed to child traces
const traceContext = new AsyncLocalStorage<Trace>();

export const trace = <T extends any[], R extends any>(
  name: string,
  fn: (this: any, ...args: T) => R | Promise<R>,
  tags?: string[]
) => {
  return async (...args: T) => {
    // Get the parent trace context
    const parent = traceContext.getStore();

    // Create a new trace context
    const trace: Trace = {
      name,
      inputs: args,
      outputs: null,
      tags: tags || [],
      id: v4(),
      parentId: parent?.id,
      children: [],
      timestamp: Date.now(),
    };

    return await traceContext.run(trace, async () => {
      try {
        const result = await Promise.resolve(fn(...args));
        trace.outputs = result;
        return result;
      } catch (error) {
        console.error(`Error in step: ${name} - Error:`, error);
        trace.error = error as any;
        throw error;
      } finally {
        // Add the trace to the parent
        if (parent) {
          parent.children.push(trace);
        }

        recordTrace(trace);
      }
    });
  };
};

/**
 * Record a trace to the server.
 *
 * Uses the configured send function to send the trace to the server.
 *
 * @param trace
 */
const recordTrace = async (trace: Trace) => {
  config.send({
    ...trace,
  });
};

export function graphTraces(traces: Trace[], indent = 0) {
  traces
    .filter((trace) => !trace.parentId)
    .forEach((trace) => {
      const indentation = "--->".repeat(indent);
      console.log(chalk.blueBright(`${indentation}${trace.name}`), "(root)");
      printChildren(trace, indent + 1);
    });
}

function printChildren(trace: Trace, indent: number) {
  trace.children.forEach((child) => {
    const indentation = "---".repeat(indent);
    console.log(`${indentation}>`, chalk.blue(`${child.name}`));
    printChildren(child, indent + 1);
  });
}
