import styles from "./page.module.css";
import { AppleIcon, GooglePlayIcon } from "./components/StoreIcons";

export default function Home() {
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
        <h1 className={styles.title}>ゲームイベントプラットフォーム</h1>
        <p className={styles.description}>
          ゲームイベントを見つけて、参加して、仲間とつながろう
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎮</span>
            <span>イベント検索</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>👥</span>
            <span>参加者マッチング</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🏆</span>
            <span>大会運営</span>
          </div>
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
      </div>
    </main>
  );
}
