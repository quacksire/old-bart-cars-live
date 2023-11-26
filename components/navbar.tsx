import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";

import { Logo } from "@/components/icons";

export const Navbar = () => {

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
							<Logo />
						<p className="font-bold text-inherit">Old Bart Cars LIVE</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="end">
				<ThemeSwitch />
			</NavbarContent>
		</NextUINavbar>
	);
};
