import { getFirestoreDb } from "./firebase-admin";

export interface EventData {
  id: string;
  name: string;
  description: string;
  gameName?: string;
  gameIconUrl?: string;
  imageUrl?: string;
  startDate: Date;
  endDate?: Date;
  participantCount: number;
  maxParticipants: number;
  visibility: string;
  status: string;
  hostUserId: string;
}

/**
 * Firestoreからイベント情報を取得
 */
export async function getEventById(
  eventId: string
): Promise<EventData | null> {
  try {
    const db = getFirestoreDb();
    const eventDoc = await db.collection("events").doc(eventId).get();

    if (!eventDoc.exists) {
      return null;
    }

    const data = eventDoc.data();
    if (!data) {
      return null;
    }

    return {
      id: eventDoc.id,
      name: data.name || "イベント",
      description: data.description || "",
      gameName: data.gameName,
      gameIconUrl: data.gameIconUrl,
      imageUrl: data.imageUrl,
      startDate: data.startDate?.toDate() || new Date(),
      endDate: data.endDate?.toDate(),
      participantCount: data.participantCount || 0,
      maxParticipants: data.maxParticipants || 0,
      visibility: data.visibility || "パブリック",
      status: data.status || "active",
      hostUserId: data.hostUserId || "",
    };
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}
