import connectMongoDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Car from "../model";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const statistics = await Car.generateStatistics();
        return NextResponse.json({ statistics });
    } catch (error) {
        console.error("Error fetching cars statistics:", error);
        return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
    }
}

