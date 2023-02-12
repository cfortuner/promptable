import { v4 } from "uuid";
import axios, { AxiosError } from "axios";

export interface TraceConfig {
  serverUrl: string;
  send: (trace: Trace) => Promise<void> | void;
}

// Log the trace on the server
const sendTraceToServer = async (trace: Trace) => {
  try {
    await axios.post(config.serverUrl, {
      ...trace,
    });
  } catch (error) {
    console.error(`Error logging to server: ${(error as AxiosError).message}`);
  }
};

const defaultConfig: TraceConfig = {
  serverUrl: "http://localhost:3000/trace",
  send: sendTraceToServer,
};

let config: TraceConfig = defaultConfig;

export const setTraceConfig = (newConfig: Partial<TraceConfig>) => {
  console.log("Setting trace config:", newConfig);
  config = { ...defaultConfig, ...newConfig };
};

export interface Trace {
  name: string;
  inputs: any;
  outputs: any;
  error?: any;
  sessionId: string;
  tags?: string[];
  timestamp: number;
}

const recordTrace = async (trace: Omit<Trace, "timestamp">) => {
  config.send({
    ...trace,
    timestamp: Date.now(),
  });
};

export const scope = (name: string) => {
  const sessionId = v4();

  recordTrace({
    name,
    inputs: null,
    outputs: null,
    sessionId,
    tags: ["session-start"],
  });

  return {
    /**
     * Wrap a function in a step that logs the inputs and outputs to the server
     *
     * @param fn
     * @param name
     * @param tags
     * @returns
     */
    trace: <T extends any[], R extends any>(
      name: string,
      fn: (...args: T) => R,
      tags?: string[]
    ) => {
      return (...args: T) => {
        console.log(`Step: ${name} - Inputs:`, args);
        recordTrace({
          name,
          inputs: args,
          tags,
          outputs: null,
          sessionId,
        });
        try {
          const result = fn(...args);
          if (result instanceof Promise) {
            return result.then((res) => {
              console.log(`Step: ${name} - Outputs:`, result);
              return res;
            });
          }
          console.log(`Step: ${name} - Outputs:`, result);
          recordTrace({
            name,
            inputs: args,
            tags,
            outputs: result,
            sessionId,
          });
          return result;
        } catch (error) {
          console.error(`Error in step: ${name} - Error:`, error);
          recordTrace({
            name,
            inputs: args,
            tags,
            outputs: null,
            error: error,
            sessionId,
          });
          throw error;
        }
      };
    },
  };
};
