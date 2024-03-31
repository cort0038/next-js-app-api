"use client"

import MovieCard from "@Components/MovieCard"
import RecipeCard from "@Components/RecipeCard"
import WeatherCard from "@Components/WeatherCard"
import {useEffect, useState} from "react"

export default function LocationPage(props) {
	let location = decodeURIComponent(props.params.location)

	let input = location
		.split(",")
		.map(item => item.trim())
		.join(",")

	const [data, setData] = useState(null)

	async function getWeather(input) {
		try {
			const response = await fetch("/api/weather?address=" + input)
			const json = await response.json()
			setData(json)
		} catch (error) {
			console.error("Error fetching location")
		}
	}

	let newLocation = data ? data.name + ", " + data.sys.country : location

	useEffect(() => {
		getWeather(input)
	}, [input])

	return (
		<div className="mt-20">
			<h2 className="text-center orange_gradient text-2xl font-extrabold">Let's enjoy the day in {newLocation}</h2>
			<div className="pt-10 pb-10">
				<WeatherCard data={data} />
			</div>
			<div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 mt-5">
				<MovieCard data={data} input={input} />
				<RecipeCard data={data} />
			</div>
		</div>
	)
}
