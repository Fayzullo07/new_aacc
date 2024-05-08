import connectMongoDB from "@/lib/mongodb";
import Hero from "@/models/heroModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { photo, uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Hero.create({
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

        return NextResponse.json({ message: "Created Hero succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    try {
        const hero = await Hero.find({});
        return NextResponse.json({ hero }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ hero: null }, { status: 500 })
    }
}



