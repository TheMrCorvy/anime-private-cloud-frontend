"use server";

import { cookies } from "next/headers";
import { CookiesList, UserCookie } from "@/utils/cookies";
import {
    FeatureNames,
    isFeatureFlagEnabled,
} from "@/services/featureFlagService";
import { StrapiService } from "@/services/StrapiService";
import { RoleTypes } from "@/types/StrapiSDK";
import { notFound, redirect } from "next/navigation";
import { WebRoutes } from "@/utils/routes";

export async function setAuthCookies(jwt: string, user: UserCookie) {
    const cookieStore = await cookies();

    cookieStore.set(
        CookiesList.JWT,
        JSON.stringify({ cookieObject: { jwt } }),
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        }
    );

    cookieStore.set(CookiesList.USER, JSON.stringify({ cookieObject: user }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function removeAuthCookies() {
    if (isFeatureFlagEnabled(FeatureNames.ENABLE_USERS_LOGIN)) {
        const cookieStore = await cookies();
        cookieStore.delete(CookiesList.USER);
        cookieStore.delete(CookiesList.JWT);
    }
}

export async function handleLogin(formData: FormData) {
    const service = StrapiService();

    const serverResponse = await service.login({
        identifier: formData.get("identifier") as string,
        password: formData.get("password") as string,
    });

    if (!serverResponse.ok || serverResponse.error) {
        console.error(serverResponse.error);
        console.log(serverResponse.error?.message);

        if (
            serverResponse.error?.name &&
            serverResponse.error?.name === "ValidationError"
        ) {
            return redirect(
                `${WebRoutes.login}?rejectionReason=${serverResponse.error?.message}`
            );
        } else {
            return notFound();
        }
    }

    const userWithRole = await service.me({
        jwt: serverResponse.jwt,
        queryParams: {
            populate: "role",
        },
    });

    await setAuthCookies(serverResponse.jwt, userWithRole);

    if (
        !("role" in userWithRole) ||
        (userWithRole.role.type !== RoleTypes.ADULT_ANIME_WATCHER &&
            userWithRole.role.type !== RoleTypes.ANIME_WATCHER &&
            userWithRole.role.type !== RoleTypes.ANIME_PAGE_ADMIN)
    ) {
        return redirect(WebRoutes.pendingUserActivation);
    }

    return redirect(WebRoutes.home);
}

export async function handleRegister(formData: FormData, tokenId: string) {
    const service = StrapiService();

    const serverResponse = await service.register({
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
    });

    if (!serverResponse.ok || serverResponse.error) {
        console.error(serverResponse.error);
        console.log(serverResponse.error?.message);

        if (
            serverResponse.error?.name &&
            serverResponse.error?.name === "ValidationError"
        ) {
            return redirect(
                `${WebRoutes.login}?rejectionReason=${serverResponse.error?.message}`
            );
        } else {
            return notFound();
        }
    }

    const userWithRole = await service.me({
        jwt: serverResponse.jwt,
        queryParams: {
            populate: "role",
        },
    });

    await setAuthCookies(serverResponse.jwt, userWithRole);

    await service.invalidateRegisterToken({
        tokenId: tokenId,
    });

    if (
        !("role" in userWithRole) ||
        (userWithRole.role.type !== RoleTypes.ADULT_ANIME_WATCHER &&
            userWithRole.role.type !== RoleTypes.ANIME_WATCHER &&
            userWithRole.role.type !== RoleTypes.ANIME_PAGE_ADMIN)
    ) {
        return redirect(WebRoutes.pendingUserActivation);
    }

    return redirect(WebRoutes.home);
}

export async function handleLogout() {
    await removeAuthCookies();
    redirect(WebRoutes.login);
}
