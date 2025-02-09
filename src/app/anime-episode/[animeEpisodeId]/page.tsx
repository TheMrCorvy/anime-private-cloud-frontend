import { notFound, redirect } from "next/navigation";

import { Page } from "@/types/nextjs";
import { StrapiService } from "@/services/StrapiService";
import { CookiesList, getCookie, JwtCookie, UserCookie } from "@/utils/cookies";
import { ApiRoutes, WebRoutes } from "@/utils/routes";
import { AnimeEpisode } from "@/types/StrapiSDK";

import { Link, Divider } from "@nextui-org/react";

export default async function AnimeEpisodes({ params }: Page) {
	const jwt = (await getCookie(CookiesList.JWT)) as JwtCookie | null;
	const user = (await getCookie(CookiesList.USER)) as UserCookie | null;

	if (!jwt || !user) {
		return redirect(WebRoutes.login);
	}

	const service = StrapiService();
	const animeEpisode = await service.getSingleAnimeEpisode({
		jwt: jwt.jwt,
		id: params.animeEpisodeId,
		queryParams: {
			populate: ["parent_directory"],
		},
	});

	if ("error" in animeEpisode) {
		console.error(animeEpisode);
		return notFound();
	}

	const foundAnimeEpisode = animeEpisode.data as AnimeEpisode;

	return (
		<article className="flex flex-col">
			<section className={`flex flex-row w-full mb-5 justify-between`}>
				<Link
					href={WebRoutes.home}
					size="lg"
					color="foreground"
					underline="always"
					showAnchorIcon
				>
					Volver al Inicio
				</Link>
				<h1 className={`text-xl font-medium capitalize`}>
					{foundAnimeEpisode.display_name}
				</h1>
				<Link
					href={
						WebRoutes.directory +
						foundAnimeEpisode.parent_directory?.documentId
					}
					size="lg"
					color="foreground"
					underline="always"
					showAnchorIcon
				>
					Volver a la Carpeta Anterior
				</Link>
			</section>
			<Divider className="mb-8" />
			<section>
				<video
					controls
					width="800"
					src={
						ApiRoutes.streamAnimeEpisode +
						foundAnimeEpisode.documentId
					}
					style={{ maxWidth: "100%" }}
				>
					Your browser does not support the video tag.
				</video>
			</section>
		</article>
	);
}
