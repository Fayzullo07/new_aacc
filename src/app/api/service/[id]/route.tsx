import connectMongoDB from "@/lib/mongodb";
import News from "@/models/newsModel";
import Services from "@/models/serviceModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const services = await Services.findById(id);
        return NextResponse.json({ services }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ services: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Services.findByIdAndUpdate(id, {
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

        return NextResponse.json({ message: "Updated service succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await Services.findByIdAndDelete(id);

    return NextResponse.json({ message: "Services deleted" }, { status: 200 })
}



