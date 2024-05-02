import connectMongoDB from "@/lib/mongodb";
import EventWait from "@/models/eventWaitModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { photo, place, date, uzName, ruName, enName, uzForm, ruForm, enForm, uzTarget, ruTarget, enTarget, uzResult, ruResult, enResult, partners } = await req.json();
    await connectMongoDB()

    try {
        await EventWait.create({
            photo,
            place,
            date,
            partners,
            translations: {
                uz: {
                    name: uzName,
                    form: uzForm,
                    target: uzTarget,
                    result: uzResult,
                },
                ru: {
                    name: ruName,
                    form: ruForm,
                    target: ruTarget,
                    result: ruResult,
                },
                en: {
                    name: enName,
                    form: enForm,
                    target: enTarget,
                    result: enResult,
                },
            }
        });

        return NextResponse.json({ message: "Created event wait succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {

    await connectMongoDB();
    try {
        let eventsWait = await EventWait.find({ status: true });

        return NextResponse.json({ eventsWait }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ eventsWait: null }, { status: 500 })
    }
}


