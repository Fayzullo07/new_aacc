import connectMongoDB from "@/lib/mongodb";
import Initiators from "@/models/initiatorModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { photo, firstname, lastname, birthday, birthplace, addressResidential, workplace } = await req.json();
    await connectMongoDB()

    try {
        await Initiators.create({
            photo,
            firstname,
            lastname,
            birthday,
            birthplace,
            addressResidential,
            workplace
        });

        return NextResponse.json({ message: "Created Initiators succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    const search = req.nextUrl.searchParams.get('search');
    await connectMongoDB();
    try {
        let initiators;

        // Agar `search` parametri bo'sh bo'lsa, barcha ma'lumotlarni qidirish
        if (!search) {
            initiators = await Initiators.find({});
        } else {
            // Agar `search` parametri bo'sh bo'lmasa, MongoDB'dan ma'lumotlarni qidirish
            initiators = await Initiators.find({
                $or: [
                    { 'firstname': { $regex: search, $options: 'i' } },
                    { 'lastname': { $regex: search, $options: 'i' } },
                ]
            });

        }

        return NextResponse.json({ initiators }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ initiators: null }, { status: 500 })
    }
}


