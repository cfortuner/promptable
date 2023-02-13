import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import React, { useEffect, useState } from 'react';

export const Code = () => {
  const [codeState, setCodeState] = useState('');

  return (
    <div className="mt-12 border-white md:mt-32erborder-opacity-5 rounded-xl">
      <div>
        <div className="flex gap-2 px-3 py-2 border-b border-white border-opacity-5">
          <div className="w-2 h-2 rounded-full bg-neutral-800" />
          <div className="w-2 h-2 rounded-full bg-neutral-800" />
          <div className="w-2 h-2 rounded-full bg-neutral-800" />
        </div>

        <div
          style={{
            scrollbarColor: 'rgb(0,0,0,0)',
            backgroundImage: `url('/v2/codebg.svg')`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          className="bg-cover md:bg-cover"
        >
          <div
            style={{
              background: 'rgb(18, 18, 18, 0.5)',
            }}
            className="grid overflow-auto md:grid-cols-2"
          >
            <Server />
            <Client />
          </div>
        </div>
      </div>
    </div>
  );
};

const Server = () => {
  const code = `
import { handler, initBridge } from "bridge";
import z from "zod";

const getName = handler({
  query: z.object({ name: z.string() }),
  resolve: ({ query }) => ({
    name: query.name,
    age: 21,
    date: new Date(),
  }),
});

const port = 8080;

initBridge({ routes: { getName } })
  .HTTPServer()
  .listen(port, () => {
    console.log(\`Listening on port \${port}\`);
  });
`.trim();
  return (
    <div className="border-white md:border-r border-opacity-5">
      <div className="px-3 py-1.5 mt-3 ml-5 text-xs mb-3 text-white text-opacity-50 rounded-md max-w-max">
        Server
      </div>
      <Highlight {...defaultProps} theme={theme} code={code} language={'typescript'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              padding: '8px 20px',
              marginBottom: 8,
              background: 'transparent',
            }}
          >
            {tokens.map((line, i) => (
              <div style={{ display: 'table-row' }} key={i} {...getLineProps({ line, key: i })}>
                <div
                  style={{
                    fontSize: 14,
                    display: 'table-cell',
                    textAlign: 'right',
                    userSelect: 'none',
                    opacity: 0.5,
                    paddingRight: '1em',
                    paddingLeft: '0.5em',
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ display: 'table-cell', fontSize: '13px' }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

const Client = () => {
  const originalCode = `
import { API } from './sdk' 

const user = API.getName({ query: { name: "David" } })

user`.trim();
  const totalLength = originalCode.length;

  const [code, setCode] = useState('');

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    shown: null,
  });

  useEffect(() => {
    setInterval(() => {
      setCode((code) => originalCode.slice(0, code.length + 1));
    }, 25);
  }, []);

  return (
    <div className="border-t border-white md:border-opacity-0 border-opacity-5">
      <div className="px-3 py-1.5 mt-3 ml-5 text-xs mb-3 text-white text-opacity-50 rounded-md max-w-max">
        Client
      </div>
      <Highlight {...defaultProps} theme={theme} code={code} language={'typescript'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              padding: '8px 20px',
              background: 'transparent',
              marginBottom: 8,
            }}
          >
            {tokens.map((line, i) => (
              <div style={{ display: 'table-row' }} key={i} {...getLineProps({ line, key: i })}>
                <div
                  style={{
                    fontSize: 12,
                    display: 'table-cell',
                    textAlign: 'right',
                    userSelect: 'none',
                    opacity: 0.5,
                    paddingRight: '1em',
                    paddingLeft: '0.5em',
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ display: 'table-cell', fontSize: '13px' }}>
                  {line.map((token, key) => {
                    if (token.content.includes('user') && i === 4) {
                      return (
                        <>
                          <span
                            key={key}
                            {...getTokenProps({ token, key })}
                            //   onMouseLeave={() => {
                            //     setPosition({
                            //       top: null,
                            //       left: null,
                            //       shown: null,
                            //     });
                            //   }}
                          ></span>
                          <Suggestions show={code.length === originalCode.length} />
                        </>
                      );
                    } else if (token.content.includes('user')) {
                      return (
                        <span
                          key={key}
                          {...getTokenProps({ token, key })}
                          onMouseEnter={(e) => {
                            const top =
                              //@ts-ignore
                              e.target.getBoundingClientRect().top + window.scrollY;
                            //@ts-ignore
                            const left = e.target.getBoundingClientRect().left;
                            setPosition({
                              top: top + 20,
                              left: left,
                              shown: 'user',
                            });
                          }}
                          onMouseLeave={() => {
                            setPosition({
                              top: null,
                              left: null,
                              shown: null,
                            });
                          }}
                        />
                      );
                    } else return <span key={key} {...getTokenProps({ token, key })} />;
                  })}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {/* <UserSuggestions position={position} /> */}
    </div>
  );
};

const UserSuggestions = ({
  position,
}: {
  position: { left: number; top: number; shown: string };
}) => {
  const code = `
const user: {
    name: string;
    age: number;
    date: number;
}
            `.trim();

  if (position.shown === 'user')
    return (
      <div
        className="absolute z-50 border border-white max-w-max border-opacity-5"
        style={{
          background: '#1e1e1e',
          padding: 3,
          left: position.left,
          top: position.top,
        }}
      >
        <Highlight {...defaultProps} theme={theme} code={code} language={'typescript'}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className}>
              {tokens.map((line, i) => (
                <div style={{ display: 'table-row' }} key={i} {...getLineProps({ line, key: i })}>
                  <div style={{ display: 'table-cell', fontSize: '12px' }}>
                    {line.map((token, key) => {
                      return <span key={key} {...getTokenProps({ token, key })} />;
                    })}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    );
  else return <></>;
};

const Suggestions = ({ show }: { show: boolean }) => {
  const [showDelayed, setShowDelayed] = useState(false);
  useEffect(() => {
    if (show) {
      setTimeout(() => setShowDelayed(true), 0);
    }
  }, [show]);
  return (
    <div className={`z-50 ml-9 -translate-y-5 -translate-x-0.5 `}>
      <p className={`${showDelayed ? 'opacity-100 delay-100 transition-all' : ''}`}>
        .<span className="animate-pulse">|</span>
      </p>
      <div
        style={{
          background: '#14131B',
        }}
        className={`-mt-2 ${showDelayed ? 'opacity-100 delay-500 transition-all' : 'opacity-0'}`}
      >
        <div className="flex px-2 py-1 text-xs text-white transition-all bg-white bg-opacity-0 border-b border-white border-opacity-5 hover:bg-opacity-10">
          <p className="mb-0 mr-auto opacity-50">name</p>
          <p className="mb-0 ml-4 text-right opacity-50">(property): string</p>
        </div>
        <div className="flex px-2 py-1 text-xs text-white transition-all bg-white bg-opacity-0 border-b border-white border-opacity-5 hover:bg-opacity-10">
          <p className="mb-0 mr-auto opacity-50 ">age</p>
          <p className="mb-0 text-right opacity-50">(property): number</p>
        </div>
        <div className="flex px-2 py-1 text-xs text-white transition-all bg-white bg-opacity-0 border-opacity-5 hover:bg-opacity-10">
          <p className="mb-0 mr-auto opacity-50">date</p>
          <p className="mb-0 text-right opacity-50">(property): Date</p>
        </div>
      </div>
    </div>
  );
};
