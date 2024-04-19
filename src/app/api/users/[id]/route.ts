import connectMongoDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "../model";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await connectMongoDB();
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching User:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const { username , email } = await req.json();
        await connectMongoDB();
        await User.findByIdAndUpdate(id, { username, email });
        return NextResponse.json({ message: "User is updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating User:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await connectMongoDB();
        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: "User is deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting User:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
