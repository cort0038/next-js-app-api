import {NextRequest, NextResponse} from "next/server"

export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")

	let url =
		"https://api.spoonacular.com/recipes/complexSearch?query=" +
		weather +
		"&apiKey=" +
		"3aa5ed4456b149bf814db448045e27f4"

	const res = await fetch(url)
	let data = await res.json()
	return NextResponse.json(data)
}

