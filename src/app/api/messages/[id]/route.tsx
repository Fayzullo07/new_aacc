import connectMongoDB from "@/lib/mongodb";
import Messages from "@/models/messageModel";
import { NextResponse } from "next/server";

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    try {
        await Messages.findByIdAndDelete(id);
        return NextResponse.json({ message: "Message deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }

}



