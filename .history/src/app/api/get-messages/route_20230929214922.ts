import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = 'edge'
export const POST = async (req: Request) => {
    const { chatId } = await req.json();
    const _messages = await db.select().from(messages).where(eq(messages.chatId, chatId));

}