import { Metadata } from "next";
import styles from "./page.module.css";

type Props = {
  params: { eventId: string };
};

// TODO: Firebase等からイベント情報を取得する場合はここで実装
// async function getEvent(eventId: string) {
//   const res = await fetch(`https://api.example.com/events/${eventId}`);
//   return res.json();
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // TODO: 実際のイベント情報からメタデータを生成
  return {
    title: `イベント詳細 | Go`,
    description: "Goアプリでイベントの詳細を確認しよう",
    openGraph: {
      title: "イベント詳細 | Go",
      description: "Goアプリでイベントの詳細を確認しよう",
      type: "website",
    },
  };
}

export default function EventPage({ params }: Props) {
  const { eventId } = params;

  // iOS/Android向けのディープリンクURL
  const appScheme = `go://event/${eventId}`;
  const universalLink = `https://go-mobile-event.vercel.app/event/${eventId}`;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.icon}>🎮</div>
        <h1 className={styles.title}>イベント詳細</h1>
        <p className={styles.description}>
          このイベントの詳細はGoアプリで確認できます
        </p>

        <a href={appScheme} className={styles.openAppButton}>
          アプリで開く
        </a>

        <div className={styles.divider}>
          <span>アプリをお持ちでない方</span>
        </div>

        <div className={styles.storeLinks}>
          <a
            href="https://apps.apple.com/app/id000000000"
            className={styles.storeButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.example.go"
            className={styles.storeButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Play
          </a>
        </div>

        <p className={styles.hint}>
          アプリをインストール後、共有リンクを再度開くと
          <br />
          イベント詳細が表示されます
        </p>
      </div>
    </main>
  );
}
