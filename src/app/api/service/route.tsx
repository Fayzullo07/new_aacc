import connectMongoDB from "@/lib/mongodb";
import Services from "@/models/serviceModel";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: any) => {
    const { uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Services.create({
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

        return NextResponse.json({ message: "Created service succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {

    await connectMongoDB();
    try {
        let services = await Services.find({});

        return NextResponse.json({ services }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ services: null }, { status: 500 })
    }
}


