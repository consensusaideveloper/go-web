import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Firebase プロジェクトID
// 環境変数 FIREBASE_ENV で dev/prod を切り替え
const FIREBASE_PROJECT_IDS = {
  dev: "go-mobile-firebase-dev",
  prod: "go-mobile-firebase",
} as const;

function getProjectId(): string {
  const env = process.env.FIREBASE_ENV || "prod";
  return FIREBASE_PROJECT_IDS[env as keyof typeof FIREBASE_PROJECT_IDS] || FIREBASE_PROJECT_IDS.prod;
}

// Firebase Admin SDKの初期化
function getFirebaseAdmin(): App {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  // 環境変数からサービスアカウント情報を取得
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const projectId = getProjectId();

  if (!serviceAccount) {
    // 開発環境: ADCを使用（gcloud auth application-default login が必要）
    console.log(`Firebase Admin: Initializing with project ${projectId} (ADC)`);
    return initializeApp({
      projectId,
    });
  }

  // 本番環境: サービスアカウントキーを使用
  try {
    const serviceAccountKey = JSON.parse(serviceAccount);
    console.log(`Firebase Admin: Initializing with project ${projectId} (Service Account)`);
    return initializeApp({
      credential: cert(serviceAccountKey),
      projectId,
    });
  } catch (error) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error);
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY");
  }
}

let firestoreInstance: Firestore | null = null;

export function getFirestoreDb(): Firestore {
  if (!firestoreInstance) {
    getFirebaseAdmin();
    firestoreInstance = getFirestore();
  }
  return firestoreInstance;
}
