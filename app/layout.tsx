import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go - ゲームイベントプラットフォーム",
  description: "ゲームイベントを見つけて参加しよう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
