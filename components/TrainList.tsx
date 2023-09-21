'use client'
import {useEffect, useState} from "react";
import moment from "moment";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {bartStationIDs} from "@/config/lists";
import CountdownArrival from "@/components/CountdownArrival";

export default function TrainList() {
    const [timings, setTimings] = useState([])

    useEffect(() => {
        async function getTimings() {
            const times = await fetch('/bart', {
                next: {revalidate: 60}
            })
            const parsedTimes = await times.json()

            parsedTimes.forEach((train: { stopTimeUpdate: { arrival: {
                        delay?: number;
                        delayed?: boolean;
                        time: string; }; }[]; }) => {
                // add delay to arrival time
                // @ts-ignore
                train.stopTimeUpdate[0].arrival.time = String(parseInt(train.stopTimeUpdate[0].arrival.time) + train.stopTimeUpdate[0].arrival.delay * 10)

                // @ts-ignore
                if (train.stopTimeUpdate[0].arrival.delay > 0) {
                    // @ts-ignore
                    train.delayed = true
                }
            })

            // sort moment(parseInt(train.stopTimeUpdate[i].arrival.time) * 1000) to closest to now
            parsedTimes.sort((a: { stopTimeUpdate: { arrival: { time: string; }; }[]; }, b: { stopTimeUpdate: { arrival: { time: string; }; }[]; }) => {
                return moment(parseInt(a.stopTimeUpdate[0].arrival.time) * 1000).diff(moment(parseInt(b.stopTimeUpdate[0].arrival.time) * 1000))
            })

            // remove trains

            setTimings(parsedTimes)
        }
        getTimings()
        setInterval(getTimings, 60000) // every minute
    }, []);


    if (!timings)  return <>{"No Legacy Trains Found :("}</>

    //console.log(timings)

    return (
        <div className={'grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1'}>
            {timings.map((train) => {
                // @ts-ignore
                if (moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000).isBefore(moment())) {
                    return
                }
                // @ts-ignore
                if (train.vehicle.label != "2-door") {
                    return
                }

                // @ts-ignore
                if (String(train.trip.tripId).length < 5) {
                    return
                }

                console.log(train)

                // @ts-ignore
                let arrivalTime = moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000)

                // @ts-ignore
                if (train?.delayed && train.stopTimeUpdate[0].arrival.delay < 1) {
                    // @ts-ignore
                    train.delayed = false
                }

                // @ts-ignore
                //
                return (
                    <>
                    {/*@ts-ignore*/}
                    <Card className="w-[300px] m-3 mr-3 rounded-xl " isPressable isHoverable key={train.trip.tripId}>
                        <CardBody className="flex gap-3">
                            <div className="flex flex-col">
                                {/*@ts-ignore*/}
                                <p className="text-md">{bartStationIDs[String(train.stopTimeUpdate[0].stopId).toLowerCase()]}</p>

                                <p className="text-small text-default-500">
                                    <CountdownArrival arrivalTime={arrivalTime} />
                                    {/*@ts-ignore*/}
                                    {train?.delayed && <span className="text-red-500"> +{parseInt(train.stopTimeUpdate[0].arrival.delay / 6).toFixed(0)} minutes late</span>}

                                </p>
                                {/*@ts-ignore*/}
                                <p className="text-small text-default-500">{moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000).fromNow()}</p>
                            </div>
                        </CardBody>
                    </Card>
                    </>
                )

            })}
        </div>
    )
}