import classNames from "classnames";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { v4 as uuid } from "uuid";

/**
 *
 * TODO: extract out each of these components to their own packages.
 *
 * @param element
 */

export const scrollToBottom = (element: HTMLElement) => {
  element.scroll({
    behavior: "auto",
    top: element.scrollHeight,
  });
};

interface Message {
  isUserMessage: boolean;
  text: string;
  id: string;
}

const createMessage = (text: string, isUserMessage: boolean): Message => {
  return {
    isUserMessage,
    text,
    id: uuid(),
  };
};

export default function Chat() {
  // ref to track text area and scroll text into view
  const ref = useRef<HTMLParagraphElement | null>(null);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      scrollToBottom(ref.current);
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(true);
  const toggleStreaming = () => {
    handleClear();
    setStreaming((p) => !p);
  };

  useEffect(() => {
    handleScroll();
  }, [messages, handleScroll]);

  const [input, setInput] = useState("");

  const getChat = async (input: string) => {
    const rep = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        userInput: input,
      }),
    });

    return rep;
  };

  // Mutations
  const submit = async () => {
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        createMessage(input, true),
        createMessage("", false),
      ];
    });

    const textInput = input;
    setInput("");

    // streaming
    if (streaming) {
      await stream(input);
      return;
    }

    const response = await getChat(textInput);

    handleScroll();

    const { text } = await response.json();
    setMessages((prevMessages) => {
      return [...prevMessages.slice(0, -1), createMessage(text, false)];
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  const handleClear = async () => {
    setMessages([]);

    if (streaming) {
      await fetch("/api/stream", {
        method: "POST",
        body: JSON.stringify({
          clear: true,
        }),
      });
    }
    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        clear: true,
      }),
    });
  };

  const stream = async (input: string) => {
    const response = await fetch("/api/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prevMessages: messages,
        userInput: input,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      const jsn = chunkValue.slice(6, chunkValue.length - 1).trim();

      if (jsn === "[DONE]") {
        break;
      }

      try {
        const data = JSON.parse(jsn);
        console.log(data);

        const text = data.choices[0].text;

        setMessages((prevMessages) => {
          const last =
            prevMessages[prevMessages.length - 1] || createMessage("", false);
          return [
            ...prevMessages.slice(0, -1),
            { ...last, text: last.text + text },
          ];
        });

        handleScroll();
      } catch (e) {
        console.log(chunkValue);
        console.log(jsn);
        console.log(e);
      }
    }
  };

  return (
    <div className="flex h-[100vh] flex-grow flex-col justify-between">
      <div className="flex space-x-4 bg-black p-8">
        <Link
          href="/"
          className="bold border-[1px] border-white p-2 text-xl text-white"
        >
          {"<- Back"}
        </Link>
      </div>
      <div className="h-[400px] flex-grow overflow-y-scroll pb-20" ref={ref}>
        {!messages.length && (
          <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
            <div className="text-xl font-semibold">
              Build your own ChatGPT3 With Promptable!
            </div>
          </div>
        )}
        <ul>
          {messages.map((msg) => {
            return (
              <li key={msg.id} className="py-2">
                {msg.isUserMessage ? (
                  <UserMessage msg={msg} />
                ) : (
                  <BotMessage msg={msg} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mx-20 mb-8 flex items-center space-x-2">
        <ReactTextareaAutosize
          maxRows={5}
          onKeyDown={handleKeyDown}
          className={classNames(
            "outline-base-300 flex-grow resize-none rounded-md py-2 px-2 text-3xl shadow-xl outline",
            "scroll m-0 box-border resize-none border-none bg-transparent hover:ring-2",
            "min-w-none p max-w-none"
          )}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          onClick={() => submit()}
          className="rounded bg-purple-700 p-2 text-white"
        >
          Run
        </button>
        <button
          onClick={() => toggleStreaming()}
          className="rounded bg-green-500 p-2 text-white"
        >
          Streaming {streaming ? "On" : "Off"}
        </button>
        <button
          disabled={!messages.length}
          onClick={handleClear}
          className="rounded bg-gray-300 p-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export const UserMessage = ({ msg }: { msg: Message }) => {
  return (
    <div className="flex items-center space-x-8 py-10 px-40 text-xl">
      <p>User: {msg.text}</p>
    </div>
  );
};

export const BotMessage = ({ msg }: { msg: Message }) => {
  return (
    <div className="flex items-center space-x-8 border-y-2 bg-purple-50 py-10 px-40 text-xl">
      AI:{" "}
      {msg.text.length ? msg.text.trim() : <span className="">Loading...</span>}
    </div>
  );
};
