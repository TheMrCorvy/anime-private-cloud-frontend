import { NavbarSection } from "@/components/layout/TopNavigation";
import SessionHandlerComponent from "@/components/layout/SessionHandlerComponent";
import SearchInput from "@/components/SearchInput";
import { WebRoutes } from "@/utils/routes";

export const navbarItems: NavbarSection[] = [
	{
		items: [
			{
				label: "Home",
				href: WebRoutes.home,
			},
		],
		justify: "start",
	},
	{
		items: [
			{
				label: "Buscar",
				href: WebRoutes.home,
				children: <SearchInput />,
			},
		],
		className: "flex",
		justify: "center",
	},
	{
		items: [
			{
				label: "Login",
				href: WebRoutes.login,
				children: <SessionHandlerComponent />,
			},
		],
		className: "flex",
		justify: "end",
	},
];

export const pendingActivationNavbar: NavbarSection[] = [
	{
		items: [
			{
				label: "Login",
				href: WebRoutes.login,
				children: <SessionHandlerComponent />,
			},
		],
		className: "flex",
		justify: "end",
	},
];

export const navbarItemsTest: NavbarSection[] = [
	{
		items: [
			{
				label: "Home",
				href: WebRoutes.home,
			},
		],
		justify: "start",
	},
	{
		items: [
			{
				label: "Buscar",
				href: WebRoutes.search,
			},
		],
		justify: "center",
	},
	{
		items: [
			{
				label: "Login",
				href: WebRoutes.login,
			},
		],
		justify: "end",
	},
];
