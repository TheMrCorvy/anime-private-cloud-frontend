import { FC } from "react";
import Link from "next/link";

import { WebRoutes } from "@/utils/routes";

import { Card, CardHeader } from "@nextui-org/react";

import Video from "@/components/icons/Video";

interface Props {
	episodeId: string;
	displayName: string;
}

const AnimeEpisodeListItem: FC<Props> = ({ episodeId, displayName }) => (
	<Link href={WebRoutes.animeEpisode + episodeId}>
		<Card
			className="py-4 bg-cyan-800 hover:scale-105 w-full"
			isPressable
			data-testid="test-anime-episode-list-item"
		>
			<CardHeader className="py-2 px-4 flex-row items-start">
				<h4 className="font-bold text-large">{displayName}</h4>
				<Video size={24} color="currentColor" className="ml-7 mt-1" />
			</CardHeader>
		</Card>
	</Link>
);

export default AnimeEpisodeListItem;
