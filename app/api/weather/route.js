import axios from "axios"

export async function GET(city, country) {
	let apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`

	try {
		const response = await axios.get(url)
		let data = response.data

		if (data.length === 0) {
			let message = "No location found"
			console.warn(message)
			return new Response(JSON.stringify({message}), {
				status: 404,
				statusText: "Not Found",
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else {
			// console.log(`${data.name}`, data)
			return new Response(JSON.stringify(data), {
				status: 200,
				statusText: "OK",
				headers: {
					"Content-Type": "application/json"
				}
			})
		}
	} catch {
		let message = "Error fetching location"
		console.error(message)
		return new Response(JSON.stringify({message}), {
			status: 500,
			statusText: "Internal Server Error",
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}
