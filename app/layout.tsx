import "./globals.css";

// Note: 各ページで generateMetadata を使用して言語に応じたメタデータを生成
// ここではデフォルトのメタデータのみ設定

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
