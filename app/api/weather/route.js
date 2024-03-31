import {NextRequest, NextResponse} from "next/server"

export async function GET(request) {
	const params = new URL(request.url).searchParams
	const address = params.get("address")
	let url =
		"https://api.openweathermap.org/data/2.5/weather?q=" + address + "&appid=" + "2d348ed82bb66578c7d2a97cc268f8d1"

	const res = await fetch(url)
	let data = await res.json()
	return NextResponse.json(data)
}
