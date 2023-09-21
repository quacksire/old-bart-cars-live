import TrainList from "@/components/TrainList";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center">
			<h1 className="font-bold text-center">
				This list notes the next stop that a legacy train will make and its ETA.
			</h1>
			<TrainList />
		</section>
	);
}
