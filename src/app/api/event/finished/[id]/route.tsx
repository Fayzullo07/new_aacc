import connectMongoDB from "@/lib/mongodb";
import EventFinished from "@/models/eventFinishiedModel";
import EventWait from "@/models/eventWaitModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const eventsFinished = await EventFinished.findById(id);
        return NextResponse.json({ eventsFinished }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ eventsFinished: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { photos, place, date, uzName, ruName, enName, uzForm, ruForm, enForm, uzResult, ruResult, enResult, partners } = await req.json();
    await connectMongoDB()

    try {
        await EventFinished.findByIdAndUpdate(id, {
            photos,
            place,
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

        return NextResponse.json({ message: "Updated event finished succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
    const idWait = req.nextUrl.searchParams.get('idWait');
    const { id } = params;
    
    await connectMongoDB();
    await EventWait.findByIdAndUpdate(idWait, {
        status: true
    });
    await EventFinished.findByIdAndDelete(id);

    return NextResponse.json({ message: "Event finished deleted" }, { status: 200 })
}



