'use client'
import { TableRow, Table, TableBody, TableHeader, TableCell, TableColumn } from "@nextui-org/table"
import { Card, CardBody, CardFooter } from "@nextui-org/card"
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal"
import { Snippet } from "@nextui-org/snippet"
import { bartStationIDs } from "@/config/lists"
import moment from "moment"
import CountdownArrival from "@/components/CountdownArrival"

export default function TrainListItem({ train }: { train: any  }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
    let lastStop;


    switch (String(train.stopTimeUpdate[train.stopTimeUpdate.length - 1].stopId)) {
        case "BALB":
            lastStop = "Daly City"
            break;
        case "DELN":
            lastStop = "Richmond"
            break;
        case "WDUB":
            lastStop = "Dublin/Pleasanton"
            break;
        case "MLPT":
            lastStop = "Berryessa/North San Jose"
            break;
        case "SFIA":
            lastStop = "Millbrae"
            break;

        // Due to Glen Park <-> Colma being closed 12/2/23 - 12/3/23
        case "EMBR":
            lastStop = "Montgomery St"
            break;
        case "SSAN":
            lastStop = "Colma"
            break;


        default:
            // @ts-ignore
            lastStop = bartStationIDs[String(train.stopTimeUpdate[train.stopTimeUpdate.length - 1].stopId).toLowerCase()]
            break;

    }

    console.log(lastStop)

    return (
        <>
            {/*@ts-ignore*/}
            <Card className="w-[300px] m-3 mr-3 rounded-xl " isPressable isHoverable key={train.trip.tripId} onPress={onOpen} shadow={"md"}>
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
                            Going to {lastStop}
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
                                        {train.stopTimeUpdate.map((stopTime: any) => {
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
}