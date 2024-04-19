import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import User from "./model";

export async function GET() {
    try {
        await connectMongoDB();
        const users = await User.find().sort({ createdAt: -1 });
        return NextResponse.json({ length: users.length, data: users });
    } catch (error) {
        console.error("Error fetching Users:", error);
        return NextResponse.json({ error: "Failed to fetch Users" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { username , email } = await req.json();
        await connectMongoDB();
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "المستخدم موجود حاليا" }, { status: 409 });
        }
        await User.create({ username, email });
        return NextResponse.json(({ message: "User doc is created!" }), { status: 201 });
    } catch (error) {
        console.error("Error creating User:", error);
        return NextResponse.json({ message: "Failed to create User" }, { status: 500 });
    }
}
