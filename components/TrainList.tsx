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

            parsedTimes.forEach((train: { stopTimeUpdate: { arrival: { time: string; }; }[]; }) => {
                // add delay to arrival time
                train.stopTimeUpdate[0].arrival.time = String(parseInt(train.stopTimeUpdate[0].arrival.time) + parseInt(train.stopTimeUpdate[0].arrival.delay * 10))

                if (train.stopTimeUpdate[0].arrival.delay > 0) {
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


    if (!timings)  return "No Legacy Trains Found :("

    //console.log(timings)

    return (
        <div className={'grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1'}>
            {timings.map((train) => {
                if (moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000).isBefore(moment())) {
                    return
                }
                if (train.vehicle.label != "2-door") {
                    return
                }

                if (String(train.trip.tripId).length < 5) {
                    return
                }

                console.log(train)

                let arrivalTime = moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000)

                if (train?.delayed && train.stopTimeUpdate[0].arrival.delay < 1) {
                    train.delayed = false
                }

                return (

                    <Card className="w-[300px] m-3 mr-3 rounded-xl " isPressable isHoverable key={train.trip.tripId}>
                        <CardBody className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-md">{bartStationIDs[String(train.stopTimeUpdate[0].stopId).toLowerCase()]}</p>

                                <p className="text-small text-default-500">
                                    <CountdownArrival arrivalTime={arrivalTime} />
                                    {train?.delayed && <span className="text-red-500"> +{parseInt(train.stopTimeUpdate[0].arrival.delay / 6).toFixed(0)} minutes late</span>}

                                </p>

                                <p className="text-small text-default-500">{moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000).fromNow()}</p>
                            </div>
                        </CardBody>
                    </Card>
                )

            })}
        </div>
    )
}