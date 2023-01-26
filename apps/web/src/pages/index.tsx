import { Tabs } from "@components/Tabs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Provider as JotaiProvider } from "jotai";

import { api } from "../utils/api";
import { Content } from "@components/Content";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <JotaiProvider>
      <Head>
        <title>Promptable UI</title>
        <meta name="description" content="Built for magic." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full flex-col bg-base-300" data-theme={"night"}>
        <Tabs />
        <Content />
      </main>
    </JotaiProvider>
  );
};

export default Home;
