import connectMongoDB from "@/lib/mongodb";
import IlmiyEtika from "@/models/ilmiyErikaModel";
import { NextResponse } from "next/server";

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        const data = await IlmiyEtika.findByIdAndUpdate(id, {
            translations: {
                uz: {
                    title: uzTitle,
                    desc: uzDesc
                },
                ru: {
                    title: ruTitle,
                    desc: ruDesc
                },
                en: {
                    title: enTitle,
                    desc: enDesc
                },
            }
        });

        return NextResponse.json({ message: "Updated succesfully", data }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const PATCH = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { name, desc } = await req.json();
    await connectMongoDB()

    try {
        const comment = { name, desc };
        await IlmiyEtika.findByIdAndUpdate(id, {
            $push: { comments: comment },
        });

        return NextResponse.json({ message: "Updated succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

