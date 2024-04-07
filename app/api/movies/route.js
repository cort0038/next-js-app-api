export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")
	const apiKey = process.env.MOVIEDB_API_KEY

	let url = `https://api.themoviedb.org/3/search/movie?query=${weather}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`

	try {
		const res = await fetch(url)
		let data = await res.json()

		if (data.cod === "404" || data.total_results === 0) {
			console.log("API Fetch:", data.message || "No movies found")
			return new Response(JSON.stringify({error: data.message}), {
				status: 404,
				headers: {
					"Content-Type": "application/json"
				}
			})
		} else {
			console.log("API Fetch:", data)
			return new Response(JSON.stringify(data), {
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
