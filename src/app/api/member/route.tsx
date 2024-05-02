import connectMongoDB from "@/lib/mongodb";
import UsersLegal from "@/models/legalUserModel";
import UsersPhysical from "@/models/physicalUserModel";
import { NextRequest, NextResponse } from "next/server";

// POST
export const POST = async (req: any) => {
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
        uzWorkPostion,
        ruWorkPostion,
        enWorkPostion,
    } = await req.json();
    

    await connectMongoDB()

    try {
        if (isLegal) {
            await UsersLegal.create({
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
            return NextResponse.json({ message: "Created member succesfully" }, { status: 201 })
        } else {
            await UsersPhysical.create({
                photo,
                firstname,
                lastname,
                thirdname,
                scienceID,
                translations: {
                    uz: {
                        workAddress: uzWorkAddress,
                        workPosition: uzWorkPostion,
                        activity: uzActivity,
                        desc: uzDesc
                    },
                    ru: {
                        workAddress: ruWorkAddress,
                        workPosition: ruWorkPostion,
                        activity: ruActivity,
                        desc: ruDesc
                    },
                    en: {
                        workAddress: enWorkAddress,
                        workPosition: enWorkPostion,
                        activity: enActivity,
                        desc: enDesc
                    },
                }
            });
            return NextResponse.json({ message: "Created member succesfully" }, { status: 201 })
        }
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


// GET ALL
export const GET = async (req: NextRequest) => {
    const isLegal = req.nextUrl.searchParams.get('legal');

    await connectMongoDB();
    try {

        let membersLegal = await UsersLegal.find({});
        let membersPhysical = await UsersPhysical.find({});
        return NextResponse.json({ membersLegal, membersPhysical, isLegal }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ members: null }, { status: 500 })
    }
}


