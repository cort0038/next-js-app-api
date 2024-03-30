import axios from "axios"

export async function GET(city, country) {
	let apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`

	try {
		const response = await axios.get(url)

		if (response.data.length === 0) {
			let message = "No location found"
			// error(message)
			console.warn(message)
		} else {
			let location = response.data
			console.log(`${location.name}`, location)
			return location
		}
	} catch {
		let message = "Error fetching location"
		// error(message)
		console.warn(message)
	}
}
