"use client"
import Masthead from "@Components/Masthead"
import SearchBar from "@Components/SearchBar"
import WeatherCard from "@Components/WeatherCard"
import {useState} from "react"

export default function Home() {
	const [data, setData] = useState({})

	const handleSearch = data => {
		setData(data)
	}

	return (
		<div>
			<Masthead />
			<SearchBar onSearch={handleSearch} />
			<WeatherCard data={data} />
		</div>
	)
}
