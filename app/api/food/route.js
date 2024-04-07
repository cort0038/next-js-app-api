export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")
	const apiKey = process.env.SPOONACULAR_API_KEY

	let url = `https://api.spoonacular.com/recipes/complexSearch?query=${weather}&apiKey=${apiKey}&number=20`

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
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
