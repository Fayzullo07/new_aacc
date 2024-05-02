import connectMongoDB from "@/lib/mongodb";
import Questions from "@/models/questionModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { uzQuestion, ruQuestion, enQuestion, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Questions.create({
            uz: {
                question: uzQuestion,
                desc: uzDesc
            },
            ru: {
                question: ruQuestion,
                desc: ruDesc
            },
            en: {
                question: enQuestion,
                desc: enDesc
            },
        });

        return NextResponse.json({ message: "Created question succesfully" }, { status: 201 })
    } catch (error) {

        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {

    await connectMongoDB();
    try {
        let questions = await Questions.find({});

        return NextResponse.json({ questions }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ questions: null }, { status: 500 })
    }
}


