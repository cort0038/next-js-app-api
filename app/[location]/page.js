import {FaSearch} from "react-icons/fa"
import MovieCard from "@Components/MovieCard"
import RecipeCard from "@Components/RecipeCard"
import WeatherCard from "@Components/WeatherCard"
import Link from "next/link"

export default async function LocationPage({params}) {
	let response = await fetch(`${process.env.ROOT_URL}/api/weather?address=${params.location}`)

	if (response.status === 404) {
		console.log("Response:", response.status)
		return (
			<>
				<p className="text-center mt-10 text-red-600 font-bold pt-10">
					City "{decodeURIComponent(params.location)}" not found. Please, try again.
				</p>
				<Link className="justify-center gap-2 flex mt-10 font-bold text-lg items-center " href="/">
					<FaSearch /> Make a New Search
				</Link>
			</>
		)
	} else if (response.status === 500) {
		console.log("Response:", response.status)
		return (
			<>
				<p className="text-center mt-10 text-red-600 font-bold">Something went wrong. Please, try again.</p>
				<Link className="justify-center gap-2 flex mt-10 font-bold text-lg items-center " href="/">
					<FaSearch /> Make a New Search
				</Link>
			</>
		)
	} else {
		let data = await response.json()
		console.log("Response:", data)
		return (
			<>
				{
					<div className="mt-20 mb-20">
						{data ? (
							<h2 className="text-center orange_gradient text-2xl font-extrabold">
								Let's enjoy the day in {data.name}, {data.sys.country}!
							</h2>
						) : (
							<div className="flex rounded-md skeleton justify-center items-center">
								<h2 className="text-2xl text-transparent font-extrabold w-20 h-8"></h2>
							</div>
						)}

						<div className="mt-10 mb-10 flex items-center justify-center">
							<WeatherCard data={data} />
						</div>

						<Link className="justify-center gap-2 flex mt-10 font-bold text-lg items-center " href="/">
							<FaSearch /> Make a New Search
						</Link>
						<div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 mt-5">
							<MovieCard data={data} />
							<RecipeCard data={data} />
						</div>
					</div>
				}
			</>
		)
	}
}
