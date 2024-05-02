import connectMongoDB from "@/lib/mongodb";
import Messages from "@/models/messageModel";
import { NextRequest, NextResponse } from "next/server";

// POST
export const POST = async (req: any) => {
    const { name, phone, desc, role, isLegal } = await req.json();
    await connectMongoDB()
    try {
        await Messages.create({ name, phone, desc, role, isLegal })
        return NextResponse.json({ message: "Sented message succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

// GET ALL
export const GET = async (req: NextRequest) => {
    const role = req.nextUrl.searchParams.get('role');
    await connectMongoDB();
    try {
        const messages = await Messages.find({ role });
        return NextResponse.json({ messages }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ messages: null }, { status: 500 })
    }

}

