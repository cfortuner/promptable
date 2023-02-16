import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { tabAtom } from "./Tabs";
import dynamic from "next/dynamic";
import { api } from "src/utils/api";
import { useEffect, useRef, useState } from "react";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

export type Trace = {
  name: string;
  inputs: any[];
  outputs?: any;
  tags: string[];
  id: string;
  parentId?: string;
  children: Trace[];
  error?: any;
  timestamp: number;
};

export const Content = () => {
  // todo: tabs
  const [activeTab, setActiveTab] = useAtom(tabAtom);

  const [parentId, setParentId] = useState<string | undefined>();
  const prevParentStack = useRef<string[]>([]);

  const handleClickChildren = (id: string) => {
    if (parentId) {
      prevParentStack.current.push(parentId);
    }
    setParentId(id);
  };
  
  let traces = api.trace.getTraces.useQuery(undefined, {refetchInterval: 1000}).data;

  if (traces === undefined) {
    traces = []
  }

  const parent = parentId && traces.find((t) => t.id === parentId);

  // const a = api.trace.add.useMutation();

  // useEffect(() => {
  //   a.mutate({trace: myTrace})
  // }, [])


  //TODO: change so that traces is queried from gettraces

  return (
    <>
      <div className="flex h-[1px] w-full flex-grow justify-center overflow-y-auto">
        <div className="container h-full w-full py-4">
          <div className="flex items-center space-x-4">
            {parentId && (
              <div>
                <button
                  className="daisy-btn"
                  onClick={() => {
                    const prevId = prevParentStack.current.pop();
                    setParentId(prevId);
                  }}
                >
                  {"<- Back"}
                </button>
              </div>
            )}
            {parent && <div>Parent Scope: {parent.name}</div>}
          </div>
          {traces
            .filter((t) => t.parentId === parentId)
            .map((trace) => {
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
                      <div>
                        {trace.children.length > 0 && (
                          <button
                            className="daisy-btn"
                            onClick={() => {
                              handleClickChildren(trace.id);
                            }}
                          >
                            {trace.children.length} children
                          </button>
                        )}
                      </div>

                      <div></div>
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
    </>
  );
};

const Trace = ({ trace, level }: { trace: Trace; level: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isRootNode = !trace.parentId;
  const className = isRootNode
    ? "border-t-1 pt-2 pb-4"
    : "border-l-2 pl-2 my-2";

  return (
    <div className={className}>
      {isRootNode && (
        <div
          tabIndex={0}
          className="daisy-collapse-arrow daisy-collapse rounded-none border border-base-300 bg-base-100 p-0"
          onClick={handleToggle}
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
        </div>
      )}

      <div className="pl-4">
        <div className="my-1 flex">
          <div className="ml-2">
            <ReactJson
              src={trace}
              theme="google"
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              name={null}
            />
          </div>
        </div>

        {isOpen &&
          trace.children.map((child) => (
            <Trace key={child.id} trace={child} level={level + 1} />
          ))}
      </div>
    </div>
  );
};
