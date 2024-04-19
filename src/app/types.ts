export type FormDataTypes = {
    daysLeft: number;
    _id: string;
    driverName: string,
    carNumber: string,
    carColor: string,
    establishedDateCar: string,
    carType: string,
    createdAt:string
}
export type UserDataProps = {
    _id: string;
    username: string;
    email: string
}
export type loginDataProps = {
    email: string;
}
export interface SessionData {
    email?: string;
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    username?: string;
}

