'use client'
import {useEffect} from "react";
import { toast } from 'sonner';
export default function EolToast() {

    let date = new Date(Date.parse("1709539200")).toLocaleDateString()


    useEffect(() => {
        setTimeout(() => {
            toast.error(`Effective ${new Date(Date.parse("2024-03-04T08:00:00.000Z")).toLocaleDateString()}, BART will remove all legacy trains from their fleet, ending the cars' 51 years of service. `, {
                important: true,
                position: "bottom-right",
                // basically forever in seconds, 60 * 60 * 24 * 365 * 3 is too large for a number
                duration: 60 * 60 * 24 * 365 * 3,
                cancel: {
                    label: "Learn More",
                    onClick: () => {
                        window.open("https://ducks.win/2FLSIFj", "_blank")
                    }
                }
            })
        }, 500)
    }, []);

    return <></>
}
