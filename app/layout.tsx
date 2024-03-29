import "@/styles/globals.css";
import {Metadata} from "next";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from '@/components/ui/toaster'
import {La_Belle_Aurore} from "next/dist/compiled/@next/font/dist/google";

let title = "Old Bart Cars Live",
	description = "Track all legacy BART cars supposedly still in service after their retirement."

export const metadata: Metadata = {
	title: title,
	description:description,
	openGraph: {
		title: title,
		description: description,
		url: "https://oldbartcars.live",
		// @ts-ignore
		type: "website",
		locale: "en_US",
		site_name: "Old Bart Cars Live",
	},
	twitter: {
		card: 'summary',
		title: title,
		description: description,
		siteId: '1467726470533754880',
		creator: '@duckdoquack',
	},
	icons: {
		icon: "/favicons/apple-touch-icon.png",
		shortcut: "/favicons/favicon-16x16.png",
		apple: "/favicons/apple-touch-icon.png",
	},
	category: 'technology',
	keywords: [
		"bart",
		"legacy",
		"trains",
		"legacy trains",
		"legacy bart trains",
		"legacy bart",
		"legacy bart trains live",
		"legacy bart live",
		"ride old bart cars",
		"ride old bart",
		"ride legacy bart",
		"ride legacy bart trains",
		"old bart train tracker",
		"old bart tracker",
		"legacy bart tracker",
		"legacy bart train tracker",
		"old bart train live",
		"old bart live",
		"legacy bart live",
		"legacy bart train live",
		"ride legacy bart cars",
		"ride legacy bart trains",
		"ride legacy bart",
		"where are the legacy bart trains",
		"where are they running",
		"where are the legacy bart trains running",
		"where are the legacy bart trains running today",
		"where are the legacy bart trains running right now",
		"where are the old bart trians running",
		"where are the old bart trains running today",
		"where are the old bart trains running right now",
		"bart history",
		"legacy trains history",
		"bart system",
		"legacy transit",
		"glimpse into the past",
		"nostalgic commute",
		"commute back in time",
		"heritage train fleet",
		"historical ride",
		"vintage transport",
		"timeless transit",
		"retro ride",
		"classic commute",
		"antique train",
		"heritage vehicle",
		"traditional transit",
		"famous legacy train",
		"veteran carriage",
		"historic railway",
		"old-fashioned journey",
		"nostalgia trip",
		"heritage rail",
		"bart's legacy",
		"iconic transit",
		"old-school travel",
		"legacy routes",
		"classic rail car",
		"commuter's throwback",
		"century-old train",
		"legacy lines",
		"traditional transport",
		"retro rail",
		"antique commute",
		"famous bart train",
		"veteran tram",
		"historic ride",
		"old-world"
	],
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
		userScalable: false,
		// Also supported by less commonly used
		// interactiveWidget: 'resizes-visual',
	}

};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
		<body
			className={clsx(
				"min-h-screen bg-background font-sans antialiased",
				fontSans.variable
			)}
		>

		<Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
			<div className="relative flex flex-col h-screen">
				<Navbar/>
				<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
					{children}
				</main>
				{/* I want two links to be one above the other enough but spaced a lil so they don't overlap */}
				<footer className="bottom-0 text-center m-5 text-default-500">
					{"Made with ❤️ by "}
					<Link
						href={"https://twitter.com/@duckdoquack"}
						className={'text-default-500'}
						target="_blank"
					>
						@duckdoquack
					</Link>
					<br/>
					<Link
						href="https://github.com/quacksire/old-bart-cars-live"
						target="_blank"
						size="sm"
						className={'m-2 text-default-500'}
						isExternal
					>
						Source
					</Link>
					<Link
						isExternal
						href="https://ko-fi.com/quacksire"
						target="_blank"
						size="sm"
						className={'m-2 text-default-500'}
					>
						Buy me a coffee ☕
					</Link>
				</footer>
			</div>
			<Toaster richColors  />
		</Providers>

		</body>
		<GoogleAnalytics gaId={"G-W42X0P8S0Y"} />


		</html>
	);
}
