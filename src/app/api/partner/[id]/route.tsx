import connectMongoDB from "@/lib/mongodb";
import Partners from "@/models/partnerModel";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const partners = await Partners.findById(id);
        return NextResponse.json({ partners }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ partners: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Partners.findByIdAndUpdate(id, {
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

        return NextResponse.json({ message: "Updated partners succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await Partners.findByIdAndDelete(id);

    return NextResponse.json({ message: "Partners deleted" }, { status: 200 })
}



