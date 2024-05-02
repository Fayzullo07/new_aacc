import connectMongoDB from "@/lib/mongodb";
import Projects from "@/models/projectModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const projects = await Projects.findById(id);
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ projects: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { title, uzContent, ruContent, enContent } = await req.json();
    await connectMongoDB()

    try {
        await Projects.findByIdAndUpdate(id, {
            title,
            translations: {
                uz: {
                    content: uzContent
                },
                ru: {
                    content: ruContent
                },
                en: {
                    content: enContent
                },
            }
        });

        return NextResponse.json({ message: "Updated projetc succesfully" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await Projects.findByIdAndDelete(id);
    console.log("delete");

    return NextResponse.json({ message: "Projects deleted" }, { status: 200 })
}



