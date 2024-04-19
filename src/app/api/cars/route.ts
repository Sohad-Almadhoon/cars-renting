import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import Car from "./model";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const cars = await Car.find().select('+daysLeft').sort({ createdAt: -1 });
        return NextResponse.json({ length: cars.length, data: cars });
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { driverName, carNumber, carColor, establishedDateCar, carType } = await req.json();
        await connectMongoDB();
        await Car.create({ driverName, carNumber, carColor, establishedDateCar, carType });
        return NextResponse.json(({ message: "Car doc is created!" }), { status: 201 });
    } catch (error) {
        console.error("Error creating car:", error);
        return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
    }
}
