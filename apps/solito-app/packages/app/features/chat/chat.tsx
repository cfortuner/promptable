import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import ReactTextareaAutosize from "react-textarea-autosize";
import UUID from "react-native-uuid";
import {TextInput, View, Text, Pressable, Link, ScrollView} from "../../design";
import {Platform} from "react-native";
import {fetch} from 'react-native-fetch-api'

/**
 *
 * TODO: extract out each of these components to their own packages.
 *
 * @param element
 */

// export const scrollToBottom = (element: HTMLElement) => {
//   element.scroll({
//     behavior: "auto",
//     top: element.scrollHeight,
//   });
// };

interface Message {
  isUserMessage: boolean;
  text: string;
  id: string;
}

const createMessage = (text: string, isUserMessage: boolean): Message => {
  return {
    isUserMessage,
    text,
    id: UUID.v4(),
  };
};

export default function Chat() {
  // ref to track text area and scroll text into view
  // const ref = useRef<HTMLParagraphElement | null>(null);
  //
  // const handleScroll = useCallback(() => {
  //   if (ref.current) {
  //     scrollToBottom(ref.current);
  //   }
  // }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(true);
  const toggleStreaming = () => {
    handleClear();
    setStreaming((p) => !p);
  };

  // useEffect(() => {
  //   handleScroll();
  // }, [messages, handleScroll]);

  const [input, setInput] = useState("");


  const fetchPrefix = Platform.OS === "web" ? "" : "https://promptable.loca.lt";
  const getChat = async (input: string) => {
    const rep = await fetch(fetchPrefix + "/api/chat", {
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

    // handleScroll();

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
      await fetch(fetchPrefix + "/api/stream", {
        method: "POST",
        body: JSON.stringify({
          clear: true,
        }),
      });
    }
    await fetch(fetchPrefix + "/api/chat", {
      method: "POST",
      body: JSON.stringify({
        clear: true,
      }),
    });
  };

  const stream = async (input: string) => {
    fetch(fetchPrefix + "/api/stream", {
      reactNative: { textStreaming: true },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prevMessages: messages,
        userInput: input,
      }),
    }).then((response) => response.body).then(async (data) => {

      console.log('data>', data)

      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        console.log('value', value)
        done = doneReading;
        const chunkValue = decoder.decode(value);

        console.log('chunkValue', chunkValue, 'typeof: ', typeof chunkValue)

        // const jsn = chunkValue.slice(6, chunkValue.length - 1).trim();
        const jsn = chunkValue.trim();
        // const jsn = chunkValue.trim().split(
        //   '\n\n'
        // );
        // const jsn = chunkValue.trim().split(
        //   '\n\n'
        // );

        console.log('jsn',jsn);

        // if (jsn === "[DONE]") {
        //   break;
        // }
        // if (chunkValue.includes("DONE")) {
        //   break;
        // }

        try {
          console.log('here look:', jsn)

          const data = JSON.parse(jsn);
          console.log('dat:',data);

          const text = data.choices[0].text;

          console.log('text:', text)

          setMessages((prevMessages) => {
            const last =
              prevMessages[prevMessages.length - 1] || createMessage("", false);
            return [
              ...prevMessages.slice(0, -1),
              { ...last, text: last.text + text },
            ];
          });

          // handleScroll();
        } catch (e) {
          console.log(chunkValue);
          console.log(jsn);
          console.log(e);
        }
      }
    })

  };

  return (
    <View className="flex flex-grow flex-col justify-between ">
      <View className="flex space-x-4 bg-black p-8 ios:hidden">
        <Link
          href="/"
        >
          <View    className="flex border-2 border-white p-2 " >
            <Text className={"bold border-[1px] text-xl text-white" }>{"<- Back"}</Text>
          </View>
        </Link>
      </View>
      <ScrollView className="h-[400px]  overflow-y-scroll pb-20" >
        {/*<View className="h-[400px] flex-grow overflow-y-scroll pb-20" ref={ref}>*/}
        {!messages.length && (
          <View className="flex h-full w-full flex-col items-center justify-center space-y-2">
            <Text className="text-xl font-semibold">
              Build your own ChatGPT3 With Promptable! and Expo
            </Text>
          </View>
        )}
        <View>
          {messages.map((msg) => {
            return (
              <View key={msg.id} className="py-2">
                {msg.isUserMessage ? (
                  <UserMessage msg={msg} />
                ) : (
                  <BotMessage msg={msg} />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View className="flex-row md:mx-20 mb-8 flex items-center space-x-2 border-2">
        <TextInput
          maxRows={5}
          onKeyDown={handleKeyDown}
          className={classNames(
            "outline-base-300 flex-grow resize-none rounded-md py-2 px-2 text-3xl shadow-xl outline",
            "scroll m-0 box-border resize-none border-none bg-transparent hover:ring-2",
            "min-w-none p max-w-none border-2"
          )}
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <Pressable
          onPress={() => submit()}
          className="rounded bg-purple-700 "
        >
          <Text className={"text-white  p-2"}>Run</Text>
        </Pressable>
        <Pressable
          onPress={() => toggleStreaming()}
          className="rounded bg-green-500 text-white"
        >
          <Text className={"text-white  p-2"}>Streaming {streaming ? "On" : "Off"}</Text>
        </Pressable>
        <Pressable
          disabled={!messages.length}
          onPress={handleClear}
          className="rounded bg-gray-300"
        >
          <Text className={"text-white  p-2"}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const UserMessage = ({ msg }: { msg: Message }) => {
  return (
    <View className="flex flex-row md:items-center space-x-8 py-10 md:px-40 px-3 ">
      <Text className={"web:text-xl ios:text-md"}>User: {msg.text}</Text>
    </View>
  );
};

export const BotMessage = ({ msg }: { msg: Message }) => {
  return (
    <View className="flex flex-row md:items-center space-x-8 border-y-2 bg-purple-50 px-3 py-10 md:px-40">
      <Text>AI:{" "}</Text>
      {msg.text?.length ? <Text className={"web:text-xl ios:text-md"}>{msg.text?.trim()}</Text> : <Text className="">Loading...</Text>}
    </View>
  );
};
