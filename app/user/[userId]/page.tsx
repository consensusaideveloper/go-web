import { Metadata } from "next";
import styles from "./page.module.css";
import { AppleIcon, GooglePlayIcon } from "../../components/StoreIcons";
import { getUserByCustomId } from "../../../lib/users";

type Props = {
  params: { userId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUserByCustomId(params.userId);

  if (!user) {
    return {
      title: "ユーザーが見つかりません | Go",
      description: "このユーザーは存在しないか、削除されました。",
    };
  }

  const title = `${user.username} (@${user.userId}) | Go`;
  const description =
    user.bio && user.bio.length > 0
      ? user.bio.length > 100
        ? `${user.bio.substring(0, 100)}...`
        : user.bio
      : `${user.username}さんのプロフィール`;

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

export default async function UserPage({ params }: Props) {
  const { userId } = params;
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
            <span>ユーザーが見つかりません</span>
          </div>

          <h1 className={styles.title}>このユーザーは存在しません</h1>
          <p className={styles.description}>
            ユーザーが削除されたか、URLが間違っている可能性があります。
          </p>

          <StoreLinksSection />
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
          <span>ユーザープロフィール</span>
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

        <StoreLinksSection />

        <p className={styles.hint}>
          アプリをインストール後、この共有リンクを再度開くとアプリでプロフィールが表示されます
        </p>
      </div>
    </main>
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
