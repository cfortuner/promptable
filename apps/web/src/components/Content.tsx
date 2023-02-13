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

const traces = [
  {
    name: "step1",
    inputs: ["dog"],
    outputs: {
      dog: "dog",
    },
    tags: ["example"],
    id: "bf6059cb-a119-44a6-aa34-79eeb0ac211c",
    parentId: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [],
    timestamp: 1676299968397,
  },
  {
    name: "step1",
    inputs: ["dog"],
    outputs: {
      dog: "dog",
    },
    tags: ["example"],
    id: "3e240f2e-b69e-4384-8a20-569835488133",
    parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [],
    timestamp: 1676299968398,
  },
  {
    name: "step2",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "07ebdd02-3e9d-4997-a42c-3f32622b2545",
    parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
    children: [],
    timestamp: 1676299968399,
  },
  {
    name: "step2",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "08919bd3-3473-473d-9f35-a7313648ce7a",
    parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
    children: [],
    timestamp: 1676299968399,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "3f4fab42-69fa-4980-ada7-6d05f9d14bd0",
    parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
    children: [],
    timestamp: 1676299968400,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "bd22b04f-a734-4c94-88da-e77770a181d2",
    parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
    children: [],
    timestamp: 1676299968400,
  },
  {
    name: "substep",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: [],
    id: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
    parentId: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [
      {
        name: "step2",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "07ebdd02-3e9d-4997-a42c-3f32622b2545",
        parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
        children: [],
        timestamp: 1676299968399,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "3f4fab42-69fa-4980-ada7-6d05f9d14bd0",
        parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
        children: [],
        timestamp: 1676299968400,
      },
    ],
    timestamp: 1676299968398,
  },
  {
    name: "substep",
    inputs: [
      {
        dog: "dog",
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: [],
    id: "15009f56-d609-4829-8cf2-ba9cef98f225",
    parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [
      {
        name: "step2",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "08919bd3-3473-473d-9f35-a7313648ce7a",
        parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
        children: [],
        timestamp: 1676299968399,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "bd22b04f-a734-4c94-88da-e77770a181d2",
        parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
        children: [],
        timestamp: 1676299968400,
      },
    ],
    timestamp: 1676299968398,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "5e2d4f80-0c33-4a09-bef1-4e5f12208156",
    parentId: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [],
    timestamp: 1676299968401,
  },
  {
    name: "step3",
    inputs: [
      {
        dog: {
          dog: "dog",
        },
      },
    ],
    outputs: {
      dog: {
        dog: "dog",
      },
    },
    tags: ["example"],
    id: "7322bd4b-0816-4764-8271-785dbb55c29c",
    parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [],
    timestamp: 1676299968401,
  },
  {
    name: "first",
    inputs: [],
    tags: [],
    id: "6102c965-1939-495d-bacd-320bc04b2751",
    children: [
      {
        name: "step1",
        inputs: ["dog"],
        outputs: {
          dog: "dog",
        },
        tags: ["example"],
        id: "bf6059cb-a119-44a6-aa34-79eeb0ac211c",
        parentId: "6102c965-1939-495d-bacd-320bc04b2751",
        children: [],
        timestamp: 1676299968397,
      },
      {
        name: "substep",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: [],
        id: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
        parentId: "6102c965-1939-495d-bacd-320bc04b2751",
        children: [
          {
            name: "step2",
            inputs: [
              {
                dog: "dog",
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "07ebdd02-3e9d-4997-a42c-3f32622b2545",
            parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
            children: [],
            timestamp: 1676299968399,
          },
          {
            name: "step3",
            inputs: [
              {
                dog: {
                  dog: "dog",
                },
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "3f4fab42-69fa-4980-ada7-6d05f9d14bd0",
            parentId: "f06ee0a7-b3a6-4a06-b4ca-4faa8bb9e70e",
            children: [],
            timestamp: 1676299968400,
          },
        ],
        timestamp: 1676299968398,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "5e2d4f80-0c33-4a09-bef1-4e5f12208156",
        parentId: "6102c965-1939-495d-bacd-320bc04b2751",
        children: [],
        timestamp: 1676299968401,
      },
    ],
    timestamp: 1676299968396,
  },
  {
    name: "second",
    inputs: [],
    tags: [],
    id: "109671ab-3aae-4fac-ab9f-4581268a636f",
    children: [
      {
        name: "step1",
        inputs: ["dog"],
        outputs: {
          dog: "dog",
        },
        tags: ["example"],
        id: "3e240f2e-b69e-4384-8a20-569835488133",
        parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
        children: [],
        timestamp: 1676299968398,
      },
      {
        name: "substep",
        inputs: [
          {
            dog: "dog",
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: [],
        id: "15009f56-d609-4829-8cf2-ba9cef98f225",
        parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
        children: [
          {
            name: "step2",
            inputs: [
              {
                dog: "dog",
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "08919bd3-3473-473d-9f35-a7313648ce7a",
            parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
            children: [],
            timestamp: 1676299968399,
          },
          {
            name: "step3",
            inputs: [
              {
                dog: {
                  dog: "dog",
                },
              },
            ],
            outputs: {
              dog: {
                dog: "dog",
              },
            },
            tags: ["example"],
            id: "bd22b04f-a734-4c94-88da-e77770a181d2",
            parentId: "15009f56-d609-4829-8cf2-ba9cef98f225",
            children: [],
            timestamp: 1676299968400,
          },
        ],
        timestamp: 1676299968398,
      },
      {
        name: "step3",
        inputs: [
          {
            dog: {
              dog: "dog",
            },
          },
        ],
        outputs: {
          dog: {
            dog: "dog",
          },
        },
        tags: ["example"],
        id: "7322bd4b-0816-4764-8271-785dbb55c29c",
        parentId: "109671ab-3aae-4fac-ab9f-4581268a636f",
        children: [],
        timestamp: 1676299968401,
      },
    ],
    timestamp: 1676299968397,
  },
].reverse();

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

  const parent = parentId && traces.find((t) => t.id === parentId);

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
