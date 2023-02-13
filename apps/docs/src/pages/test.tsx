import React, { useState, memo, useEffect } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Page() {
  return <div className='min-h-screen' style={{ backgroundImage: `url("/studio/tests/bg-main.svg")`, backgroundPosition: 'top center', backgroundSize: 'cover' }}>
    <SDK1 />
  </div>
}

const SDK1 = () => {
  const [selected, setSelected] = useState(0)

  const firstPart = `import { API } from "./sdk"
const { data, error } = await API.user.get({
    body: {`

  const bodyName = `      name: "John Smith",`
  const bodyId = `      id: 412`

  const endRequest = `    } 
})`

  const error = `
if (error) {`
  const errorSwitch = `  switch (error.name) {`
  const errorCase = `    case "`
  const errorCaseLast = `":`
  const errorSwitchClose = `      //...
      break;
   }`

  const errorLastPart = '}'

  const [data, setData] = useState(`
data.`)

  const initialDataSuggestions = [
    { name: "id", type: "number" },
    { name: "name", type: "string" },
    { name: "age", type: "number" },
  ]

  const initialErrorSuggestion = [
    { name: "Document not found" },
    { name: "Body schema validation error" },
    { name: "Internal server error" },
    { name: "Wrong permission" },
  ]

  const features = [
    {
      icon: "/studio/send.svg",
      title: "Type-safe request parameters",
      desc: "Never make mistakes while calling your endpoints."
    },
    {
      icon: "/studio/bug-icon.svg",
      title: "Easily handle incoming errors",
      desc: "It has never been that easy to handle errors."
    },
    {
      icon: "/studio/receive.svg",
      title: "Type-safe request response",
      desc: "Never make mistakes while using your endpoints response."
    },
  ]

  const initialBodySuggestions = [{ name: "name", type: "string" }, { name: "id", type: "number" }]
  const [bodySuggestions, setBodySuggestions] = useState(initialBodySuggestions)
  const [showBodyName, setShowBodyName] = useState(false)
  const [showBodyId, setShowBodyId] = useState(false)
  const [dataSuggestions, setDataSuggestions] = useState(initialDataSuggestions)
  const [dataSelected, setDataSelected] = useState("")
  const [errorSuggestions, setErrorSuggestions] = useState(initialErrorSuggestion)
  const [errorSelected, setErrorSelected] = useState("")

  useEffect(() => {
    if (showBodyId && showBodyName && selected == 0) setTimeout(() => setSelected(1), 1000)
  }, [showBodyName, showBodyId])

  useEffect(() => {
    if (selected === 0) {
      setShowBodyId(false); setShowBodyName(false); setBodySuggestions(initialBodySuggestions); setErrorSelected("")
    }
    if ([1].includes(selected)) {
      setShowBodyId(true); setShowBodyName(true); setDataSelected(""); setErrorSelected("")
    }
    if (selected === 2) {
      setShowBodyId(true); setShowBodyName(true); setErrorSelected(errorSelected ? errorSelected : "Document no found")
    }
  }, [selected])

  return (
    <div className="pt-24 pb-24">
      <div className="flex flex-col justify-center items-cente max-w-6xl px-4 mx-auto">
        <img src="/studio/sdk-icon.svg" className="mb-4 w-16 mx-auto" />
        <h2 className="font-semibold text-4xl text-white text-center mx-auto w-3/4">Have an auto-generated client SDK using one command line</h2>
        <div className="grid md:grid-cols-2 gap-16 mt-24">
          <div className="bg-[#161616] backdrop-blur-sm bg-opacity-10 rounded-xl border border-white border-opacity-5 h-max">{features.map((el, index) => {
            return <div onClick={() => {
              setSelected(index)
            }} key={index} className={`p-6 cursor-pointer transition-all hover:bg-opacity-5 border-b border-white border-opacity-5 last:border-none bg-white bg-opacity-0 ${selected === index ? "bg-opacity-5" : ""}`}>
              <div className="flex gap-4">
                <img src={el.icon} className="w-10 self-start" />
                <div>
                  <h3 className="font-medium text-white text-lg">{el.title}</h3>
                  <p className="text-neutral-400 mt-2">{el.desc}</p>
                </div>
              </div>
            </div>
          })}
          </div>
          <div className="relative">
            <div className="relative group" style={{ maxWidth: `calc(100vw - 46px)` }}>
              <div className={`no-scrollbar border overflow-x-auto w-full bg-opacity-10 backdrop-blur-md pb-4 text-sm border-white border-opacity-10 p-3 z-10 rounded-md`} style={{
              }}
              >

                <Code code={firstPart} show={true} maxHeight={21 * 4} />
                <Code code={bodyName} animated={true} show={showBodyName} />
                <Code code={bodyId} animated show={showBodyId} />
                <Code code={''} show={selected === 0 && !(showBodyName && showBodyId)} maxHeight={21} />
                <Code code={endRequest} show={true} maxHeight={21 * 3} />

                <Code code={error} show={[1, 2].includes(selected)} maxHeight={24 * 3} />
                <Code code={errorSwitch} show={[1, 2].includes(selected)} maxHeight={24 * 3} />
                <Code code={errorCase} animated={true} codeLast={errorCaseLast} show={[1, 2].includes(selected)} maxHeight={24 * 3} newTextToWrite={errorSelected} />
                <Code code={errorSwitchClose} show={[1, 2].includes(selected)} maxHeight={24 * 3} />
                <Code code={errorLastPart} show={[1, 2].includes(selected)} maxHeight={24 * 3} />

                <Code code={data} newTextToWrite={dataSelected} show={selected === 2} animated={true} maxHeight={60} animationDelay={0} />

                {/* BODY SUGGESTIONS */}
              </div>

              <div className={`group-hover:brightness-150 transition-all duration-300 border right-0 max-w-max absolute border-white rounded-lg bg-neutral-800 bg-opacity-50 backdrop-blur-md
${selected === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} ${!showBodyName && !showBodyId ? "border-opacity-0" : "border-opacity-10"}`}
                style={{ top: showBodyName || showBodyId ? 20.3 * 5 + 14 : 20.3 * 4 + 14, left: 86 }}
              >

                <div className="relative overflow-hidden rounded-lg bg-black will-change-transform" style={{ padding: 1 }}>
                  <div className="relative z-10 rounded-lg bg-black bg-gradient-to-t from-neutral-800 text-neutral-400">
                    {
                      bodySuggestions.map((el, index) => {
                        return (
                          <div className='flex cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-5 transition-all gap-8 justify-between py-1.5 px-3 border-t first:border-none border-white border-opacity-10' key={el.name} onClick={() => {
                            const newSuggestions = [...bodySuggestions].filter((el2) => el2.name != el.name)
                            setBodySuggestions(newSuggestions)
                            //
                            if (el.name === "name") setShowBodyName(true)
                            if (el.name === "id") setShowBodyId(true)
                          }}
                            style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`, borderRadius: 4 }}
                          >
                            <div className='text-sm'>{el?.name}</div>
                            <div className='text-sm text-neutral-400'>{el?.type}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                  {/*                   <span aria-hidden className={`absolute duration-[2s] delay-300 transition-all inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400 */}
                  {/* ${!showBodyId && !showBodyName ? "opacity-100" : "opacity-0"}`} /> */}

                  <span aria-hidden className={`absolute duration-[2s] delay-300 transition-all inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:bg-grad-blue-green
${!showBodyId && !showBodyName ? "opacity-100" : "opacity-0"}`} />
                </div>
                <div className='text-white animate-pulse font-bold text-xl absolute left-0 top-0 -translate-x-2 -translate-y-full'>|</div>
              </div>


              {/* ERROR SUGGESTIONS  */}
              <div className={`transition-all border right-0 max-w-max absolute border-white rounded-md duration-500 border-opacity-10 bg-neutral-900 bg-opacity-50 backdrop-blur-sm
 ${selected === 1 && !errorSelected ? "opacity-100 delay-1000 translate-y-0" : "opacity-0 translate-y-2"}`}
                style={{ top: 20.3 * 11 + 16, left: 118 }}
              >
                {
                  errorSuggestions.map((el, index) => {
                    return (
                      <div className='flex cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-5 transition-all gap-8 justify-between py-1.5 px-3
                    border-t first:border-none border-white border-opacity-10' key={el.name} onClick={() => {
                          setErrorSelected(el.name)
                          setTimeout(() => {
                            setSelected(2)
                          }, 700)
                        }}
                        style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`, borderRadius: 4 }}
                      >
                        <div className='text-sm'>{el?.name}</div>
                      </div>
                    )
                  })
                }
                <div className='text-white animate-pulse font-bold text-xl absolute left-0 top-0 -translate-x-2 -translate-y-full'>|</div>
              </div>

              <div className={`transition-all border right-0 max-w-max absolute border-white rounded-md duration-500 border-opacity-10 bg-neutral-900 bg-opacity-50 backdrop-blur-sm
 ${selected === 2 && !dataSelected ? "opacity-100 delay-1000 translate-y-0" : "opacity-0 translate-y-2"}`}
                style={{ top: 20.3 * 17 + 14, left: 80 }}
              >
                {
                  dataSuggestions.map((el, index) => {
                    return (
                      <div className='flex cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-5 transition-all gap-8 justify-between py-1.5 px-3 border-t first:border-none border-white border-opacity-10' key={el.name} onClick={() => {
                        setDataSelected(el.name)
                      }}
                        style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`, borderRadius: 4 }}
                      >
                        <div className='text-sm'>{el?.name}</div>
                        <div className='text-sm text-neutral-400'>{el?.type}</div>
                      </div>
                    )
                  })
                }
                <div className='text-white animate-pulse font-bold text-xl absolute left-0 top-0 -translate-x-2 -translate-y-full'>|</div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}


