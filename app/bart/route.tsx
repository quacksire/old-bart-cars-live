import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import {NextResponse} from "next/server";

// fore dynamic
export const dynamic = 'force-dynamic'
export const runtime = 'edge';
export async function GET() {

    try {
        const response = await fetch("https://api.bart.gov/gtfsrt/tripupdate.aspx", {});
        if (!response.ok) {
            const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
            return NextResponse.error();
        }
        const buffer = await response.arrayBuffer();
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            new Uint8Array(buffer)
        );
        // @ts-ignore
        let tripUpdates = [];
        // @ts-ignore
        feed.entity.forEach((entity) => {
            tripUpdates.push(entity.tripUpdate);
        });

        // @ts-ignore
        return NextResponse.json(tripUpdates)
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }


}