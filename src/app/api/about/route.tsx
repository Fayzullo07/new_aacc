import connectMongoDB from "@/lib/mongodb";
import About from "@/models/aboutModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { photo, secondPhoto, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        const about = await About.create({
            photo,
            secondPhoto,
            translations: {
                uz: {
                    desc: uzDesc
                },
                ru: {
                    desc: ruDesc
                },
                en: {
                    desc: enDesc
                },
            }
        });

        return NextResponse.json({ message: "Created About succesfully", about }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}



