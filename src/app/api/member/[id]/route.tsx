import connectMongoDB from "@/lib/mongodb";
import UsersLegal from "@/models/legalUserModel";
import UsersPhysical from "@/models/physicalUserModel";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: { params: any }) => {
    const isLegal = req.nextUrl.searchParams.get('legal');
    await connectMongoDB();
    const { id } = params;

    try {
        if (isLegal == 'true') {
            let membersLegal = await UsersLegal.findById(id);

            return NextResponse.json({ membersLegal }, { status: 200 });
        } else {
            let membersPhysical = await UsersPhysical.findById(id);
            return NextResponse.json({ membersPhysical }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ members: null }, { status: 500 });
    }
};
export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const {
        uzName,
        ruName,
        enName,
        uzAddress,
        ruAddress,
        enAddress,
        uzActivity,
        ruActivity,
        enActivity,
        uzDesc,
        ruDesc,
        enDesc,
        isLegal,
        photo,
        firstname,
        lastname,
        thirdname,
        scienceID,
        uzWorkAddress,
        ruWorkAddress,
        enWorkAddress,
        uzWorkPosition,
        ruWorkPosition,
        enWorkPosition,
    } = await req.json();

    await connectMongoDB()

    try {
        if (isLegal) {
            await UsersLegal.findByIdAndUpdate(id, {
                translations: {
                    uz: {
                        name: uzName,
                        address: uzAddress,
                        activity: uzActivity,
                        desc: uzDesc
                    },
                    ru: {
                        name: ruName,
                        address: ruAddress,
                        activity: ruActivity,
                        desc: ruDesc
                    },
                    en: {
                        name: enName,
                        address: enAddress,
                        activity: enActivity,
                        desc: enDesc
                    },
                }
            });
        } else {
            await UsersPhysical.findByIdAndUpdate(id, {
                photo,
                firstname,
                lastname,
                thirdname,
                scienceID,
                translations: {
                    uz: {
                        workAddress: uzWorkAddress,
                        workPosition: uzWorkPosition,
                        activity: uzActivity,
                        desc: uzDesc
                    },
                    ru: {
                        workAddress: ruWorkAddress,
                        workPosition: ruWorkPosition,
                        activity: ruActivity,
                        desc: ruDesc
                    },
                    en: {
                        workAddress: enWorkAddress,
                        workPosition: enWorkPosition,
                        activity: enActivity,
                        desc: enDesc
                    },
                }
            });
        }

        return NextResponse.json({ message: "Updated member succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const isLegal = req.nextUrl.searchParams.get('legal');
    const { id } = params;
    await connectMongoDB();
    try {
        if (isLegal == true) {
            await UsersLegal.findByIdAndDelete(id);
            return NextResponse.json({ message: "Member deleted" }, { status: 200 })
        } else {
            await UsersPhysical.findByIdAndDelete(id);
            return NextResponse.json({ message: "Member deleted" }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }

}



