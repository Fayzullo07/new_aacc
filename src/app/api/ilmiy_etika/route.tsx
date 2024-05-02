import connectMongoDB from "@/lib/mongodb";
import IlmiyEtika from "@/models/ilmiyErikaModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        const data = await IlmiyEtika.create({
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
        const ilmiy_etika = await IlmiyEtika.findOne({ getId: 'fayzullo' });
        return NextResponse.json({ ilmiy_etika }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ ilmiy_etika: null }, { status: 500 });
    }
};
