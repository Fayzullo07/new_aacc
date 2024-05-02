import connectMongoDB from "@/lib/mongodb";
import About from "@/models/aboutModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const about = await About.findById(id);
        return NextResponse.json({ about }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ hero: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { photo, secondPhoto, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()
    console.log(secondPhoto);

    try {
        await About.findByIdAndUpdate(id, {
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

        return NextResponse.json({ message: "Updated About succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}




