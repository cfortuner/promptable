import Layout from "@theme/Layout";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useState, memo , useRef} from "react"
import { NewCustomCode } from "../components/NewCode";

export default function Page(): JSX.Element {
  return (
    <div className="overflow-x-hidden">
    <Layout>
        <div className="bg-[#010101] py-12">
          <div className="layout">
            <FeaturesDemo />
          </div>
        </div>
        </Layout>
    </div>
  );
}

const FeaturesDemo = () => {
  const [selected, setSelected] = useState(1);

  const features = [
    {
      title: 'Create an endpoint',
      text: 'an intuitive way to write and to manage your endpoints.',
      icon: '',
    },
    {
      title: 'Validate your data',
      text: 'Bridge supports query, body and headers validation using zod, yup or superstruct.',
      icon: '',
    },
    {
      title: 'Add middlewares',
      text: 'Create powerful type-safe middlewares that can validate data, and pass data to next middlewares.',
      icon: '',
    },
    {
      title: 'Experience the power of TS',
      text: 'Catch error ahead of time and improve your productivity using IDE’s autocompletion.',
      icon: '',
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
   resolve: (data) => {
     return \`Hey \${data.body.pseudo}\`
   }
   resolve: () => 'Hello!'
})

const bridge = initBridge({ routes: { getMe } });

bridge.HTTPServer().listen(8080, () => {
    console.log("Listening on port 8080"); 
});
  `;


  const innerF1 = `(parameter) data: {
  body: {
    pseudo: string;
  };
}`;

  const innerF = `(parameter) data: {
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

  return (
    <div className="md:p-12 p-4 mx-auto max-w-3xl">
      <div className="flex gap-4 mb-6 overflow-x-auto max-w-max mx-auto mb-6 md:col-span-5 md:mb-6">
        {features.map((el, index) => {
          return (
            <FeatureElement
              selected={selected === index}
              setSelected={setSelected}
              index={index}
              key={index}
            />
          );
        })}
      </div>
      <div>
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
          className="pt-5 pb-28 overflow-x-auto overflow-y-hidden text-sm custom-scrollbar"
          style={{ height: `calc(100% - 35px)`, width: 'max(100%, max-content)' }}
        >
          <NewCustomCode code={fullCode} 
             hiddenLines={
              selected === 0 ? [3,4,5,6,7,8,9,10,11,14,15,16,17,18] : 
              selected === 1 ? [3,4,5,6,7,8,9,10,11,15,19] :
              selected === 2 ? [19] : [19]
            } highlighedLines={
               selected === 0 ? [13,19,20] :
               selected === 1 ? [14] :
               selected === 2 ? [15,16] :
               selected === 3 ? []
               : []
              } 
              typesToDisplay={
                selected === 1 ? [{
                  line: 15,
                  code: innerF1,
                  token: "data",
                  display: true
                }] : [
                {
                  line: 15,
                  code: innerF,
                  token: "data",
                  display: true
                },{
                  line: 3,
                  code: "This middleware injects data into the resolve! \nCheck it out yourself. ",
                  token: "authMid",
                  display: true
                }
                ]}
              />
        </div>
      </div>
      </div>
    </div>
  );
};

const FeatureElement = ({
  selected,
  index,
  setSelected,
}: {
  selected: boolean;
  index: number;
  setSelected: any;
}) => {
  return (
      <div
        onClick={() => { setSelected(index) }}
        className={`rounded-md flex w-max max-w-xs w-full transition-all border cursor-pointer bg-t-main md:p-3 p-2 ${
          selected
            ? 'border-t-main bg-opacity-100'
            : 'border-white border-opacity-10 hover:bg-opacity-5 bg-opacity-10'
        }`}
      >
    </div>
  );
};
