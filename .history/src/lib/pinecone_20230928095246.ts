import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";

let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
    return new Pinecone({
        environment: process.env.PINECONE_ENVIRONMENT!,
        apiKey: process.env.PINECONE_API_KEY!,
    });
};

export async function loadS3IntoPinecone(fileKey: string) {
    // obtain the pdf -> download and read from  pdf
    console.log('downloading file into filesystem')
    const file_name = await downloadFromS3(fileKey)
}