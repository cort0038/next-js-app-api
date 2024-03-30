import React from "react"
import {FaSearch} from "react-icons/fa"

const SearchBar = () => {
	return (
		<form className="flex flex-col sm:flex-row gap-2 sm:gap-8 p-2 items-center justify-center mt-12 mb-4 rounded-lg text-black">
			<label className="font-semibold">Type your city name:</label>
			<input
				className="text-lg p-2 rounded-lg text-center border-zinc-500 border w-6/12 focus:outline-none placeholder-gray-500 focus:placeholder-opacity-0"
				type="text"
				placeholder="Santo Domingo"
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
