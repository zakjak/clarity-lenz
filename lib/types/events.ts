export type SavedEvent = {
  id: number;
  userId: string;
  eventId: { eventId: number; email: string };
  email: string;
};
