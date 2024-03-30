import React from "react"
import {FaSearch} from "react-icons/fa"

const SearchBar = () => {
	return (
		<form>
			<label>Type your city namee</label>
			<input type="text" placeholder="Santo Domingo" />
			<button type="submit">
				<FaSearch />
				Get Weather
			</button>
		</form>
	)
}

export default SearchBar