const Code = (
  { codeLast, newTextToWrite, code, animationDelay, show, animated, maxHeight }:
    {
      newTextToWrite?: string;
      codeLast?: string;
      animationDelay?: number;
      animated?: boolean;
      code: string;
      show: boolean;
      maxHeight?: number;
    }) => {

  const initialText = codeLast ? code + codeLast : code
  const [text, setText] = useState(animated ? "" : initialText)

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(initialText.slice(0, i));
          i++;
          if (i > initialText.length) {
            clearInterval(intervalId);
          }
        }, 30);
        return () => clearInterval(intervalId);

      }, animationDelay ? animationDelay : 150)
    }
  }, [initialText, show]);

  useEffect(() => {
    if (newTextToWrite) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          if (codeLast) {
            setText(code + newTextToWrite.slice(0, i) + codeLast);
          } else {
            setText(code + newTextToWrite.slice(0, i));
          }
          i++;
          if (i > newTextToWrite.length) {
            clearInterval(intervalId);
          }
        }, 50);
        return () => clearInterval(intervalId);
      }, 0)
    }
  }, [newTextToWrite])

  return (
    <Highlight {...defaultProps} code={text} language="tsx" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className + " transition-all duration-700 no-scrollbar"} style={{
          ...style,
          background: 'transparent',
          paddingTop: 0,
          paddingBottom: 0,
          maxHeight: show ? maxHeight ? maxHeight : 24 : 0,
          opacity: show ? 1 : 0,
          width: "fit-content"
        }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} style={{
              position: 'relative',
            }}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
