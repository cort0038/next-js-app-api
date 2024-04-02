import {NextResponse} from "next/server"

export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")
	const appID = "6e5d154e"
	const apiKey = process.env.EDAMAN_API_KEY

	let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${weather}&app_id=${appID}&app_key=${apiKey}`

	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		next: {revalidate: 60}
	})

	if (!res.ok) {
		return NextResponse.error("Error fetching data", res.status)
	} else if (res.status === 404) {
		return NextResponse.error("No data found", res.status)
	} else {
		let data = await res.json()
		return NextResponse.json(data)
	}
}
