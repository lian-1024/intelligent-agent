import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { HTMLAttributes } from "react";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    template: "%s | AgentX",
    default: "AgentX"
  },
  description: "基于多智能体系统的智能助手平台，提供强大的对话和知识检索能力",
  openGraph: {
    title: {
      template: "%s | AgentX",
      default: "AgentX"
    },
    description: "基于多智能体系统的智能助手平台",
    url: "https://yourdomain.com",
    siteName: "AgentX",
    // images: [
    //     {
    //         url: "https://yourdomain.com/og-image.png",
    //         width: 1200,
    //         height: 630,
    //     },
    // ],
    locale: "zh_CN",
    type: "website",
  },
}



export default function RootLayout({
  children,
}: HTMLAttributes<HTMLElement>) {
  return (
    <html lang="en"
      // 避免hydration警告
      suppressHydrationWarning
      className="h-full"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
