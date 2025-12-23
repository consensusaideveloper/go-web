import { Metadata } from "next";
import styles from "./page.module.css";
import { AppleIcon, GooglePlayIcon } from "../../components/StoreIcons";
import { getEventById } from "../../../lib/events";

type Props = {
  params: { eventId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventById(params.eventId);

  if (!event) {
    return {
      title: "イベントが見つかりません | Go",
      description: "このイベントは存在しないか、削除されました。",
    };
  }

  const title = `${event.name} | Go`;
  const description =
    event.description.length > 100
      ? `${event.description.substring(0, 100)}...`
      : event.description || `${event.gameName || "ゲーム"}イベントに参加しよう`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: event.imageUrl
        ? [{ url: event.imageUrl, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: event.imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: event.imageUrl ? [event.imageUrl] : undefined,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { eventId } = params;
  const event = await getEventById(eventId);

  // イベントが見つからない場合
  if (!event) {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.logoContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/app_icon.png"
              alt="Go"
              width={80}
              height={80}
              className={styles.logo}
            />
          </div>

          <div className={styles.eventBadge}>
            <span className={styles.eventIcon}>❓</span>
            <span>イベントが見つかりません</span>
          </div>

          <h1 className={styles.title}>このイベントは存在しません</h1>
          <p className={styles.description}>
            イベントが削除されたか、URLが間違っている可能性があります。
          </p>

          <StoreLinksSection />
        </div>
      </main>
    );
  }

  // プライベートイベントの場合
  if (event.visibility === "プライベート") {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.logoContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/app_icon.png"
              alt="Go"
              width={80}
              height={80}
              className={styles.logo}
            />
          </div>

          <div className={styles.eventBadge}>
            <span className={styles.eventIcon}>🔒</span>
            <span>プライベートイベント</span>
          </div>

          <h1 className={styles.title}>このイベントは非公開です</h1>
          <p className={styles.description}>
            アプリからイベントの詳細を確認してください。
          </p>

          <AppOpenButton eventId={eventId} />
          <StoreLinksSection />
        </div>
      </main>
    );
  }

  // 通常のイベント表示
  const startDateStr = formatDate(event.startDate);

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

        <h1 className={styles.title}>{event.name}</h1>

        <div className={styles.eventInfo}>
          <div className={styles.eventInfoItem}>
            <span className={styles.eventInfoIcon}>📅</span>
            <span>{startDateStr}</span>
          </div>
          {event.gameName && (
            <div className={styles.eventInfoItem}>
              <span className={styles.eventInfoIcon}>🎮</span>
              <span>{event.gameName}</span>
            </div>
          )}
          <div className={styles.eventInfoItem}>
            <span className={styles.eventInfoIcon}>👥</span>
            <span>
              {event.participantCount}/{event.maxParticipants}人
            </span>
          </div>
        </div>

        {event.description && (
          <p className={styles.eventDescription}>
            {event.description.length > 150
              ? `${event.description.substring(0, 150)}...`
              : event.description}
          </p>
        )}

        <AppOpenButton eventId={eventId} />
        <StoreLinksSection />

        <p className={styles.hint}>
          アプリインストール後に共有リンクを再度開くと、イベント詳細が表示されます
        </p>
      </div>
    </main>
  );
}

function AppOpenButton({ eventId }: { eventId: string }) {
  const appScheme = `go://event/${eventId}`;

  return (
    <a href={appScheme} className={styles.openAppButton}>
      <span className={styles.buttonIcon}>📱</span>
      アプリで開く
    </a>
  );
}

function StoreLinksSection() {
  return (
    <>
      <div className={styles.divider}>
        <span>アプリをお持ちでない方</span>
      </div>

      <div className={styles.storeLinks}>
        <a
          href="https://apps.apple.com/jp/app/go/id6756296268"
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
    </>
  );
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
