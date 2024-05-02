import connectMongoDB from "@/lib/mongodb";
import CenterMind from "@/models/cenetMindModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        const data = await CenterMind.create({
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

        return NextResponse.json({ message: "Created succesfully", data }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export const GET = async () => {
    await connectMongoDB();
    try {
        const center_mind = await CenterMind.findOne({ getId: 'fayzullo' });
        return NextResponse.json({ center_mind }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ center_mind: null }, { status: 500 });
    }
};


