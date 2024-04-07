export async function GET(request) {
	const params = new URL(request.url).searchParams
	const address = params.get("address")
	const apiKey = process.env.OPENWEATHERMAP_API_KEY

	let url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${apiKey}&units=metric`

	try {
		const res = await fetch(url)
		let data = await res.json()

		if (data.cod === "404") {
			return new Response(JSON.stringify({error: data.message} || {error: "No weather found"}), {
				status: 404,
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else {
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: {
					"Content-Type": "application/json"
				}
			})
		}
	} catch (error) {
		return new Response(JSON.stringify({error: error.message} || {error: "Something went wrong"}), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}
