import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { tabAtom } from "./Tabs";
import dynamic from "next/dynamic";
import { api } from "src/utils/api";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const getChains = async () => {
  const r = await fetch("/api/chains");
  const data = await r.json();

  return data.chains.concat([
    {
      name: "dog",
    },
  ]);
};

export const Content = () => {
  // todo: tabs
  const [activeTab, setActiveTab] = useAtom(tabAtom);

  const chains = api.chain.getTraces.useQuery(undefined,
    {refetchInterval: 2000}).data;

  return (
    <div className="flex h-[1px] w-full flex-grow justify-center overflow-y-auto">
      <div className="container h-full w-full py-4">
        {chains?.map((chain) => {
          return (
            <div key={chain.name} className="py-1">
              <div
                tabIndex={0}
                className="daisy-collapse-arrow daisy-collapse rounded-none border border-base-300 bg-base-100 p-0"
              >
                <div className="daisy-collapse-title h-fit min-h-0 w-full p-1 px-4 text-sm font-medium">
                  {chain.name}
                </div>
                <div className="daisy-collapse-content p-0">
                  <div className="border-t-1 px-4 py-1">
                    <ReactJson src={chain} theme="google" />
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
