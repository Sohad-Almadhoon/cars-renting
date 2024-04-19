import connectMongoDB from "@/lib/db";
import Car from "../model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await connectMongoDB();
        const car = await Car.findById(id);
        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }
        return NextResponse.json({ car }, { status: 200 });
    } catch (error) {
        console.error("Error fetching car:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const { driverName, carNumber, carColor, establishedDateCar, carType } = await req.json();
        await connectMongoDB();
        await Car.findByIdAndUpdate(id, { driverName, carNumber, carColor, establishedDateCar, carType });
        return NextResponse.json({ message: "Car is updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating car:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await connectMongoDB();
        await Car.findByIdAndDelete(id);
        return NextResponse.json({ message: "Car is deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting car:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
