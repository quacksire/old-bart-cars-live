import TrainList from "@/components/TrainList";
import EolToast from "@/components/eoltoast";
import {Link} from "@nextui-org/link";
import {Card, CardFooter} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import Image from "next/image";

export default function Home() {
	return (
		<>
		{/*
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold text-center mb-8">Farewell to a Legacy</h1>
			<p className="text-lg mb-6">
				After 51 years of service, the legacy BART cars have reached the end of their journey.
				We bid them farewell and reminisce on the memories they&apos;ve carried over the decades.</p>
			<p className="text-lg mb-6">
				Sadly, there will be no more rides on these historic cars. However, you can help preserve their legacy
				by donating to the Western Railway Museum.
				Your contribution will support the museum&apos;s efforts to exhibit and maintain these cherished pieces
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
						<Image alt="Woman listing to music"
							   className="object-cover"
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
		</div>
		*/}

	<section className="flex flex-col items-center justify-center">
			<h1 className="font-bold text-center">
				This list notes the next stop that a legacy train will make and its ETA.
			</h1>
			<TrainList/>
			<EolToast/>
	</section>
		</>
)
	;
}
