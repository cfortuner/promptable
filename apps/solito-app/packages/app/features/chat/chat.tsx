import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import ReactTextareaAutosize from "react-textarea-autosize";
import UUID from "react-native-uuid";
import {TextInput, View, Text, Pressable, Link, ScrollView} from "../../design";
import {Platform} from "react-native";

/**
 *
 * TODO: extract out each of these components to their own packages.
 *
 * @param element
 */

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
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(Platform.OS === 'web' ? true : false);
  const toggleStreaming = () => {
    handleClear();
    setStreaming((p) => !p);
  };

  const [input, setInput] = useState("");


  const fetchPrefix = Platform.OS === "web" ? "" : "http://192.168.0.111:3000";

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prevMessages: messages,
        userInput: input,
      }),
    }).then((response) => response.body).then(async (data) => {

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
          console.log('before parse', jsn)
          const data = JSON.parse(jsn);
          console.log('after parse', data);

          const text = data.choices[0].text;

          setMessages((prevMessages) => {
            console.log('on setMessages')
            const last =
              prevMessages[prevMessages.length - 1] || createMessage("", false);
            return [
              ...prevMessages.slice(0, -1),
              { ...last, text: last.text + text },
            ];
          });

        } catch (e) {
          console.log(chunkValue);
          console.log(jsn);
          console.log(e);
        }
      }
    })

  };

  return (
    <View className="flex web:h-[100vh] flex-grow flex-col justify-between ">
      <View className=" bg-black p-8 ios:hidden">
        <Link
          href="/"
        >
        <View    className="flex self-start bold border-[1px] border-white p-2" >
          <Text className={"font-semibold text-xl text-white" }>{"<- Back"}</Text>
        </View>
        </Link>
      </View>
      {/*<ScrollView className="h-[400px] flex-grow overflow-y-scroll pb-20" >*/}
      {/*<ScrollView className="h-[400px] flex overflow-y-scroll pb-20 overflow-y-scroll " contentContainerStyle={{justifyContent: messages.length ? 'flex-start': 'center', height: '100%'}} >*/}
      <ScrollView className="h-[400px] flex overflow-y-scroll pb-20 bg-white pt-2" ref={scrollViewRef} contentContainerStyle={{justifyContent: messages.length ? 'flex-start': 'center'}} onContentSizeChange={() => {
        scrollViewRef?.current?.scrollToEnd({animated: true})
      }}>
        <View>
        {/*<View className="h-[400px] flex-grow overflow-y-scroll pb-20" ref={ref}>*/}
        {!messages.length && (
          <View className="flex flex-basis w-full flex-col items-center justify-center space-y-2">
            <Text className="text-xl font-semibold text-center">
              Build your own ChatGPT3 With Promptable and Expo!
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
        </View>
      </ScrollView>
      <View className="flex-row md:mx-20 mb-8 flex items-center space-x-2 bg-white ios:p-2">
        <TextInput
          maxRows={5}
          onKeyDown={handleKeyDown}
          className={classNames(
            "outline-base-300 flex-grow resize-none rounded-md py-2 px-2 ios:p-0 text-3xl ios:text-sm shadow-xl outline",
            "scroll m-0 box-border resize-none border-none bg-transparent hover:ring-2",
            "min-w-none p max-w-none border-2 ios:h-10 px-2 ios:pb-[5px]"
          )}
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <Pressable
          onPress={() => submit()}
          className="rounded bg-purple-700 "
        >
          <Text className={"text-white  p-5 ios:p-3"}>Run</Text>
        </Pressable>
        <Pressable
          onPress={() => toggleStreaming()}
          className="rounded bg-green-500 text-white ios:hidden"
        >
          <Text className={"text-white  p-5 ios:p-3"}>{Platform.OS === 'web' ? 'Streaming ' : ''}{streaming ? "On" : "Off"}</Text>
        </Pressable>
        <Pressable
          disabled={!messages.length}
          onPress={handleClear}
          className="rounded bg-gray-300"
        >
          <Text className={"text-black  p-5 ios:p-3"}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const UserMessage = ({ msg }: { msg: Message }) => {

  return (
    <View className="flex flex-row md:items-center web:py-4 md:px-40 px-3 ">
      <Text className={"web:text-xl ios:text-md"}>User: {msg.text}</Text>
    </View>
  );
};

export const BotMessage = ({ msg }: { msg: Message }) => {
  return (
    <View className="flex flex-row md:items-center space-x-8 border-y-2 border-gray-200 bg-purple-50 px-3 web:py-10 ios:py-4 md:px-40">
      <Text className={"web:text-xl ios:text-md"}>AI:{" "} {msg.text?.length ? <Text className={"web:text-xl ios:text-md"}>{msg.text?.trim()}</Text> : <Text className={"web:text-xl ios:text-md"}>Loading...</Text>}</Text>

    </View>
  );
};
