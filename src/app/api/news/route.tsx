import connectMongoDB from "@/lib/mongodb";
import News from "@/models/newsModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { photo, uzTitle, ruTitle, enTitle, uzContent, ruContent, enContent } = await req.json();
    await connectMongoDB()
    console.log(ruContent);

    try {
        await News.create({
            photo,
            translations: {
                uz: {
                    title: uzTitle,
                    content: uzContent
                },
                ru: {
                    title: ruTitle,
                    content: ruContent
                },
                en: {
                    title: enTitle,
                    content: enContent
                },
            }
        });

        return NextResponse.json({ message: "Created new succesfully" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    const search = req.nextUrl.searchParams.get('search');

    await connectMongoDB();
    try {
        let news;

        // Agar `search` parametri bo'sh bo'lsa, barcha ma'lumotlarni qidirish
        if (!search) {
            news = await News.find({});
        } else {
            // Agar `search` parametri bo'sh bo'lmasa, MongoDB'dan ma'lumotlarni qidirish
            news = await News.find({
                $or: [
                    { 'translations.uz.title': { $regex: search, $options: 'i' } },
                    { 'translations.ru.title': { $regex: search, $options: 'i' } },
                    { 'translations.en.title': { $regex: search, $options: 'i' } }
                ]
            });

        }
        return NextResponse.json({ news }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ news: null }, { status: 500 })
    }
}


