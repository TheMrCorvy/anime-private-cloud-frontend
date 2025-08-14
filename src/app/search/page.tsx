import { Page } from "@/types/nextjs";

import { redirect } from "next/navigation";
import { StrapiService } from "@/services/StrapiService";
import { CookiesList, getCookie, JwtCookie, UserCookie } from "@/utils/cookies";
import { WebRoutes } from "@/utils/routes";
import DirectoryListItem from "@/components/layout/DirectoryListItem";
import SearchInput from "@/components/SearchInput";
import { sortDirectories } from "@/utils/sort";

export default async function Search({ searchParams }: Page) {
    const jwt = (await getCookie(CookiesList.JWT)) as JwtCookie | null;
    const user = (await getCookie(CookiesList.USER)) as UserCookie | null;

    if (!jwt || !user) {
        return redirect(WebRoutes.login);
    }

    const service = StrapiService();
    const result = await service.getDirectories({
        jwt: jwt.jwt,
        queryParams: {
            filters: {
                display_name: {
                    $contains: searchParams.query as string,
                },
            },
        },
    });

    return (
        <section>
            <div className="mb-5 xs:block md:hidden">
                <SearchInput defaultValue={searchParams.query as string} />
            </div>
            {sortDirectories(result.data).map((directory, i) => (
                <DirectoryListItem
                    key={`search-result-page-${directory.id}-${i}`}
                    displayName={directory.display_name}
                    directoryId={directory.documentId}
                    isAdult={directory.adult}
                />
            ))}
        </section>
    );
}
