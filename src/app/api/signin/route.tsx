import connectMongoDB from '@/lib/mongodb';
import Admin from '@/models/adminModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
    const { username, password } = await req.json();
    await connectMongoDB()
    if (!username || !password) {
        return NextResponse.json({ error: "Please add username or password" });
    }
    try {
        const savedUser = await Admin.findOne({ username });

        if (savedUser) {
            return NextResponse.json({ error: "This username already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({ username, password: hashedPassword });
        return NextResponse.json({ message: "Registered succesfully" }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ data: error }, { status: 500 })
    }
}