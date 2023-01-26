import { atom, useAtom } from "jotai";
import classnames from "classnames";
import { useState } from "react";
import { tabAtom } from "./Tabs";

export const Content = () => {
  const [activeTab, setActiveTab] = useAtom(tabAtom);

  const chains: any[] = [{ name: "first" }];

  return (
    <div className="flex-grow">
      <div className="grid h-full grid-cols-8">
        <div className="col-span-2 h-full bg-base-100"></div>
        <div className="col-span-6 h-full">
          {chains.map((chain) => {
            return (
              <div key={chain.name} className="p-4">
                <div
                  tabIndex={0}
                  className="daisy-collapse-arrow daisy-collapse rounded-box border border-base-300 bg-base-100"
                >
                  <div className="daisy-collapse-title text-xl font-medium">
                    Focus me to see content
                  </div>
                  <div className="daisy-collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
