'use client'

import {useEffect, useState} from "react";
import moment, {Moment} from "moment";

export default function CountdownArrival({arrivalTime} :{ arrivalTime : Moment}) {
    const [time, setTime] = useState("00:00")
    useEffect(() => {
        function timeSet() {
            const then = moment(arrivalTime)
            const now = moment();
            // @ts-ignore
            const countdown = moment(then - now);
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');


            // check if hours are negitive and don't change the time if so
            if (String(time).split(':')[0].includes('-') || hours.includes('-')) return null

            setTime(`${parseInt(hours) - 16}:${minutes}:${seconds}`)
        }
        timeSet()

        setInterval(timeSet, 1000)

    });

    //if (String(time).split(':')[0].includes('-')) return null

    if (moment(arrivalTime).isBefore(moment())) {
        return <>Arrived</>
    }


    return <>{time}</>



}