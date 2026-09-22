import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://living-cost-calculator.vercel.app"),

  title: {
    default: "머니머니 | 생활비·비용 계산기",
    template: "%s | 머니머니",
  },

  description:
    "생활비, 자동차, 이사, 여행, 주거, 결혼·육아 등 일상에서 필요한 다양한 비용을 간편하게 계산해보세요.",

  applicationName: "머니머니",

  keywords: [
    "머니머니",
    "비용 계산기",
    "생활비 계산기",
    "자취 생활비 계산기",
    "자동차 유지비 계산기",
    "이사 비용 계산기",
    "여행 예산 계산기",
    "전세 월세 계산기",
    "자동차 구매비용 계산기",
    "결혼 비용 계산기",
    "육아 비용 계산기",
  ],

  openGraph: {
    title: "머니머니 | 생활비·비용 계산기",
    description:
      "생활비, 자동차, 이사, 여행 등 일상에서 필요한 다양한 비용을 간편하게 계산해보세요.",
    url: "https://living-cost-calculator.vercel.app",
    siteName: "머니머니",
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "머니머니 | 생활비·비용 계산기",
    description:
      "생활비, 자동차, 이사, 여행 등 다양한 비용을 간편하게 계산해보세요.",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "AIzE6AJq6oDfGiuJlu7ZTz5R1him7SJSE89G-s45mdA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}