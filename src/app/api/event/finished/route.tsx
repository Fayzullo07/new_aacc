import connectMongoDB from "@/lib/mongodb";
import EventFinished from "@/models/eventFinishiedModel";
import EventWait from "@/models/eventWaitModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    try {
        const { idWait, photos, place, date, uzName, ruName, enName, uzForm, ruForm, enForm, uzResult, ruResult, enResult, partners } = await req.json();

        // MongoDBga bog'lanish
        await connectMongoDB();
        // EventWait modelidan ma'lumotni yangilash
        await EventWait.findByIdAndUpdate(idWait, {
            status: false
        });
        console.log(partners);

        // EventFinished modeli orqali ma'lumotlarni saqlash
        await EventFinished.create({
            photos,
            place,
            idWait,
            date,
            partners,
            translations: {
                uz: {
                    name: uzName,
                    form: uzForm,
                    result: uzResult,
                },
                ru: {
                    name: ruName,
                    form: ruForm,
                    result: ruResult,
                },
                en: {
                    name: enName,
                    form: enForm,
                    result: enResult,
                },
            }
        });



        // Agar hamma muvaffaqiyatli bo'lsa, 201 status bilan javob qaytarish
        return NextResponse.json({ message: "Created event finished succesfully" }, { status: 201 });
    } catch (error) {
        // Xatolikni qaytarish
        console.log("Error:", error); // Xatoni konsolga chiqarish
        return NextResponse.json({ data: null }, { status: 500 });
    }
}



export const GET = async (req: NextRequest) => {
    const search = req.nextUrl.searchParams.get('search');

    await connectMongoDB();
    try {
        let eventsFinished;

        // Agar `search` parametri bo'sh bo'lsa, barcha ma'lumotlarni qidirish
        if (!search) {
            eventsFinished = await EventFinished.find({});
        } else {
            // Agar `search` parametri bo'sh bo'lmasa, MongoDB'dan ma'lumotlarni qidirish
            eventsFinished = await EventFinished.find({
                $or: [
                    { 'translations.uz.name': { $regex: search, $options: 'i' } },
                    { 'translations.ru.name': { $regex: search, $options: 'i' } },
                    { 'translations.en.name': { $regex: search, $options: 'i' } }
                ]
            });

        }
        return NextResponse.json({ eventsFinished }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ eventsFinished: null }, { status: 500 })
    }
}


