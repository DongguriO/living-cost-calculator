import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "머니머니 | 생활비·비용 계산기",
    template: "머니머니 | %s",
  },
  description:
    "생활비, 자동차 유지비, 이사 비용 등 일상에서 필요한 다양한 비용을 간편하게 계산해보세요.",
  applicationName: "머니머니",
  keywords: [
    "머니머니",
    "생활비 계산기",
    "자취 생활비 계산기",
    "자동차 유지비 계산기",
    "이사 비용 계산기",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
