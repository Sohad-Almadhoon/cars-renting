import { SessionOptions } from "iron-session";

export const sessionOptions:SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "my-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
}