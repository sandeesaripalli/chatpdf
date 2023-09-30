import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { getContext } from '@/lib/context'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
export const runtime = 'edge'
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
    try {
        const { messages, chatId } = await req.json();
        const lastMessage = messages[messages.length - 1]
        const _chats = await db.select().from(chats).where(eq(chats.id, chatId))
        if (_chats.length != 1) {
            return NextResponse.json({ 'error': 'Chat not found' }, { status: 404 })
        }
        const context = await getContext(lastMessage, chatId)
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
            stream: true
        })

        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (error) {

    }
}