import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "../utils";

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
    try {
        const client = new Pinecone({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONE_API_KEY!,
        });
        const pineconeIndex = await client.index("chatpdf");
        const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
        const queryResult = await namespace.query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
        });
        return queryResult.matches || [];

    } catch (error) {
        console.log("error querying ebedding", error)
    }
}

export async function getContext(query: string, fileKey: string) {

}