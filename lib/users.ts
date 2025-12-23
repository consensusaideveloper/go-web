import { getFirestoreDb } from "./firebase-admin";

export interface UserData {
  id: string;
  userId: string;
  username: string;
  bio?: string;
  photoUrl?: string;
  isActive: boolean;
  isSetupCompleted: boolean;
  favoriteGameIds: string[];
  socialLinks?: Record<string, string>;
}

/**
 * FirestoreからユーザーIDでユーザー情報を取得
 * カスタムユーザーID（userId）で検索
 */
export async function getUserByCustomId(
  customUserId: string
): Promise<UserData | null> {
  try {
    const db = getFirestoreDb();

    // カスタムユーザーIDで検索
    const usersQuery = await db
      .collection("users")
      .where("userId", "==", customUserId)
      .limit(1)
      .get();

    if (usersQuery.empty) {
      return null;
    }

    const userDoc = usersQuery.docs[0];
    const data = userDoc.data();

    if (!data) {
      return null;
    }

    // 非アクティブユーザーは取得不可
    if (data.isActive === false) {
      return null;
    }

    // 初期設定未完了ユーザーは取得不可
    if (!data.isSetupCompleted && (!data.userId || data.userId.trim() === "")) {
      return null;
    }

    return {
      id: userDoc.id,
      userId: data.userId || "",
      username: data.username || "ユーザー",
      bio: data.bio,
      photoUrl: data.photoUrl,
      isActive: data.isActive ?? true,
      isSetupCompleted: data.isSetupCompleted ?? false,
      favoriteGameIds: data.favoriteGameIds || [],
      socialLinks: data.socialLinks,
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
