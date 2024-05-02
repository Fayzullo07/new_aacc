import connectMongoDB from "@/lib/mongodb";
import Projects from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { title, uzContent, ruContent, enContent } = await req.json();
    await connectMongoDB()

    try {
        await Projects.create({
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

        return NextResponse.json({ message: "Created project succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    const search = req.nextUrl.searchParams.get('search');

    await connectMongoDB();
    try {
        let projects;
        // Agar `search` parametri bo'sh bo'lsa, barcha ma'lumotlarni qidirish
        if (!search) {
            projects = await Projects.find({});
        } else {
            // Agar `search` parametri bo'sh bo'lmasa, MongoDB'dan ma'lumotlarni qidirish
            projects = await Projects.find({
                title: { $regex: search, $options: 'i' }
            });
        }
        return NextResponse.json({ projects }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ projects: null }, { status: 500 })
    }
}


