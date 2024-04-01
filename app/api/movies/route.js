import {NextResponse} from "next/server"

export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")
	const apiKey = "a948ce29db1844d126091636b22b38a6"

	let url = `https://api.themoviedb.org/3/search/movie?query=${weather}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`

	const res = await fetch(url)

	if (!res.ok) {
		return NextResponse.error("Error fetching data", res.status)
	} else if (res.status === 404) {
		return NextResponse.error("No data found", res.status)
	} else {
		let data = await res.json()
		return NextResponse.json(data)
	}
}
