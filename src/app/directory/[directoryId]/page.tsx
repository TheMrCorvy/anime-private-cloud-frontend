import { notFound, redirect } from "next/navigation";

import { Page } from "@/types/nextjs";
import { StrapiService } from "@/services/StrapiService";
import { CookiesList, getCookie, JwtCookie, UserCookie } from "@/utils/cookies";
import { WebRoutes } from "@/utils/routes";
import { Directory, RoleTypes } from "@/types/StrapiSDK";

import { Link, Divider } from "@nextui-org/react";
import DirectoryListItem from "@/components/layout/DirectoryListItem";
import AnimeEpisodeListItem from "@/components/layout/AnimeEpisodeListItem";

export default async function Directories({ params }: Page) {
	const jwt = (await getCookie(CookiesList.JWT)) as JwtCookie | null;
	const user = (await getCookie(CookiesList.USER)) as UserCookie | null;

	if (!jwt || !user) {
		return redirect(WebRoutes.login);
	}

	const service = StrapiService();
	const directory = await service.getSingleDirectory({
		jwt: jwt.jwt,
		id: params.directoryId,
		queryParams: {
			populate: ["anime_episodes", "parent_directory", "sub_directories"],
		},
	});

	if ("error" in directory) {
		console.error(directory);
		return notFound();
	}

	const foundDirectory = directory.data as Directory;

	if (foundDirectory.adult && user.role.type === RoleTypes.ANIME_WATCHER) {
		return notFound();
	}

	return (
		<article className="flex flex-col">
			<section
				className={`flex flex-row w-full mb-5 ${foundDirectory.parent_directory ? "justify-between" : "relative"}`}
			>
				<Link
					href={WebRoutes.home}
					size="lg"
					color="foreground"
					underline="always"
					showAnchorIcon
				>
					Volver al Inicio
				</Link>
				<h1
					className={`text-xl font-medium capitalize ${foundDirectory.parent_directory ? "" : "absolute top-0 right-1/2"}`}
				>
					{foundDirectory.display_name}
				</h1>
				{foundDirectory.parent_directory &&
					foundDirectory.parent_directory && (
						<Link
							href={
								WebRoutes.directory +
								foundDirectory.parent_directory?.documentId
							}
							size="lg"
							color="foreground"
							underline="always"
							showAnchorIcon
						>
							Volver a la Carpeta Anterior
						</Link>
					)}
			</section>
			<Divider className="mb-8" />
			<section>
				{foundDirectory.sub_directories?.map((subDir, i) => (
					<DirectoryListItem
						key={"sub-directory-" + subDir.documentId + "-" + i}
						directoryId={subDir.documentId}
						displayName={subDir.display_name}
					/>
				))}
			</section>
			<section className="grid grid-cols-2 sm:grid-cols-4 gap-5 ">
				{foundDirectory.anime_episodes &&
					foundDirectory.anime_episodes.map((ep, i) => (
						<AnimeEpisodeListItem
							key={"anime-episode-" + ep.id + "-" + i}
							episodeId={ep.documentId}
							displayName={ep.display_name}
						/>
					))}
			</section>
		</article>
	);
}
