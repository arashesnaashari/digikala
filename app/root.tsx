import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { withEmotionCache } from "@emotion/react";
import { ServerStyleContext, ClientStyleContext } from "./context";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { HStack, ChakraProvider, Box } from "@chakra-ui/react";
import styles from "~/../public/style.css";
import { useContext, useEffect, useState } from "react";
import PinarStyle from "~/assets/pinar.css";
import YekanStyle from "~/assets/yekan.css";
import VazirStyle from "~/assets/vazir.css";

export let links: LinksFunction = () => {
  return [
    cssBundleHref
      ? { rel: "stylesheet", href: cssBundleHref }
      : { rel: "stylesheet", href: "" },
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/title.svg" },
    { rel: "stylesheet", href: PinarStyle },
    { rel: "stylesheet", href: YekanStyle },
    { rel: "stylesheet", href: VazirStyle },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        {/* <HStack
          bg={"white"}
          alignItems={"center"}
          width={"100%"}
          justifyContentred={"start"}
          shadow={"sm"}
        >
          <a href="/">
            {" "}
            <img
              style={{
                paddingLeft: "1rem",
                width: "142px",
                marginBottom: "-2.5rem",
                marginTop: "-2.5rem",
              }}
              src="/ussis.png"
            />
          </a>
        </HStack> */}
        <Box
          backgroundImage={
            "url(https://media.mehrnews.com/d/2022/07/31/4/4230759.jpg?ts=1659275996951)"
          }
          overflow={"hidden"}
          width={"100%"}
          height={"100%"}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
          pos={"fixed"}
          filter={"blur(3px)"}
        ></Box>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

//#f0f0f1   gary
// #ef4056 red
// #d32f2f  red error
//127.0.0.53
