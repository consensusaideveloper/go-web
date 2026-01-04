export type SupportedLocale = "ja" | "en" | "ko" | "zh";

export const translations = {
  ja: {
    // メタデータ
    appTitle: "Go - ゲームイベントプラットフォーム",
    appDescription: "ゲームイベントを見つけて参加しよう",

    // イベントページ
    eventNotFoundTitle: "イベントが見つかりません | Go",
    eventNotFoundDescription: "このイベントは存在しないか、削除されました。",
    eventNotFoundHeading: "このイベントは存在しません",
    eventNotFoundDetail: "イベントが削除されたか、URLが間違っている可能性があります。",
    eventInvite: "イベント招待",
    eventPrivate: "プライベートイベント",
    eventPrivateHeading: "このイベントは非公開です",
    eventPrivateDetail: "アプリからイベントの詳細を確認してください。",
    eventHint: "アプリをインストール後、この共有リンクを再度開くとアプリでイベント詳細が表示されます",
    eventParticipants: "{current}/{max}人",
    eventPrizeAvailable: "賞品あり",
    eventDefaultDescription: "イベントに参加しよう",

    // ユーザーページ
    userNotFoundTitle: "ユーザーが見つかりません | Go",
    userNotFoundDescription: "このユーザーは存在しないか、削除されました。",
    userNotFoundHeading: "このユーザーは存在しません",
    userNotFoundDetail: "ユーザーが削除されたか、URLが間違っている可能性があります。",
    userProfile: "ユーザープロフィール",
    userDefaultDescription: "{username}さんのプロフィール",
    userHint: "アプリをインストール後、この共有リンクを再度開くとアプリでプロフィールが表示されます",

    // 共通
    appNotInstalled: "アプリをお持ちでない方",
  },
  en: {
    // メタデータ
    appTitle: "Go - Game Event Platform",
    appDescription: "Find and join game events",

    // イベントページ
    eventNotFoundTitle: "Event Not Found | Go",
    eventNotFoundDescription: "This event does not exist or has been deleted.",
    eventNotFoundHeading: "This event does not exist",
    eventNotFoundDetail: "The event may have been deleted or the URL may be incorrect.",
    eventInvite: "Event Invite",
    eventPrivate: "Private Event",
    eventPrivateHeading: "This event is private",
    eventPrivateDetail: "Please check the event details from the app.",
    eventHint: "After installing the app, open this shared link again to view the event details in the app",
    eventParticipants: "{current}/{max}",
    eventPrizeAvailable: "Prize available",
    eventDefaultDescription: "Join this event",

    // ユーザーページ
    userNotFoundTitle: "User Not Found | Go",
    userNotFoundDescription: "This user does not exist or has been deleted.",
    userNotFoundHeading: "This user does not exist",
    userNotFoundDetail: "The user may have been deleted or the URL may be incorrect.",
    userProfile: "User Profile",
    userDefaultDescription: "{username}'s Profile",
    userHint: "After installing the app, open this shared link again to view the profile in the app",

    // 共通
    appNotInstalled: "Don't have the app?",
  },
  ko: {
    // メタデータ
    appTitle: "Go - 게임 이벤트 플랫폼",
    appDescription: "게임 이벤트를 찾고 참여하세요",

    // イベントページ
    eventNotFoundTitle: "이벤트를 찾을 수 없습니다 | Go",
    eventNotFoundDescription: "이 이벤트는 존재하지 않거나 삭제되었습니다.",
    eventNotFoundHeading: "이 이벤트는 존재하지 않습니다",
    eventNotFoundDetail: "이벤트가 삭제되었거나 URL이 잘못되었을 수 있습니다.",
    eventInvite: "이벤트 초대",
    eventPrivate: "비공개 이벤트",
    eventPrivateHeading: "이 이벤트는 비공개입니다",
    eventPrivateDetail: "앱에서 이벤트 세부 정보를 확인하세요.",
    eventHint: "앱 설치 후 이 공유 링크를 다시 열면 앱에서 이벤트 세부 정보를 볼 수 있습니다",
    eventParticipants: "{current}/{max}명",
    eventPrizeAvailable: "상품 있음",
    eventDefaultDescription: "이벤트에 참여하세요",

    // ユーザーページ
    userNotFoundTitle: "사용자를 찾을 수 없습니다 | Go",
    userNotFoundDescription: "이 사용자는 존재하지 않거나 삭제되었습니다.",
    userNotFoundHeading: "이 사용자는 존재하지 않습니다",
    userNotFoundDetail: "사용자가 삭제되었거나 URL이 잘못되었을 수 있습니다.",
    userProfile: "사용자 프로필",
    userDefaultDescription: "{username}님의 프로필",
    userHint: "앱 설치 후 이 공유 링크를 다시 열면 앱에서 프로필을 볼 수 있습니다",

    // 共通
    appNotInstalled: "앱이 없으신가요?",
  },
  zh: {
    // メタデータ
    appTitle: "Go - 游戏活动平台",
    appDescription: "发现并参加游戏活动",

    // イベントページ
    eventNotFoundTitle: "找不到活动 | Go",
    eventNotFoundDescription: "此活动不存在或已被删除。",
    eventNotFoundHeading: "此活动不存在",
    eventNotFoundDetail: "活动可能已被删除或URL错误。",
    eventInvite: "活动邀请",
    eventPrivate: "私密活动",
    eventPrivateHeading: "此活动是私密的",
    eventPrivateDetail: "请在应用中查看活动详情。",
    eventHint: "安装应用后，再次打开此分享链接即可在应用中查看活动详情",
    eventParticipants: "{current}/{max}人",
    eventPrizeAvailable: "有奖品",
    eventDefaultDescription: "加入此活动",

    // ユーザーページ
    userNotFoundTitle: "找不到用户 | Go",
    userNotFoundDescription: "此用户不存在或已被删除。",
    userNotFoundHeading: "此用户不存在",
    userNotFoundDetail: "用户可能已被删除或URL错误。",
    userProfile: "用户资料",
    userDefaultDescription: "{username}的资料",
    userHint: "安装应用后，再次打开此分享链接即可在应用中查看资料",

    // 共通
    appNotInstalled: "还没有安装应用？",
  },
} as const;

export type TranslationKey = keyof typeof translations.ja;

/**
 * Accept-Languageヘッダーまたはlangパラメータから言語を取得
 */
export function getLocaleFromHeader(acceptLanguage: string | null, langParam?: string | null): SupportedLocale {
  // langパラメータが優先
  if (langParam) {
    const normalizedLang = langParam.toLowerCase().split("-")[0];
    if (normalizedLang === "ja") return "ja";
    if (normalizedLang === "en") return "en";
    if (normalizedLang === "ko") return "ko";
    if (normalizedLang === "zh") return "zh";
  }

  // Accept-Languageヘッダーから判定
  if (acceptLanguage) {
    const languages = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim().toLowerCase());
    for (const lang of languages) {
      const primary = lang.split("-")[0];
      if (primary === "ja") return "ja";
      if (primary === "en") return "en";
      if (primary === "ko") return "ko";
      if (primary === "zh") return "zh";
    }
  }

  // デフォルトは日本語
  return "ja";
}

/**
 * 翻訳テキストを取得
 */
export function t(locale: SupportedLocale, key: TranslationKey, params?: Record<string, string | number>): string {
  let text: string = translations[locale][key] || translations.ja[key];

  if (params) {
    Object.entries(params).forEach(([k, value]) => {
      text = text.replace(`{${k}}`, String(value));
    });
  }

  return text;
}
