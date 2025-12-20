import { Metadata } from "next";
import styles from "./page.module.css";
import { AppleIcon, GooglePlayIcon } from "../../components/StoreIcons";

type Props = {
  params: { eventId: string };
};

export async function generateMetadata(): Promise<Metadata> {
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

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/app_icon.png"
            alt="Go"
            width={64}
            height={64}
            className={styles.logo}
          />
        </div>

        <div className={styles.eventBadge}>
          <span className={styles.eventIcon}>🎮</span>
          <span>イベント招待</span>
        </div>

        <h1 className={styles.title}>イベントに招待されています</h1>
        <p className={styles.description}>
          Goアプリでイベントの詳細を確認して参加しよう
        </p>

        <a href={appScheme} className={styles.openAppButton}>
          <span className={styles.buttonIcon}>📱</span>
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
            <AppleIcon className={styles.storeIcon} />
            <div className={styles.storeText}>
              <span className={styles.storeLabel}>Download on the</span>
              <span className={styles.storeName}>App Store</span>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=go.mobile"
            className={styles.storeButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GooglePlayIcon className={styles.storeIcon} />
            <div className={styles.storeText}>
              <span className={styles.storeLabel}>GET IT ON</span>
              <span className={styles.storeName}>Google Play</span>
            </div>
          </a>
        </div>

        <p className={styles.hint}>
          アプリインストール後に共有リンクを再度開くと、イベント詳細が表示されます
        </p>
      </div>
    </main>
  );
}
