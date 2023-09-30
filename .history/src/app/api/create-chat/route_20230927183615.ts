import { messages } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();

        const { file_key, file_name } = body
        console.log('file_key, file_name :>> ', file_key, file_name);
        NextResponse.json({ message: 'success' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "internal server error" },
            { status: 500 });

    }
}
