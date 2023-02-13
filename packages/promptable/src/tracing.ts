import { v4 } from "uuid";
import axios, { AxiosError } from "axios";

export interface TraceConfig {
  serverUrl: string;
  send: (trace: Trace) => Promise<void> | void;
}

export interface Trace {
  name: string;
  inputs: any;
  outputs: any;
  error?: any;
  context: TraceContext;
  tags?: string[];
  timestamp: number;
}

export interface TraceContext {
  id: string;
  name?: string;
  // Other properties as needed
}

const defaultConfig: TraceConfig = {
  serverUrl: "http://localhost:3000/trace",
  send: sendTraceToServer,
};

let config: TraceConfig = defaultConfig;

/**
 * A stack of trace contexts
 * This is used to keep track of the current context
 * and to pass it to child traces
 *
 * This is a global variable, so it is shared across all modules
 *
 * TODO: This should be a thread-local variable
 */
const contextStack: TraceContext[] = [];

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
async function sendTraceToServer(trace: Trace) {
  try {
    await axios.post(config.serverUrl, {
      ...trace,
    });
  } catch (error) {
    console.error(`Error logging to server: ${(error as AxiosError).message}`);
  }
}

/**
 * Create a new trace context and run a function in that context
 *
 * @param name
 * @returns
 */
export const createScope = (name: string) => {
  const context = {
    id: v4(),
    name,
  };
  contextStack.push(context);
  return context;
};

/**
 * Create a new trace context and run a function in that context
 *
 * This is useful for running a function in a new context, such as a new request.
 *
 * @param name The name of the scope
 * @param fn The function to run in the scope
 * @returns The result of the function
 */
export const withScope = <T extends any[], R extends any>(
  name: string,
  fn: (...args: T) => R
) => {
  // Create a new context for this scope and push it onto the stack
  createScope(name);
  return (...args: T) => {
    const result = fn(...args);
    contextStack.pop();
    return result;
  };
};

/**
 * Record a trace for a function
 *
 * If there is no current context, create a new one and run the function in that scope.
 * If there is a current context, run the function in that scope.
 *
 * This is to ensure that the trace is recorded in the correct context.
 *
 * @example
 *
 * const step1 = trace("step1", (text: string) => {
 *    return text
 * },
 *
 * @param name The name of the trace
 * @param fn The function to trace
 * @param tags Tags to add to the trace
 * @returns A function that will be traced when called
 */
export const trace = <T extends any[], R extends any>(
  name: string,
  fn: (...args: T) => R,
  tags?: string[]
) => {
  const currentContext = contextStack[contextStack.length - 1];
  if (currentContext) {
    return traceInScope(name, currentContext, fn, tags);
  } else {
    return withScope(name, (...args: T) => {
      const currentContext = contextStack[contextStack.length - 1];
      return traceInScope(name, currentContext, fn, tags)(...args);
    });
  }
};

function traceInScope<T extends any[], R extends any>(
  name: string,
  context: TraceContext,
  fn: (...args: T) => R,
  tags?: string[]
) {
  return (...args: T) => {
    console.log(`Step: ${name} - Inputs:`, args);

    recordTrace({
      name,
      inputs: args,
      tags,
      outputs: null,
      context,
    });
    try {
      const result = fn(...args);
      console.log(`Step: ${name} - Outputs:`, result);
      recordTrace({
        name,
        inputs: args,
        tags,
        outputs: result,
        context,
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
        context,
      });
      throw error;
    }
  };
}

/**
 * Record a trace to the server.
 *
 * Uses the configured send function to send the trace to the server.
 *
 * @param trace
 */
const recordTrace = async (trace: Omit<Trace, "timestamp">) => {
  config.send({
    ...trace,
    timestamp: Date.now(),
  });
};
