import {NextResponse} from "next/server";


async function GET() {
    const mtcFetch = await fetch("https://api.511.org/transit/tripupdates?api_key=a7869c71-f8f3-48af-b48b-544abe3c4486&agency=BA&format=json")
    const mtcJson = await mtcFetch.json()

    return NextResponse.json(mtcJson)


    //return NextResponse.redirect('/bart')
}