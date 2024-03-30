"use client"
import {GET} from "@API/weather/route"
import {useState} from "react"
import {FaSearch} from "react-icons/fa"

const SearchBar = ({onSearch}) => {
	const [searchText, setSearchText] = useState("")

	const handleSubmit = async ev => {
		ev.preventDefault()
		const [city, country = ""] = searchText.split(", ").map(item => item.trim())

		setSearchText("")

		async function getWeather() {
			try {
				const response = await GET(city, country)
				if (response && response.status === 200) {
					const data = await response.json()

					let weather = {
						city: data.name,
						country: data.sys.country,
						temperature: data.main.temp,
						weather: data.weather[0].description,
						windspeed: data.wind.speed
					}

					onSearch(weather)
				} else {
					console.log("No location found")
				}
			} catch (error) {
				console.error("Error fetching location")
			}
		}
		getWeather()
	}

	return (
		<form
			className="flex md:flex-col lg:flex-row flex-col gap-2 lg:gap-8 p-2 items-center justify-center mt-12 mb-4 rounded-lg text-black"
			onSubmit={handleSubmit}>
			<label className="font-semibold">Type your city name:</label>
			<input
				className="text-lg p-2 rounded-lg text-center border-zinc-500 border w-96 focus:outline-none placeholder-gray-500 focus:placeholder-opacity-0"
				type="text"
				placeholder="Santo Domingo, Dominican Republic"
				value={searchText}
				onChange={e => {
					setSearchText(e.target.value)
				}}
			/>
			<button
				className="flex gap-2 items-center border-2 rounded-lg p-2 bg-emerald-300 hover:bg-green-300 text-black transition-all"
				type="submit">
				<FaSearch /> Get Weather
			</button>
		</form>
	)
}

export default SearchBar
