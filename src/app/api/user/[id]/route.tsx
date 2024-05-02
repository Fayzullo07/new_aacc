import connectMongoDB from "@/lib/mongodb";
import News from "@/models/newsModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const news = await News.findById(id);
        return NextResponse.json({ news }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ news: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { photo, uzTitle, ruTitle, enTitle, uzContent, ruContent, enContent } = await req.json();
    await connectMongoDB()

    try {
        await News.findByIdAndUpdate(id, {
            photo,
            translations: {
                uz: {
                    title: uzTitle,
                    content: uzContent
                },
                ru: {
                    title: ruTitle,
                    content: ruContent
                },
                en: {
                    title: enTitle,
                    content: enContent
                },
            }
        });

        return NextResponse.json({ message: "Updated new succesfully" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await News.findByIdAndDelete(id);
    console.log("delete");

    return NextResponse.json({ message: "New deleted" }, { status: 200 })
}



