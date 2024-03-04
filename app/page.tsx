import TrainList from "@/components/TrainList";
import EolToast from "@/components/eoltoast";
import {Link} from "@nextui-org/link";
import {Card, CardFooter} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import Image from "next/image";

import { headers } from 'next/headers';
//`Effective ${new Date(Date.parse("2024-03-04T08:00:00.000Z")).toLocaleDateString()}, BART will remove all legacy trains from their fleet, ending the cars' 51 years of service. `

export default function Home() {
	return (
		<>
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">Farewell to a Legacy</h1>
				<p className="text-lg mb-6 text-center">
					After 51 years of service, the legacy BART cars have reached the end of their journey, effective <b> March 4th, 2024. </b>
					We bid them farewell and reminisce on the memories they&apos;ve carried over the decades.</p>
				<p className="text-lg text-center mb-6">
					Sadly, there will be no more rides on these historic cars. However, you can help preserve their
					legacy
					by donating to the Western Railway Museum.
					Your contribution will support the museum&apos;s efforts to exhibit and maintain these cherished
					pieces
					of transportation history.</p>
				<div className="flex justify-center">
					<Link isExternal href={"https://www.wrm.org/fundraising-campaigns/rapid-transit-history-center"}>
						<Card
							isPressable
							isBlurred
							isHoverable
							isFooterBlurred
							radius="lg"
							className="border-none"
						>
							<Image alt="BART car at the Western Railway Museum"
								   className="object-cover w-auto h-auto"
								   height={500}
								   src="/wrm-bart.jpeg"
								   width={500}
							/>
							<Button variant={'faded'}
									className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
								Donate Now
							</Button>
						</Card>

					</Link>
				</div>
				<p className="text-lg text-center font-bold mb-6 mt-3">
					There will be a final farewell event, in support of the Western Railway Museum, in the coming weeks.
				</p>
			</div>

			{/*

	<section className="flex flex-col items-center justify-center">
			<h1 className="font-bold text-center">
				This list notes the next stop that a legacy train will make and its ETA.
			</h1>
			<TrainList/>
			<EolToast/>
	</section>
	*/}
		</>

	)
		;
}
