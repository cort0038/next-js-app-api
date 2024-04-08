export async function GET(request) {
	const params = new URL(request.url).searchParams
	const weather = params.get("weather")
	const apiKey = process.env.FOOD_API_KEY

	let url = `https://api.spoonacular.com/recipes/complexSearch?query=${weather}&apiKey=${apiKey}`

	try {
		const res = await fetch(url)
		let data = await res.json()

		if (data.totalResults === 0) {
			return new Response(JSON.stringify({error: "No recipes found"}), {
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
		console.log(error)
		return new Response(JSON.stringify({error: "Something went wrong"}), {
			status: 500,
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}
