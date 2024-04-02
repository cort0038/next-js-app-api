"use client"

import {FaSearch} from "react-icons/fa"
import MovieCard from "@Components/MovieCard"
import RecipeCard from "@Components/RecipeCard"
import WeatherCard from "@Components/WeatherCard"
import {useEffect, useState} from "react"
import Feedback from "@Components/Feedback"

export default function LocationPage(props) {
	const [error, setError] = useState(null)
	const [data, setData] = useState(null)

	let location = decodeURIComponent(props.params.location)

	let input = location
		.split(",")
		.map(item => item.trim())
		.join(",")

	async function getWeather(input) {
		try {
			const response = await fetch("/api/weather?address=" + input, {
				method: "GET"
			})
			if (!response.ok) {
				console.error("Not location found. Try again.")
				setError("Not location found. Try again.")
				return
			}
			const json = await response.json()
			setData(json)
		} catch (error) {
			console.error(error)
		}
	}

	let newLocation = data ? data.name + ", " + data.sys.country : location

	useEffect(() => {
		getWeather(input)
	}, [input])

	return (
		<>
			<div className="mt-20 mb-20">
				{error && (
					<>
						<Feedback error={error} clear={() => setError(error)} />
					</>
				)}

				{data ? (
					<h2 className="text-center orange_gradient text-2xl font-extrabold" style={{display: error && "none"}}>
						Let's enjoy the day in {newLocation}
					</h2>
				) : (
					<div className="flex rounded-md skeleton justify-center items-center" style={{display: error && "none"}}>
						<h2 className="text-2xl text-transparent font-extrabold">Let's enjoy the day in Ottawa, Canada</h2>
					</div>
				)}

				<div className="mt-10 mb-10 flex items-center justify-center">
					<WeatherCard data={data} error={error}/>
				</div>

				<a className="justify-center gap-2 flex mt-10 font-bold text-lg items-center " href="/">
					<FaSearch /> Make a New Search
				</a>
				<div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 mt-5">
					<MovieCard data={data} input={input} />
					<RecipeCard data={data} input={input} />
				</div>
			</div>
		</>
	)
}
