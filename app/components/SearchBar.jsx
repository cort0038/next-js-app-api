"use client"

import {useState} from "react"
import {FaSearch} from "react-icons/fa"
import {useRouter} from "next/navigation"

export default function SearchBar() {
	const [searchText, setSearchText] = useState("")

	const router = useRouter()

	const handleSubmit = ev => {
		ev.preventDefault()
		router.push(`/${searchText}`)
	}

	return (
		<>
			<form
				className="flex md:flex-row sm:flex-row lg:flex-row flex-col gap-2 lg:gap-8 p-2 items-center justify-center mt-12 mb-4 rounded-lg text-black"
				onSubmit={handleSubmit}>
				<label className="font-semibold" htmlFor="formInput">
					Type your city name:
				</label>
				<input
					className="text-lg p-2 rounded-lg text-center border-zinc-500 border focus:outline-none placeholder-gray-500 focus:placeholder-opacity-0"
					type="text"
					id="formInput"
					name="formInput"
					required
					placeholder="Ottawa, CA"
					value={searchText}
					onChange={e => {
						setSearchText(e.target.value)
					}}
				/>
				<button
					className="flex gap-2 items-center border-2 rounded-xl pt-2 pb-2 pr-4 pl-4 bg-blue-200 hover:bg-green-300 text-black transition-all"
					type="submit">
					<FaSearch /> Search
				</button>
			</form>
		</>
	)
}
