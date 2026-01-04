import { Metadata } from "next";
import { headers } from "next/headers";
import styles from "./page.module.css";
import { AppleIcon, GooglePlayIcon } from "../../components/StoreIcons";
import { getEventById } from "../../../lib/events";
import {
  getLocaleFromHeader,
  t,
  SupportedLocale,
} from "../../../lib/i18n/translations";

type Props = {
  params: { eventId: string };
  searchParams: { lang?: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getLocaleFromHeader(acceptLanguage, searchParams.lang);

  const event = await getEventById(params.eventId);

  if (!event) {
    return {
      title: t(locale, "eventNotFoundTitle"),
      description: t(locale, "eventNotFoundDescription"),
    };
  }

  const title = `${event.name} | Go`;
  const description =
    event.description.length > 100
      ? `${event.description.substring(0, 100)}...`
      : event.description ||
        t(locale, "eventDefaultDescription");

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

export default async function EventPage({ params, searchParams }: Props) {
  const { eventId } = params;
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getLocaleFromHeader(acceptLanguage, searchParams.lang);

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
            <span>{t(locale, "eventNotFoundTitle").replace(" | Go", "")}</span>
          </div>

          <h1 className={styles.title}>{t(locale, "eventNotFoundHeading")}</h1>
          <p className={styles.description}>
            {t(locale, "eventNotFoundDetail")}
          </p>

          <StoreLinksSection locale={locale} />
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
            <span>{t(locale, "eventPrivate")}</span>
          </div>

          <h1 className={styles.title}>{t(locale, "eventPrivateHeading")}</h1>
          <p className={styles.description}>
            {t(locale, "eventPrivateDetail")}
          </p>

          <StoreLinksSection locale={locale} />

          <p className={styles.hint}>{t(locale, "eventHint")}</p>
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
          <span>{t(locale, "eventInvite")}</span>
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
              {t(locale, "eventParticipants", {
                current: event.participantCount,
                max: event.maxParticipants,
              })}
            </span>
          </div>
          {event.hasPrize && (
            <div className={styles.eventInfoItem}>
              <span className={styles.eventInfoIcon}>🏆</span>
              <span>{t(locale, "eventPrizeAvailable")}</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className={styles.eventDescription}>
            {event.description.length > 150
              ? `${event.description.substring(0, 150)}...`
              : event.description}
          </p>
        )}

        <StoreLinksSection locale={locale} />

        <p className={styles.hint}>{t(locale, "eventHint")}</p>
      </div>
    </main>
  );
}

function StoreLinksSection({ locale }: { locale: SupportedLocale }) {
  return (
    <>
      <div className={styles.divider}>
        <span>{t(locale, "appNotInstalled")}</span>
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
