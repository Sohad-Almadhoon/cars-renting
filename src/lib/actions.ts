"use server";
import { cookies } from "next/headers";
import { sessionOptions } from "./auth";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { SessionData } from "@/app/types";
import connectMongoDB from "./db";
import User from "@/app/api/users/model";

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = false;
    }

    return session;
}

export const login = async (email: string
) => {
    const session = await getSession();
    if (email === process.env.ADMIN_EMAIL) {
        session.isAdmin = true;
    }
    await connectMongoDB();
    const user = await User.findOne({ email });
    if (!user) {
        return { error: "المستخدم غير موجود"};
   }
    session.isLoggedIn = true;
    session.email = email;
    session.username = user.username;
    await session.save();
    redirect("/dashboard")
};
export async function logout() {
    const session = await getSession();
    session.destroy();
    redirect("/")
};