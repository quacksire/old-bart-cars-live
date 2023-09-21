import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
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
	]

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
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
						</main>
						{/* I want two links to be one above the other enough but spaced a lil so they don't overlap */}
						<footer className="absolute bottom-0 w-full flex flex-col justify-center items-center gap-2">
							<Link
								href="https://github.com/Quacksire/old-bart-cars-live"
								target="_blank"
								size="mini"
								color="foreground"
								underline
							>
								Source
							</Link>
							<Link
								href="https://quacksire.dev"
								size="mini"
								color="foreground"
								target="_blank"
								underline
							>
								Made by Quacksire
							</Link>

						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
