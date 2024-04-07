export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")
	const appID = process.env.EDAMAN_ID
	const apiKey = process.env.EDAMAN_API_KEY

	let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${weather}&app_id=${appID}&app_key=${apiKey}`

	try {
		const res = await fetch(url)
		let data = await res.json()

		if (data.cod === "404" || data.count === 0) {
			return new Response(JSON.stringify({error: data.message} || {error: "No recipes found"}), {
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
