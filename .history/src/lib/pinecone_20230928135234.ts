import { Pinecone, Vector, utils as PineConeUtils } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { Document, RecursiveCharacterTextSplitter } from '@pinecone-database/doc-splitter'
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "./utils";
let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
    return new Pinecone({
        environment: process.env.PINECONE_ENVIRONMENT!,
        apiKey: process.env.PINECONE_API_KEY!,
    });
};
type PDFPage = {
    pageContent: string,
    metadata: {
        loc: { pageNumber: number },
    }
}
export async function loadS3IntoPinecone(fileKey: string) {
    // obtain the pdf -> download and read from  pdf
    console.log('downloading file into filesystem')
    const file_name = await downloadFromS3(fileKey)
    if (!file_name) {
        throw new Error('Could not download from s3');
    }
    const loader = new PDFLoader(file_name)
    const pages = (await loader.load()) as PDFPage[]


    //2. split and segment the pdf to smaller(npm install  @pinecone-database/doc-splitter)
    const documents = await Promise.all(pages.map(page => prepareDocument(page)))
    // in short hand we can write await Promise.all(pages.map(prepareDocument))

    // 3. vectorize and embed induvidual docs
    const vectors = await Promise.all(documents.flat().map(embedDocument));

    // 4. upload to pinecone
    const client = await getPineconeClient()
    const pineconeIndex = client.Index('chatpdf-test')

    console.log('inster vectors to pinecone')

    const namespace = convertToAscii(fileKey)

    PineConeUtils.chunkedUpsert(pineconeIndex, vectors, namespace, 10)
}

export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}

async function prepareDocument(page: PDFPage) {
    let { pageContent, metadata } = page;
    pageContent = pageContent.replace(/\n/g, '');

    //split the docs

    const splitter = new RecursiveCharacterTextSplitter()
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
            }
        })
    ])
    return docs
}

async function embedDocument(doc: Document) {
    try {
        const embeddings = await getEmbeddings(doc.pageContent)
        const hash = md5(doc.pageContent)

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber
            }

        } as Vector

    } catch (error) {
        console.log("error embedding the doc", error)
        throw error
    }
}