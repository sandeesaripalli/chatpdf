import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "internal server error" },
            { status: 500 });

    }
}
