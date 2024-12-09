import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Righteous } from "next/font/google";
import Providers from "./providers";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const righteous = Righteous({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-righteous",
});

export const metadata: Metadata = {
    title: "Loop Insights",
    description: "A feedback collection tool",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/logo.png" sizes="any" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${righteous.variable} antialiased min-h-svh bg-neutral-200`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
