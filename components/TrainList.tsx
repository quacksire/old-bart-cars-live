'use client'
import {useEffect, useState} from "react";
import moment from "moment";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {bartStationIDs} from "@/config/lists";
import CountdownArrival from "@/components/CountdownArrival";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@nextui-org/modal";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Snippet} from "@nextui-org/snippet";

type StopTime = {
    departure: {
        delay: number;
        time: string;
    };
    stopId: string;
    stopSequence: number;
};
type Train = {
    stopTimeUpdate: StopTime[];
    trip: { tripId: number };
    delayed?: boolean;
};

export default function TrainList() {
    const [timings, setTimings] = useState([])
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
        <div className={'grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1'}>
            {timings.map((train: Train) => {
                // @ts-ignore

                console.log(train)

                let dep = moment(parseInt(train.stopTimeUpdate[0].departure.time) * 1000);
                let arvl;
                let diffInSeconds;

                if (train.stopTimeUpdate[0]?.arrival?.time) {
                    arvl = moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000);
                    diffInSeconds = dep.diff(arvl, 'minute'); // Difference in seconds
                } else {
                    diffInSeconds = null;  // or 'undefined', or 'N/A', or any other value you'd see fit
                }

                console.log(`Difference in minutes: ${diffInSeconds}`);


                // @ts-ignore
                if (moment(parseInt(train.stopTimeUpdate[0].arrival.time) * 1000).isBefore(moment())) {
                    return
                }




                console.log(train)

                // @ts-ignore
                let arrivalTime = moment(parseInt(train.stopTimeUpdate[0].departure.time) * 1000)

                // @ts-ignore
                if (train?.delayed && train.stopTimeUpdate[0].departure.delay < 1) {
                    // @ts-ignore
                    train.delayed = false
                }

                // @ts-ignore
                let lastStop = bartStationIDs[String(train.stopTimeUpdate[train.stopTimeUpdate.length - 1].stopId).toLowerCase()]

                //
                return (
                    <>
                    {/*@ts-ignore*/}
                    <Card className="w-[300px] m-3 mr-3 rounded-xl " isPressable isHoverable key={train.trip.tripId} onPress={onOpen}>
                        <CardBody className="flex gap-3">
                            <div className="flex flex-col">
                                {/*@ts-ignore*/}
                                <p className="text-md">{bartStationIDs[String(train.stopTimeUpdate[0].stopId).toLowerCase()]}</p>

                                <p className="text-small text-default-500">
                                    <CountdownArrival arrivalTime={arrivalTime} />
                                    {/*@ts-ignore*/}
                                    {train?.delayed && <span className="text-red-500"> +{parseInt(train.stopTimeUpdate[0].departure.delay / 6).toFixed(0)} minutes late</span>}

                                </p>
                                {/*@ts-ignore*/}
                                <p className="text-small text-default-500">{moment(parseInt(train.stopTimeUpdate[0].departure.time) * 1000).fromNow()}</p>

                            </div>
                        </CardBody>
                        <CardFooter className="text-small text-default-500 text-center w-max">

                            {!lastStop && (
                                <>
                                    Departing from this station
                                </>
                            )}
                            {lastStop && (
                                <>
                                    {/*@ts-ignore*/}
                                    Going to {bartStationIDs[String(train.stopTimeUpdate[train.stopTimeUpdate.length - 1].stopId).toLowerCase()]}
                                </>
                            )}

                        </CardFooter>

                    </Card>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} key={`${train.trip.tripId}-m`} scrollBehavior={'inside'} className={""}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Trip #{train.trip.tripId}</ModalHeader>
                                        <ModalBody>
                                            <Table hideHeader isCompact removeWrapper fullWidth>
                                                <TableHeader>
                                                    <TableColumn width={0.5}>Stop Sequence</TableColumn>
                                                    <TableColumn>T</TableColumn>
                                                    <TableColumn>Station</TableColumn>
                                                </TableHeader>
                                                <TableBody>
                                                    {train.stopTimeUpdate.map((stopTime: {
                                                        departure: { delay: number; time: string; };
                                                        stopId: string;
                                                        stopSequence: number;
                                                    }) => {
                                                        let delayed = false
                                                        if (stopTime.departure.delay > 0) {
                                                            // @ts-ignore
                                                            delayed = true
                                                        }

                                                        return (
                                                            <TableRow key={stopTime.stopId} className={'text-xs m-0'}>
                                                                <TableCell className={'text-tiny text-foreground-400 '}>{stopTime.stopSequence} </TableCell>
                                                                <TableCell>
                                                                            <Snippet symbol="" variant="flat" color={delayed ? "danger" : "default"} hideCopyButton>{moment(parseInt(stopTime.departure.time) * 1000).toDate().toLocaleTimeString()}</Snippet>

                                                                </TableCell>
                                                                {/* @ts-ignore */}
                                                                <TableCell>{bartStationIDs[String(stopTime.stopId).toLowerCase()]}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </ModalBody>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                )

            })}
        </div>
    )
}