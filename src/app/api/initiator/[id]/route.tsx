import connectMongoDB from "@/lib/mongodb";
import Initiators from "@/models/initiatorModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const initiators = await Initiators.findById(id);
        return NextResponse.json({ initiators }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ initiators: null }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { photo, firstname, lastname, birthday, birthplace, addressResidential, workplace } = await req.json();
    await connectMongoDB()

    try {
        await Initiators.findByIdAndUpdate(id, {
            photo,
            firstname,
            lastname,
            birthday,
            birthplace,
            addressResidential,
            workplace
        });

        return NextResponse.json({ message: "Updated Initiator succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await Initiators.findByIdAndDelete(id);

    return NextResponse.json({ message: "Initiator deleted" }, { status: 200 })
}



