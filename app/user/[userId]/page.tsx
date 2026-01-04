import { Metadata } from "next";
import { headers } from "next/headers";
import styles from "./page.module.css";
import { AppleIcon, GooglePlayIcon } from "../../components/StoreIcons";
import { getUserByCustomId } from "../../../lib/users";
import {
  getLocaleFromHeader,
  t,
  SupportedLocale,
} from "../../../lib/i18n/translations";

type Props = {
  params: { userId: string };
  searchParams: { lang?: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getLocaleFromHeader(acceptLanguage, searchParams.lang);

  const user = await getUserByCustomId(params.userId);

  if (!user) {
    return {
      title: t(locale, "userNotFoundTitle"),
      description: t(locale, "userNotFoundDescription"),
    };
  }

  const title = `${user.username} (@${user.userId}) | Go`;
  const description =
    user.bio && user.bio.length > 0
      ? user.bio.length > 100
        ? `${user.bio.substring(0, 100)}...`
        : user.bio
      : t(locale, "userDefaultDescription", { username: user.username });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: user.photoUrl
        ? [{ url: user.photoUrl, width: 200, height: 200 }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: user.photoUrl ? [user.photoUrl] : undefined,
    },
  };
}

export default async function UserPage({ params, searchParams }: Props) {
  const { userId } = params;
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getLocaleFromHeader(acceptLanguage, searchParams.lang);

  const user = await getUserByCustomId(userId);

  // ユーザーが見つからない場合
  if (!user) {
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

          <div className={styles.userBadge}>
            <span className={styles.userIcon}>❓</span>
            <span>{t(locale, "userNotFoundTitle").replace(" | Go", "")}</span>
          </div>

          <h1 className={styles.title}>{t(locale, "userNotFoundHeading")}</h1>
          <p className={styles.description}>
            {t(locale, "userNotFoundDetail")}
          </p>

          <StoreLinksSection locale={locale} />
        </div>
      </main>
    );
  }

  // ユーザープロフィール表示
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

        <div className={styles.userBadge}>
          <span className={styles.userIcon}>👤</span>
          <span>{t(locale, "userProfile")}</span>
        </div>

        {/* ユーザーアバター */}
        <div className={styles.avatarContainer}>
          {user.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.photoUrl}
              alt={user.username}
              width={100}
              height={100}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <span>{user.username.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>

        <h1 className={styles.title}>{user.username}</h1>
        <p className={styles.userId}>@{user.userId}</p>

        {user.bio && (
          <p className={styles.bio}>
            {user.bio.length > 150
              ? `${user.bio.substring(0, 150)}...`
              : user.bio}
          </p>
        )}

        <StoreLinksSection locale={locale} />

        <p className={styles.hint}>{t(locale, "userHint")}</p>
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
