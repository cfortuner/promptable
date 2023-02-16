import { Tabs } from "@components/Tabs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Provider as JotaiProvider } from "jotai";

import { api } from "../utils/api";
import { Content } from "@components/Content";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Head>
          <title>Promptable UI</title>
          <meta name="description" content="Built for magic." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex h-full flex-col" data-theme={"black"}>
          <Tabs />
          <Content />
        </main>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default Home;
