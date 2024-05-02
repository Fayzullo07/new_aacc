import connectMongoDB from "@/lib/mongodb";
import Questions from "@/models/questionModel";
import { NextResponse } from "next/server";

// GET BY ID
export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const questions = await Questions.findById(id);
        return NextResponse.json({ questions }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ questions: null }, { status: 500 });
    }
};

// PUT
export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { uzQuestion, ruQuestion, enQuestion, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Questions.findByIdAndUpdate(id, {
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

        return NextResponse.json({ message: "Updated new succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await Questions.findByIdAndDelete(id);

    return NextResponse.json({ message: "Question deleted" }, { status: 200 })
}



