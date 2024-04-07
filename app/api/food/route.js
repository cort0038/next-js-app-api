export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")
	const appID = "6e5d154e"
	const apiKey = process.env.EDAMAN_API_KEY

	let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${weather}&app_id=${appID}&app_key=${apiKey}`

	try {
		const res = await fetch(url)
		let data = await res.json()

		if (data.cod === "404" || data.count === 0) {
			console.log("API Fetch:", data.message || "No recipes found")
			return new Response(JSON.stringify({error: data.message}), {
				status: 404,
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else {
			console.log("API Fetch:", data.hits)
			return new Response(JSON.stringify(data.hits), {
				status: 200,
				headers: {
					"Content-Type": "application/json"
				}
			})
		}
	} catch (error) {
		console.log("API Fetch:", error)
		return new Response(JSON.stringify({error: error.message}), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}
