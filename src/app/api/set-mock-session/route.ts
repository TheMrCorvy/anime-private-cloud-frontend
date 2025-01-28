import { mockMeResponse, mockUserToken } from "@/mocks/mockedResponses";
import {
	FeatureNames,
	isFeatureFlagEnabled,
} from "@/services/featureFlagService";
import { CookiesList, setCookie } from "@/utils/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const response = NextResponse.redirect(req.headers.get("host") as string);

	if (isFeatureFlagEnabled(FeatureNames.ENABLE_USERS_LOGIN)) {
		return response;
	}

	setCookie(CookiesList.USER, mockMeResponse);
	setCookie(CookiesList.JWT, { jwt: mockUserToken });

	return response;
}
