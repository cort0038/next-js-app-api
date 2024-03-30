import axios from "axios"

export async function GET(city, country) {
	let apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`

	try {
		const response = await axios.get(url)

		let data = response.data
		if (data.length === 0) {
			let message = "No location found"
			// error(message)
			console.warn(message)
			return message
		} else {
			console.log(`${data.name}`, data)
			return data
		}
	} catch {
		let message = "Error fetching location"
		console.warn(message)
		return message
	}
}
