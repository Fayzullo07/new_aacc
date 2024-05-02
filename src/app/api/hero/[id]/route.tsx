import connectMongoDB from "@/lib/mongodb";
import Hero from "@/models/heroModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const hero = await Hero.findById(id);
        return NextResponse.json({ hero }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ hero: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { photo, uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Hero.findByIdAndUpdate(id, {
            photo,
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

        return NextResponse.json({ message: "Updated Hero succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}




