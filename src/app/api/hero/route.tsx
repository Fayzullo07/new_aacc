import connectMongoDB from "@/lib/mongodb";
import Hero from "@/models/heroModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { photo, uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        const hero = await Hero.create({
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

        return NextResponse.json({ message: "Created Hero succesfully", hero }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}



