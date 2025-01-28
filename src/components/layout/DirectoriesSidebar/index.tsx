import { FC, Fragment } from "react";

import { Divider } from "@nextui-org/react";
import MaxCharLink from "@/components/MaxCharLink";

interface DirectoryLink {
	label: string;
	url: string;
}

interface Props {
	directories: DirectoryLink[];
}

const DirectoriesSidebar: FC<Props> = ({ directories }) => {
	return (
		<aside
			className="w-[15rem] relative scrollbar-thumb-blue-600 scrollbar-track-blue-500"
			data-testid="directories-sidebar"
		>
			<div className="scrollbar-none rounded-md h-auto text-center bg-blue-500 p-2 sticky top-20 right-0 max-h-[75vh] overflow-y-scroll">
				<h3 className="text-xl mt-2 text-white">Animes Disponibles</h3>
				<Divider className="my-3" />
				<ul className="mb-3">
					{directories.map((dir, i) => (
						<Fragment key={`sidebar-${dir.url}-${i}`}>
							<MaxCharLink
								url={dir.url}
								label={dir.label}
								popoverPlacement="right"
								maxLength={28}
								className="text-white text-sm capitalize"
							/>
							{i !== directories.length - 1 && (
								<Divider className="my-1" />
							)}
						</Fragment>
					))}
				</ul>
			</div>
		</aside>
	);
};

export default DirectoriesSidebar;
