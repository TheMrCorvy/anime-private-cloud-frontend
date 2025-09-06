import { mockMeResponse, mockUserToken } from "@/mocks/mockedResponses";
import {
    FeatureNames,
    isFeatureFlagEnabled,
} from "@/services/featureFlagService";
import { CookiesList } from "@/utils/cookies";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const host = req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const redirectUrl = `${protocol}://${host}/`;

    const response = NextResponse.redirect(redirectUrl);

    if (isFeatureFlagEnabled(FeatureNames.ENABLE_USERS_LOGIN)) {
        return response;
    }

    // In API routes, we can set cookies directly
    const cookieStore = await cookies();

    // Set User cookie
    cookieStore.set(
        CookiesList.USER,
        JSON.stringify({ cookieObject: mockMeResponse }),
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        }
    );

    // Set JWT cookie
    cookieStore.set(
        CookiesList.JWT,
        JSON.stringify({ cookieObject: { jwt: mockUserToken } }),
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        }
    );

    return response;
}
