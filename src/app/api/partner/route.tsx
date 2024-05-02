import connectMongoDB from "@/lib/mongodb";
import Partners from "@/models/partnerModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { uzTitle, ruTitle, enTitle, uzDesc, ruDesc, enDesc } = await req.json();
    await connectMongoDB()

    try {
        await Partners.create({
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

        return NextResponse.json({ message: "Created partner succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    const search = req.nextUrl.searchParams.get('search');

    await connectMongoDB();
    try {
        let partners;

        // Agar `search` parametri bo'sh bo'lsa, barcha ma'lumotlarni qidirish
        if (!search) {
            partners = await Partners.find({});
        } else {
            // Agar `search` parametri bo'sh bo'lmasa, MongoDB'dan ma'lumotlarni qidirish
            partners = await Partners.find({
                $or: [
                    { 'translations.uz.title': { $regex: search, $options: 'i' } },
                    { 'translations.ru.title': { $regex: search, $options: 'i' } },
                    { 'translations.en.title': { $regex: search, $options: 'i' } }
                ]
            });

        }
        return NextResponse.json({ partners }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ partners: null }, { status: 500 })
    }
}


