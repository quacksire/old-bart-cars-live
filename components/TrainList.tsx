'use client'
import {useEffect, useState} from "react";
import moment from "moment";
import TrainListItem from "@/components/TrainListItem";
import {Button} from "@nextui-org/button";
import {toast} from "sonner";


export default function TrainList() {
    const [timings, setTimings] = useState([])

    useEffect(() => {
        async function getTimings() {
            const times = await fetch('/bart', {
                next: {revalidate: 60}
            })
            let parsedTimes = await times.json()

            parsedTimes = parsedTimes.filter((train: { trip: { tripId: string}, vehicle: {label: string}}) => {
                if ((String(train.trip.tripId).length > 5) && train.vehicle.label == "2-door") return true
                return false
            })

            parsedTimes.forEach((train: {
                vehicle: any;
                stopTimeUpdate: any[]; delayed: boolean; }, i: number) => {
                // add delay to arrival time
                // @ts-ignore
                train.stopTimeUpdate[0].departure.time = String(parseInt(train.stopTimeUpdate[0].departure.time) + train.stopTimeUpdate[0].departure.delay * 10)

                // @ts-ignore
                if (train.stopTimeUpdate[0].departure.delay > 0) {
                    // @ts-ignore
                    train.delayed = true
                }
            })

            // sort moment(parseInt(train.stopTimeUpdate[i].arrival.time) * 1000) to closest to now
            parsedTimes.sort((a: { stopTimeUpdate: { departure: { time: string; }; }[]; }, b: { stopTimeUpdate: { departure: { time: string; }; }[]; }) => {
                return moment(parseInt(a.stopTimeUpdate[0].departure.time) * 1000).diff(moment(parseInt(b.stopTimeUpdate[0].departure.time) * 1000))
            })

            // remove trains

            setTimings(parsedTimes)
        }
        getTimings()
        setInterval(getTimings, 10000) // every 10 seconds
    }, []);


    if (!timings)  return <>{"No Legacy Trains Found :("}</>

    //console.log(timings)

    return (
        <>
            <div className={'grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1'}>
                {/* @ts-ignore */}
                {timings.map((train: any) => <TrainListItem train={train} key={train.trip.tripId}/>)}
            </div>
            <Button onPress={() => {
                toast('This app is no longer maintained. Please visit the new version at https://legacy-train-tracker.vercel.app/')
            }}>toast</Button>

        </>

    )
}
