import type { Metadata } from "next";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/nprogress/styles.css";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  title: "Boardles - AI Sales Assistant",
  description: "AI Sales Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryProvider>
          <MantineProvider>
            <Notifications position="top-right" />
            {children}
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
