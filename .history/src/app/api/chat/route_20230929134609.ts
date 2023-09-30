import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge'
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)