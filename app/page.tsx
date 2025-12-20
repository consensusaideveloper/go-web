import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>🎮 Go</h1>
        <p className={styles.description}>ゲームイベントプラットフォーム</p>
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
      </div>
    </main>
  );
}
