import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { tabAtom } from "./Tabs";
import dynamic from "next/dynamic";
import { api } from "src/utils/api";
import { useEffect } from "react";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

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

const traces = [
  {
    name: "trace1",
    inputs: { a: 1, b: 2 },
    outputs: { c: 3 },
    context: { id: "1", name: "trace1" },
    tags: ["Provider:OpenAI", "QA"],
    timestamp: Date.now(),
  },
  {
    name: "trace2",
    inputs: { a: 1, b: 2 },
    outputs: { c: 3 },
    context: { id: "2", name: "trace2" },
    tags: ["Provider:OpenAI", "QA"],
    timestamp: Date.now(),
  },
  {
    name: "trace3",
    inputs: { a: 1, b: 2 },
    outputs: { c: 3 },
    context: { id: "3", name: "trace3" },
    tags: ["Provider:OpenAI", "QA"],
    timestamp: Date.now(),
  },
];

export const Content = () => {
  // todo: tabs
  const [activeTab, setActiveTab] = useAtom(tabAtom);

  const chains = api.chain.getTraces.useQuery(undefined, {refetchInterval: 1000}).data;
  const addChain = api.chain.add.useMutation();

  useEffect(() => {
    const addData = async () => {
      addChain.mutateAsync({
        scopeId: "qwerty",
        trace:`{"name":"this trace was created in Context.tsx ${Math.random()}"}`
      })
    }
    addData();
  }, [])
  
  return (
    <div className="flex h-[1px] w-full flex-grow justify-center overflow-y-auto">
      <div className="container h-full w-full py-4">
        {traces.map((trace) => {
          return (
            <div key={trace.name} className="py-1">
              <div
                tabIndex={0}
                className="daisy-collapse-arrow daisy-collapse rounded-none border border-base-300 bg-base-100 p-0"
              >
                <div className="daisy-collapse-title h-fit min-h-0 w-full px-4 text-sm font-medium">
                  {trace.name}
                  <div className="">
                    {trace.tags?.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className="daisy-badge-secondary daisy-badge daisy-badge-sm mr-2"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="daisy-collapse-content p-0">
                  <div className="border-t-1 px-4">
                    <ReactJson src={trace} theme="google" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
