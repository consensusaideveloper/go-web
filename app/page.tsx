import { Metadata } from "next";
import { headers } from "next/headers";
import styles from "./page.module.css";
import { AppleIcon, GooglePlayIcon } from "./components/StoreIcons";
import {
  getLocaleFromHeader,
  t,
  SupportedLocale,
} from "../lib/i18n/translations";

type Props = {
  searchParams: { lang?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getLocaleFromHeader(acceptLanguage, searchParams.lang);

  return {
    title: t(locale, "appTitle"),
    description: t(locale, "appDescription"),
  };
}

export default function Home({ searchParams }: Props) {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getLocaleFromHeader(acceptLanguage, searchParams.lang);

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
        <h1 className={styles.title}>Go</h1>
        <p className={styles.subtitle}>{t(locale, "homeSubtitle")}</p>
        <p className={styles.description}>{t(locale, "homeDescription")}</p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎮</span>
            <span>{t(locale, "homeFeatureSearch")}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>👥</span>
            <span>{t(locale, "homeFeatureMatching")}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🏆</span>
            <span>{t(locale, "homeFeatureTournament")}</span>
          </div>
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
      </div>
    </main>
  );
}
