import { cookies } from "next/headers";
import { MeResponse } from "@/types/StrapiSDK";

export enum CookiesList {
    USER = "user",
    JWT = "jwt",
}

export interface JwtCookie {
    jwt: string;
}

export interface UserCookie extends MeResponse {}

export type CookieFound = JwtCookie | UserCookie | null;

export const getCookie = async (
    cookieName: CookiesList
): Promise<CookieFound> => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(cookieName)?.value;
    if (!cookie) return null;

    return JSON.parse(cookie).cookieObject;
};
