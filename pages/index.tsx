import * as React from "react";
import Header from "@/components/pages/header";
import type { NextPage } from "next";
import Head from "next/head";
import Introduction from "@/components/pages/introduction";
import Experiences from "@/components/pages/experiences";
import Skills from "@/components/pages/skills";
import Projects from "@/components/pages/projects";
import Contact from "@/components/pages/contact";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>McSam | Portfolio</title>
        <meta name="description" content="McSam's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen">
        <Introduction />
        <Experiences />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default Home;
