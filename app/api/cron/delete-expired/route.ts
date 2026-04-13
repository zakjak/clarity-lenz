import { deleteExpiredEvents } from "../../lib/cleanup";

export async function GET() {
  await deleteExpiredEvents();
  return Response.json({ success: true });
}
