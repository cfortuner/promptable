import React, { memo, useEffect, useState } from "react"
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

interface TypeViewInferface {
  token: string;
  line: number;
  code: string;
  display: boolean;
}

interface PositionInterface {
  left: number;
  top: number;
}

export const NewCustomCode = ({
  code,
  highlighedLines = [],
  showLineNumber = false,
  hiddenLines = [],
  typesToDisplay
}: {
  code: string;
  highlighedLines?: Array<number>;
  showLineNumber?: boolean;
  hiddenLines?: Array<number>;
  typesToDisplay?: TypeViewInferface[];
}) => {


  const [inner, setInner] = useState("")
  const [position, setPosition] = useState({
    top: -200,
    left: -400
  })

  useEffect(() => {
    // we grab the content insite the lsp from data-lsp element
    //
    //
    const enter = (e, item, content) => {
      // the the top & left position of the item
      const top = item.getBoundingClientRect().top + window.scrollY;
      const left = item.getBoundingClientRect().left;
      console.log(top, left)
      setPosition({
        top: top + 36,
        left: left,
      });
      setInner(content);
      console.log("changing content to :>>>", content)
    }

    const leave = () => {
      setPosition({
        top: -500,
        left: -500
      })
    }

    const lsp = document.getElementsByTagName('span');
    if (lsp)
      for (const item of lsp as any) {
        const content = item.getAttribute('data-lsp') as string;
        if (content) {
          item.addEventListener('mouseenter', (e) => {
            enter(e, item, content)
          });
          item.addEventListener('mouseleave', leave);
        }
      }
    return () => {
      if (lsp)
        for (const item of lsp as any) {
          const content = item.getAttribute('data-lsp') as string;
          if (content) {
            item.removeEventListener('mouseenter', (e) => {
              enter(e, item, content)
            })
            item.removeEventListener('mouseleave', leave)
          }
        }
    }
  }, [typesToDisplay]);

  return (
    <div
      className="pt-5 pb-28 overflow-x-auto overflow-y-hidden text-sm custom-scrollbar"
      style={{ height: `calc(100% - 35px)`, width: 'max-content' }}
    >
      <Highlight {...defaultProps} theme={theme} code={code} language={'typescript'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              padding: '0px 0px',
              marginBottom: 8,
              background: 'transparent',
              overflowX: 'auto',
            }}
          >
            {tokens.map((line, i) => (
              <NewCustomCodeLineMemo line={line} showLineNumber={showLineNumber} typesToDisplay={typesToDisplay} lineNumber={i + 1} getLineProps={getLineProps} getTokenProps={getTokenProps} hide={hiddenLines.includes(i + 1)} highlight={highlighedLines.includes(i + 1)} />
            ))}
          </pre>
        )}
      </Highlight>
      <TypePreview code={inner} position={position} />
    </div>
  );
};

const TypePreview = ({ code, position }: { code: string; position: PositionInterface }) => {
  return (<div className={`border bg-opacity-10 backdrop-blur-md bg-neutral-500 text-xs border-white border-opacity-10 p-3 max-w-max z-10 absolute rounded-md left-o top-0`} style={{
    top: position.top,
    left: position.left,
    opacity: position.top > 0 ? 1 : 0,
    transition: "opacity 0.300s, transform 0.5s",
    transform: position.top > 0 ? "translateY(-10px)" : "translateY(0px)"
  }}>
    {code &&
      <Highlight {...defaultProps} theme={theme} code={code} language={'typescript'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              background: 'transparent',
              padding: 0
            }}
          >
            {tokens.map((line, i) => (
              <div key={i}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    }
  </div>)
}

const NewCustomCodeLine = ({ line, typesToDisplay, showLineNumber, lineNumber, getLineProps, getTokenProps, hide, highlight }:
  {
    line: any;
    lineNumber: number;
    showLineNumber: boolean;
    typesToDisplay: TypeViewInferface[];
    getLineProps: any;
    getTokenProps: any;
    hide: boolean;
    highlight: boolean
  }
) => {
  return (
    <div className="transition-all duration-700"
      style={{
        display: 'block',
        opacity: hide ? 0 : 1,
        maxHeight: hide ? 0 : 25,
        background: highlight ? "rgb(255, 255, 255, 0.04)" : "rgb(255, 255, 255, 0)",
        borderLeftStyle: "solid",
        borderLeftWidth: 4,
        borderLeftColor: highlight ? "#A175FF" : "rgb(255,255,255,0)",
        overflow: hide ? 'hidden' : 'none'
      }}>
      {showLineNumber &&
        <div
          style={{
            fontSize: 14,
            textAlign: 'right',
            userSelect: 'none',
            opacity: 0.5,
            paddingRight: '1em',
            paddingLeft: '0.5em',
          }}
        >
          {lineNumber + 1}
        </div>
      }
      <div style={{
        width: "100%",
        fontSize: '14px',
        padding: "2px 20px"
      }}>
        {line.map((token, key) => {
          const toShow = typesToDisplay.find((el) => { return el.token === token.content.trim() && el.line + 1 === lineNumber })
          console.log(token)
          if (toShow) {
            return (<span data-lsp={toShow.code} className="bg-white bg-opacity-5 transition-all hover:bg-opacity-10 border border-white border-opacity-25 hover:border-opacity-40 cursor-default rounded-md relative" style={{ padding: "0px 0px" }}> <span key={key} {...getTokenProps({ token, key })} /> </span>)
          }
          return (<span key={key} {...getTokenProps({ token, key })} />)
        })}
      </div>
    </div>
  )
}

const NewCustomCodeLineMemo = memo(NewCustomCodeLine)
