import { Pinecone } from "@pinecone-database/pinecone";

let pinecone: Pinecone | null = null;

export const getPineCone = async () => {
    if (!pinecone) {
        pinecone = new Pinecone();
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONNECT_API_KEY!
        })
    }
    const index = pinecone.Index("chatpdf");
}