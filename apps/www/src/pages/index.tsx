import React, { useRef, useEffect, useState, memo } from "react";
import Layout from "@theme/Layout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code } from "../components/Code";
import { NewsLetter } from "../components/Newsletter";
import { NewCustomCode } from "../components/NewCode";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ContinueWithGithubButton } from "./studio";
import { track } from "../analytics/mixpanel";

export default function Home(): JSX.Element {
  return (
    <div className="overflow-x-hidden static">
      <Layout>
        <HeroSection />
        <div className="bg-[#010101] pb-32">
          <div className="relative layout">
            <img src="img/bg-lines.png" className="absolute z-0" />
            <Breadcrumb text="A new stack" />
            <h2 className="w-3/4 mt-4 text-3xl font-semibold text-white md:text-5xl">
              <span className="grad">Promptable</span> provides the utilities
              you need to build AI powered applications with tools like{" "}
              <span className="grad">Next.js</span>,{" "}
              <span className="grad">Svelte</span>,{" "}
              <span className="grad">Remix</span> and more.
            </h2>
            <FeaturesDemo />
          </div>
        </div>
        <Studio />
        <NewsLetter />
      </Layout>
    </div>
  );
  // return <Redirect to="/docs/introduction" />;
}

const Studio = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx bridge-studio").then(() => {
      track("npx bridge-studio copied", {
        location: "index bridge-studio",
      });
      setCopied(true);
    });
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className="md:pb-24 pb-12 bg-[#010101]">
      <div
        className="relative bg-[#010101] bg-contain bg-no-repeat"
        style={{ backgroundImage: `url("/studio/main.svg")` }}
      >
        <div className="px-4 max-w-6xl mx-auto relative md:pt-60 pt-24 pb-8 z-10">
          <div className="md:w-3/4 mx-auto">
            <p className="font-bold md:text-5xl text-4xl text-white text-center md:px-10 px-8 mt-8">
              Visualize your Chains and Data with Promptable Studio
            </p>
            <p className="text-center mt-6 text-[#808080] text-lg md:px-32 px-8">
              Promptable Studio simplifies debugging by visualizing your
              Prompts, Chains, and Data in a single UI.
            </p>
          </div>
          <div className="mt-9">
            <BridgeStudioBeta customText="Read more about Promptable Studio" />
          </div>
          <img
            src="/studio/studio-header.svg"
            className="mt-24 no-select mx-auto"
          />
          {/* <div className="mt-16 grid grid-cols-2 gap-32 mb-16"> */}
          {/*   <CustomCard icon={<CodeBracketIcon className="w-5 h-5 text-white" />} title="SDK generation" description="Improve your developer productivity by generating an SDK" /> */}
          {/*   <CustomCard icon={<BookOpenIcon className="w-5 h-5 text-white" />} title="Documentation generation" description="Improve your developer productivity by generating an SDK" /> */}
          {/* </div> */}
          {/* <div className="max-w-xl mx-auto w-full p-12 bg-white bg-opacity-5 border border-white border-opacity-10 md:mt-48 mt-24 rounded-md">
            <div className="mx-auto">
              <h3 className="text-white text-3xl text-center">
                Try Promptable Studio now
              </h3>
              <p className="text-base w-3/4 mx-auto font-medium text-center text-opacity-50 opacity-75 mb-2">
                Go into your Bridge app folder and use the CLI "npx
                bridge-studio"
              </p>
              <div>
                <div
                  onClick={() => {
                    copyCommand();
                  }}
                  className="max-w-md p-0.5 relative mx-auto mt-10 bg-left-bottom hover:bg-right-bottom overflow-hidden rounded-md cursor-pointer group bg-grad-blue-green transition-all hover:position"
                  style={{
                    backgroundSize: "300% 300%",
                    transitionDuration: "2000ms",
                  }}
                >
                  <div
                    className="py-3 text-center text-white rounded-sm bg-[#0D0B0E] overflow-hidden"
                    style={{
                      fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
                      borderRadius: 4,
                    }}
                  >
                    npx bridge-studio
                  </div>
                  <div className="absolute p-1.5 text-white bg-white bg-opacity-0 -translate-y-1/2 border border-white hover:bg-opacity-20 border-opacity-0 rounded-md opacity-50 group-hover:border-opacity-20 hover:opacity-75 right-3 top-1/2">
                    {copied ? (
                      <div className="text-xs uppercase">copied</div>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3C8 2.44772 8.44772 2 9 2H11C11.5523 2 12 2.44772 12 3C12 3.55228 11.5523 4 11 4H9C8.44772 4 8 3.55228 8 3Z"
                          fill="white"
                        />
                        <path
                          d="M6 3C4.89543 3 4 3.89543 4 5V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V5C16 3.89543 15.1046 3 14 3C14 4.65685 12.6569 6 11 6H9C7.34315 6 6 4.65685 6 3Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              {/* <p className='text-sm uppercase font-semibold text-center mb-2 mt-8' style={{ letterSpacing: 1.2 }}>Using GitHub</p> */}
          {/* <div className='flex place-content-center'> */}
          {/*   <ContinueWithGithubButton /> */}
          {/* </div> */}
          {/* </div>
          </div> */}
          {/* <div className="max-w-xl mx-auto px-4">
            <a
              className="text-center mx-auto block mt-4 rounded-md mx-4 text-white transition-all bg-opacity-0 bg-white hover:no-underline"
              href="/studio"
            >
              Read more about Bridge Studio
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// const Studio = () => {
//   return (
//     <div className="bg-[#010101]">
//       <div className="py-32 layout">
//         <Breadcrumb text="Coming soon" />
//         <h2 className="mt-3 text-4xl font-semibold text-white">
//           Bridge <span className="grad">Studio</span>
//         </h2>
//         <p className="w-3/4 mt-4 text-lg text-white text-opacity-50 md:text-xl">
//           Bridge aims to provide the best developer experience ever by simplifying the process of
//           developing and integrating APIs.
//         </p>
//         <h3 className="mt-3 mt-8 text-2xl font-semibold text-white">
//           {/* Your <span className="grad">API documentation</span> in one click */}
//           Your <span className="grad">Client Code</span> in one click
//         </h3>
//         <p className="w-3/4 mt-2 text-lg text-white text-opacity-50 md:text-lg">
//           Bridge can generate a fully typed client code in any language in matter of seconds. Log
//           with Github/Gitlab or use our CLI to sync your project with the platform.
//         </p>
//         <Code />
//         <h3 className="mt-3 mt-8 text-2xl font-semibold text-white">
//           Your <span className="grad">API documentation</span> in one click
//         </h3>
//         <p className="w-3/4 mt-2 text-lg text-white text-opacity-50 md:text-lg">
//           Bridge can generate a clear and concise API reference in a matter of seconds. Log with
//           Github/Gitlab or use our CLI to sync your project with the platform.
//         </p>
//         <img src="/img/dashboard.png" className="mt-12 rounded-md" />
//       </div>
//     </div>
//   );
// };

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const copyCommand = () => {
    navigator.clipboard.writeText("npm i promptable").then(() => {
      track("npm i promptable copied", {
        location: "index header",
      });
      setCopied(true);
    });
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className="bg-[#010101]">
      <div
        className="relative min-h-screen"
        style={{ backgroundImage: `url("/img/bg.png")` }}
      >
        <div className="relative z-20 py-20 md:py-48 layout">
          {/* <div className="mx-auto mt-4 mb-6 max-w-max">
            <Breadcrumb text=" DX" />
          </div> */}

          <BridgeStudioBeta />
          <h1 className="mt-8 text-4xl font-semibold text-center text-white md:text-6xl">
            Create AI <span className="grad">Prompt</span> Apps in{" "}
            <span className="grad">Typescript</span>
            {/* The <span className='grad'>smart </span> way to develop APIs to boost developer <span className='grad'>productivity</span> */}
          </h1>
          <p className="w-3/4 mx-auto mt-8 text-lg text-center text-white text-opacity-50 md:text-xl">
            {/* Because you deserve the best developer experience */}
            Promptable gives you the power to create AI-powered apps in a matter
            of minutes.
          </p>
          <div
            onClick={() => {
              copyCommand();
            }}
            className="max-w-md p-0.5 relative mx-auto mt-24 bg-left-bottom hover:bg-right-bottom overflow-hidden rounded-md cursor-pointer group bg-grad2 transition-all hover:positio"
            style={{
              backgroundSize: "300% 300%",
              transitionDuration: "2000ms",
            }}
          >
            <div
              className="py-3 text-center text-white rounded-sm bg-[#0D0B0E] font-medium"
              // style={{ fontFamily: 'Fira Code' }}
              style={{
                fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
                fontSize: 15,
              }}
            >
              $ npm i typescript
            </div>
            <div className="absolute p-1.5 text-white bg-white bg-opacity-0 -translate-y-1/2 border border-white hover:bg-opacity-20 border-opacity-0 rounded-md opacity-50 group-hover:border-opacity-20 hover:opacity-75 right-3 top-1/2">
              {copied ? (
                <div className="text-xs uppercase">copied</div>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3C8 2.44772 8.44772 2 9 2H11C11.5523 2 12 2.44772 12 3C12 3.55228 11.5523 4 11 4H9C8.44772 4 8 3.55228 8 3Z"
                    fill="white"
                  />
                  <path
                    d="M6 3C4.89543 3 4 3.89543 4 5V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V5C16 3.89543 15.1046 3 14 3C14 4.65685 12.6569 6 11 6H9C7.34315 6 6 4.65685 6 3Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        <img
          src="/img/globe-bottom.svg"
          className="absolute bottom-0 z-0 w-full"
        />
        <img
          src="/img/globe.png"
          className="absolute right-0 z-10 w-64 bottom-32"
        />
        <img
          src="/img/bg-lines.png"
          className="absolute z-10 -translate-x-1/2 -top-24 left-1/2"
        />
      </div>
    </div>
  );
};

const BridgeStudioBeta = ({ customText }: { customText?: string }) => {
  return (
    <a
      href="/studio"
      className="max-w-max mx-auto group block hover:no-underline"
      onClick={() => {
        track("Read more Bridge Studio click", {
          text: customText || "Promptable Beta Annoucement",
        });
      }}
    >
      <div
        className="max-w-max mx-auto rounded-full"
        style={{
          padding: 1,
          background: `linear-gradient(263.08deg, #75E0A2 0%, rgba(117, 224, 162, 0.25) 21.88%, rgba(117, 224, 162, 0.9) 42.71%, rgba(244, 248, 92, 0.3) 65.1%, rgba(244, 248, 92, 0.9) 84.38%, rgba(244, 248, 92, 0.25) 100%)`,
          boxShadow: `0px 4px 34px 6px rgba(162, 255, 45, 0.25)`,
        }}
      >
        <div
          className="bg-[#010101] group-hover:bg-opacity-90 duration-500 text-opacity-80 items-center hover:text-opacity-100 transition-all flex gap-1 rounded-full pl-6 pr-4 py-2 text-xs uppercase font-medium text-white"
          style={{ letterSpacing: 1.2 }}
        >
          {customText ? customText : "Promptable Beta Annoucement"}
          <ChevronRightIcon className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </a>
  );
};

const Breadcrumb = ({ text }: { text: string }) => {
  return (
    <div
      className="px-6 py-2 text-xs text-white uppercase bg-white border border-white rounded-full max-w-max border-opacity-10 bg bg-opacity-5"
      style={{ letterSpacing: 1.04 }}
    >
      {text}
    </div>
  );
};

const FeaturesDemo = () => {
  const [selected, setSelected] = useState(0);
  const codeImportsString = `import { initBridge, handler } from 'bridge';\nimport z from 'zod'`;
  const codeImportsWithApplyAndErrorString = `import { initBridge, handler, apply, httpError } from 'bridge';\nimport z from 'zod'`;

  const initBridgeAndServerString = `const bridge = initBridge({ routes: { getMe } });\n\nbridge.HTTPServer().listen(8080, () => {\n    console.log("Listening on port 8080"); \n});`;

  // base
  const helloHandlerStart = `const getMe = handler({`;
  const handlerResolveWithoutData = `   resolve: () => 'Hello!'`;
  const helloHandlerEnd = `})`;

  // data validation
  const bodyHandlerLine = `   body: z.object({ pseudo: z.string().min(3) }),`;

  // experience typescript inference
  const returnWithDataString = `   resolve: (data) => \`Hey \${data.body.pseudo}\``;

  const inner = `(parameter) data: {
  body: {
    pseudo: string;
  };
  mid: {
    name: string;
  };
  headers: {
    token: string;
  };
}`;

  const innerMiddleware = `(parameter) data: {
  headers: {
    token: string;
  };
}`;

  // middleware
  const addMiddlewareLine = `   middlewares: apply(authMid),`;

  const authMiddlewareBeginString = `const authMid = handler({
   headers: z.object({ token: z.string() }),
   resolve: (data) => {`;

  const authMiddlewareEndString = `     if (data.headers.token !== 'private_token') 
        return httpError(401, 'Wrong token');
      else return { name: 'John Doe' };
    },
})`;

  const features = [
    {
      title: "Create new Prompts",
      text: "Use prebuilt templates or create your own.",
      icon: "",
    },
    {
      title: "Chain Prompts into Workflows",
      text: "Compose Prompts with tools into workflows.",
      icon: "",
    },
    {
      title: "Embeddings simplified",
      text: "Index and Query your data using the power of Embeddings.",
      icon: "",
    },
    {
      title: "Build the next generation of AI-First Apps.",
      text: "Build QA Bots, Chatbots With memory, Agents and Copilots.",
      icon: "",
    },
  ];

  const fullCode = `import { initBridge, handler, apply, httpError } from 'bridge';
import z from 'zod'

const authMid = handler({
   headers: z.object({ token: z.string() }),
   resolve: (data) => {
     if (data.headers.token !== 'private_token') 
        return httpError(401, 'Wrong token');
      else return { name: 'John Doe' };
    },
})

const getMe = handler({
   body: z.object({ pseudo: z.string().min(3) }),
   middlewares: apply(authMid),
   resolve: (data) => \`Hey \${data.body.pseudo}\`
   resolve: () => 'Hello!'
})

const bridge = initBridge({ routes: { getMe } });

bridge.HTTPServer().listen(8080, () => {
    console.log("Listening on port 8080"); 
});
  `;

  return (
    <div className="relative grid mt-16 md:grid-cols-12">
      <div className="flex gap-4 mb-6 overflow-x-auto md:flex-col md:col-span-5 md:mb-0">
        {features.map((el, index) => {
          return (
            <FeatureElement
              selected={selected === index}
              setSelected={setSelected}
              index={index}
              key={index}
              title={el.title}
              text={el.text}
              icon={el.icon}
            />
          );
        })}
      </div>
      <div className="bg-[#0D0D11] overflow-x-auto bg-opacity-75 border md:col-span-7 border-[#14181D] rounded-md">
        <div className="w-full border-b border-[#14181D]">
          <div className="px-6 items-center flex gap-2 py-1.5 text-sm text-opacity-75 border-b-2 bg-white bg-opacity-5 max-w-max border-[#8690EA] text-[#CCCDF0]">
            <svg
              className="w-3.5 h-3.5 opacity-75"
              fill="none"
              height="26"
              viewBox="0 0 27 26"
              width="27"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m.98608 0h24.32332c.5446 0 .9861.436522.9861.975v24.05c0 .5385-.4415.975-.9861.975h-24.32332c-.544597 0-.98608-.4365-.98608-.975v-24.05c0-.538478.441483-.975.98608-.975zm13.63142 13.8324v-2.1324h-9.35841v2.1324h3.34111v9.4946h2.6598v-9.4946zm1.0604 9.2439c.4289.2162.9362.3784 1.5218.4865.5857.1081 1.2029.1622 1.8518.1622.6324 0 1.2331-.0595 1.8023-.1784.5691-.1189 1.0681-.3149 1.497-.5879s.7685-.6297 1.0187-1.0703.3753-.9852.3753-1.6339c0-.4703-.0715-.8824-.2145-1.2365-.1429-.3541-.3491-.669-.6186-.9447-.2694-.2757-.5925-.523-.9692-.7419s-.8014-.4257-1.2743-.6203c-.3465-.1406-.6572-.2771-.9321-.4095-.275-.1324-.5087-.2676-.7011-.4054-.1925-.1379-.3409-.2838-.4454-.4379-.1045-.154-.1567-.3284-.1567-.523 0-.1784.0467-.3392.1402-.4824.0935-.1433.2254-.2663.3959-.369s.3794-.1824.6269-.2392c.2474-.0567.5224-.0851.8248-.0851.22 0 .4523.0162.697.0486.2447.0325.4908.0825.7382.15.2475.0676.4881.1527.7218.2555.2337.1027.4495.2216.6475.3567v-2.4244c-.4015-.1514-.84-.2636-1.3157-.3365-.4756-.073-1.0214-.1095-1.6373-.1095-.6268 0-1.2207.0662-1.7816.1987-.5609.1324-1.0544.3392-1.4806.6203s-.763.6392-1.0104 1.0743c-.2475.4352-.3712.9555-.3712 1.5609 0 .7731.2268 1.4326.6805 1.9785.4537.546 1.1424 1.0082 2.0662 1.3866.363.146.7011.2892 1.0146.4298.3134.1405.5842.2865.8124.4378.2282.1514.4083.3162.5403.4946s.198.3811.198.6082c0 .1676-.0413.323-.1238.4662-.0825.1433-.2076.2676-.3753.373s-.3766.1879-.6268.2473c-.2502.0595-.5431.0892-.8785.0892-.5719 0-1.1383-.0986-1.6992-.2959-.5608-.1973-1.0805-.4933-1.5589-.8879z"
                fill="#3178C6"
                fillRule="evenodd"
              ></path>
            </svg>
            index.ts
          </div>
        </div>
        {/* CODE */}
        <div
          className="pt-5 pb-24 overflow-x-auto overflow-y-hidden text-sm custom-scrollbar"
          style={{ height: `calc(100% - 35px)` }}
        >
          {/* <CustomCode codeString={codeImportsString} display={selected < 2} /> */}
          <CustomCode
            codeString={codeImportsWithApplyAndErrorString}
            display={true}
          />
          <div className={`relative group`}>
            <CustomCode
              codeString={authMiddlewareBeginString}
              display={selected >= 2}
              delay={500}
              marginTop={16}
              maxHeight={300}
              highlight={selected === 2}
            />
            <CustomInner
              codeString={innerMiddleware}
              display={selected === 3}
              showOnHover={true}
              top={22 * 3 + 2}
            />
          </div>
          <CustomCode
            codeString={authMiddlewareEndString}
            display={selected >= 2}
            delay={500}
            // marginTop={16}
            maxHeight={300}
            highlight={selected === 2}
          />

          <CustomCode
            codeString={helloHandlerStart}
            display={selected >= 0}
            marginTop={16}
            highlight={selected === 0}
          />
          <CustomCode
            codeString={bodyHandlerLine}
            display={[1, 2, 3].includes(selected)}
            highlight={selected === 1}
            delay={500}
          />
          <CustomCode
            codeString={addMiddlewareLine}
            display={selected >= 2}
            delay={1500}
            highlight={selected === 2}
          />
          <CustomCode
            codeString={handlerResolveWithoutData}
            display={selected === 0}
            highlight={selected === 0}
            maxHeight={22}
          />
          <div className="relative group">
            <CustomInner codeString={inner} display={selected === 3} />
            <CustomCode
              codeString={returnWithDataString}
              display={selected >= 1}
              maxHeight={22}
              highlight={selected === 1}
              delay={1000}
            />
          </div>
          <CustomCode
            codeString={helloHandlerEnd}
            display={selected >= 0}
            maxHeight={25}
            highlight={selected === 0}
          />
          <CustomCode
            codeString={initBridgeAndServerString}
            display={true}
            marginTop={16}
            maxHeight={500}
          />
          {/*
          <NewCustomCode code={fullCode} 
             hiddenLines={
              selected === 0 ? [3,4,5,6,7,8,9,10,11,14,15,16] : 
              selected === 1 ? [3,4,5,6,7,8,9,10,11,15,17] :
              selected === 2 ? [17] : [17]
            } highlighedLines={
               selected === 0 ? [13, 17, 18] :
               selected === 1 ? [14,16] :
               selected === 2 ? [4,5,6,7,8,9,10,11,15] :
               selected === 3 ? []
               : []
              } />
              */}
        </div>
      </div>
    </div>
  );
};

const CustomInner = ({
  display,
  codeString,
  maxHeight,
  showOnHover,
  highlight,
  top,
}: {
  display: boolean;
  codeString: string;
  maxHeight?: number;
  highlight?: boolean;
  showOnHover?: boolean;
  top?: number;
}) => {
  return (
    <div
      className={`absolute transition-all bg-black p-3 z-10 rounded-md border border-white border-opacity-10 shadow-2xl top-6 left-32 text-sm text-white 
           ${showOnHover ? "group-hover:opacity-100 opacity-0" : ""}
            ${
              display
                ? "opacity-100 duration-500"
                : "opacity-0 delay-75 duration-150"
            }`}
      style={{
        maxHeight: display ? (maxHeight ? maxHeight : 320) : 0,
        top: top ? top : 22,
      }}
    >
      <div
        className={`inline-flex items-center overflow-hidden text-xs transition-all duration-700 ease-in-out`}
        style={{
          borderLeftColor: highlight ? "#C792EA" : "rgb(0,0,0,0)",
          borderStyle: "solid",
        }}
      >
        <SyntaxHighlighter
          language="typescript"
          style={nord}
          customStyle={{ background: "transparent", padding: 0, margin: 0 }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const FeatureElement = ({
  selected,
  icon,
  title,
  text,
  index,
  setSelected,
}: {
  selected: boolean;
  icon: string;
  title: string;
  text: string;
  index: number;
  setSelected: any;
}) => {
  const thisElement = useRef<HTMLDivElement>(null);
  return (
    <div className="flex items-center" ref={thisElement}>
      <div
        onClick={() => {
          track("Bridge features element clicked", {
            title,
          });
          setSelected(index);
          const size = thisElement.current.getClientRects();
          console.log(size);
        }}
        className={`rounded-md flex w-max max-w-xs w-full transition-all border cursor-pointer bg-white md:p-5 p-2 ${
          selected
            ? "border-t-main bg-opacity-5"
            : "border-white border-opacity-10 hover:bg-opacity-5 bg-opacity-0"
        }`}
      >
        <div>
          <img src={icon} />{" "}
        </div>
        <div>
          <h3 className="text-sm font-medium text-white md:text-lg">{title}</h3>
          <p className="hidden mt-2 text-sm text-white text-opacity-75 md:block">
            {text}
          </p>
        </div>
      </div>
      <div
        className="hidden transition-all duration-1000 delay-300 md:block"
        style={{
          background: selected
            ? "linear-gradient(90deg, #8690EA 0%, rgba(134, 144, 234, 0) 100%)"
            : "rgb(255,255,255,0)",
          height: 2,
          width: "50%",
          opacity: selected ? 1 : 0,
        }}
      ></div>
    </div>
  );
};

// NewCode.tsx is easier to use / way more performant but the delays are tricky to implement, might do someting latter
const CustomCodeNoMemo = ({
  display,
  codeString,
  marginTop,
  maxHeight,
  highlight,
  delay,
}: {
  marginTop?: number;
  display: boolean;
  codeString: string;
  maxHeight?: number;
  delay?: number;
  highlight?: boolean;
}) => {
  return (
    <div
      className="w-full"
      style={{
        marginTop: display ? marginTop | 0 : 0,
        borderLeft: 2,
        borderLeftColor: highlight ? "#C792EA" : "rgb(0,0,0,0)",
        borderStyle: "solid",
        background: highlight ? "rgb(255,255,255,0.04)" : "rgb(255,255,255,0)",
      }}
    >
      <div
        className={`md:px-5 flex px-3 overflow-hidden transition-all duration-700 ease-in-out ${
          display ? "" : ""
        }`}
        style={{
          maxHeight: display ? (maxHeight ? maxHeight : 100) : 0,
          opacity: display ? (highlight ? 1 : 0.8) : 0,
          padding: highlight ? "0px 20px" : "0px 20px",
          transitionDelay: highlight
            ? delay
              ? delay.toString() + "ms"
              : "0ms"
            : "0ms",
          willChange: "max-height",
          display: "table-caption",
        }}
      >
        <SyntaxHighlighter
          language="typescript"
          style={nord}
          customStyle={{ background: "transparent", padding: 0, margin: 0 }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const CustomCode = memo(CustomCodeNoMemo);
