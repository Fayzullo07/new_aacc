import connectMongoDB from "@/lib/mongodb";
import EventWait from "@/models/eventWaitModel";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const eventsWait = await EventWait.findById(id);
        return NextResponse.json({ eventsWait }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ eventsWait: null }, { status: 500 });
    }
};

export const PATCH = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { name, phone } = await req.json();
    await connectMongoDB()

    try {
        const newUser = { name, phone };
        await EventWait.findByIdAndUpdate(id, {
            $push: { users: newUser },
        });

        return NextResponse.json({ message: "Updated event wait succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { photo, place, date, uzName, ruName, enName, uzForm, ruForm, enForm, uzTarget, ruTarget, enTarget, uzResult, ruResult, enResult, partners } = await req.json();
    await connectMongoDB()

    try {
        await EventWait.findByIdAndUpdate(id, {
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


        return NextResponse.json({ message: "Updated event wait succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await EventWait.findByIdAndDelete(id);

    return NextResponse.json({ message: "Event wait deleted" }, { status: 200 })
}



