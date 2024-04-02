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

	let input = decodeURIComponent(props.params.location)

	async function getWeather(input) {
		try {
			const response = await fetch("/api/weather?address=" + input, {
				method: "GET"
			})
			if (!response.ok) {
				console.error("Something went wrong. Try again.")
				setError("Something went wrong. Try again.")
				return
			} else {
				const json = await response.json()
				setData(json)
			}
		} catch (error) {
			console.error(error)
			setError(error)
		}
	}

	let location = data ? data.name + ", " + data.sys.country : input

	useEffect(() => {
		getWeather(input)
	}, [input])

	return (
		<>
			<div className="mt-20 mb-20">
				{error && <Feedback error={error} clear={() => setError(error)} />}

				{data ? (
					<h2 className="text-center orange_gradient text-2xl font-extrabold">
						Let's enjoy the day in {location}
					</h2>
				) : (
					<div className="flex rounded-md skeleton justify-center items-center" style={{display: error && "none"}}>
						<h2 className="text-2xl text-transparent font-extrabold w-20 h-8"></h2>
					</div>
				)}

				<div className="mt-10 mb-10 flex items-center justify-center">
					<WeatherCard data={data} error={error} />
				</div>

				<a className="justify-center gap-2 flex mt-10 font-bold text-lg items-center " href="/">
					<FaSearch /> Make a New Search
				</a>
				<div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 mt-5">
					<MovieCard data={data} input={input} error={error} />
					<RecipeCard data={data} input={input} error={error} />
				</div>
			</div>
		</>
	)
}
