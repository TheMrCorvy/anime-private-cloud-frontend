import DirectoriesSidebar from "@/components/layout/DirectoriesSidebar";
import DirectoryListItem from "@/components/layout/DirectoryListItem";
import MainContainer from "@/components/layout/MainContainer";
import TopNavigation from "@/components/layout/TopNavigation";
import { navbarItems } from "@/mocks/topNavigationItems";
import { StrapiService } from "@/services/StrapiService";
import { Directory } from "@/types/StrapiSDK";
import { CookiesList, getCookie, JwtCookie } from "@/utils/cookies";
import { WebRoutes } from "@/utils/routes";

import { Fragment } from "react";

interface DirectoryLink {
	label: string;
	url: string;
}

interface ObtainDirectories {
	sidebar: DirectoryLink[];
	directories: Directory[];
}

export default async function Home() {
	const obtainDirectories = async (): Promise<ObtainDirectories> => {
		"use server";

		const jwt = (await getCookie(CookiesList.JWT)) as JwtCookie | null;

		if (jwt && typeof jwt.jwt === "string") {
			const service = StrapiService();
			const directories = await service.getDirectories({
				jwt: jwt.jwt,
				queryParams: {
					filters: {
						parent_directory: {
							$null: true,
						},
						adult: {
							$eq: false,
						},
					},
				},
			});

			return {
				sidebar: directories.data.map((dir) => ({
					url: WebRoutes.directory + dir.documentId,
					label: dir.display_name,
				})),
				directories: directories.data,
			};
		}

		return {
			sidebar: [],
			directories: [],
		};
	};

	const dir = await obtainDirectories();

	return (
		<main className="absolute flex flex-col justify-center min-h-[100%] w-full bg-slate-900 pt-16">
			<TopNavigation
				navbarSections={navbarItems}
				position="static"
				className="h-16 bg-slate-800 text-white fixed top-0 right-0"
			/>
			<MainContainer>
				<Fragment>
					<DirectoriesSidebar directories={dir.sidebar} />
					<section className="felx flex-col w-full gap-6 h-auto">
						{dir.directories.map((directory, i) => (
							<DirectoryListItem
								key={`main-list-item-${directory.documentId}-${i}`}
								displayName={directory.display_name}
								directoryId={directory.documentId}
								isAdult={directory.adult}
							/>
						))}
					</section>
				</Fragment>
			</MainContainer>
		</main>
	);
}
