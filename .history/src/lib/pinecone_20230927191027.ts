import { Pinecone } from "@pinecone-database/pinecone";

let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
    return new Pinecone({
        environment: process.env.PINECONE_ENVIRONMENT!,
        apiKey: process.env.PINECONE_API_KEY!,
    });
};