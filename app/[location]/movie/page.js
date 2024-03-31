"use client"
import imagePlaceholder from "@Public/image-placeholder.svg"
import Image from "next/image"
import React, {useEffect, useState} from "react"
import {IoMdArrowRoundBack} from "react-icons/io"
import {FaSearch} from "react-icons/fa"
import Loader from "@Components/Loader"

export default function MoviePage(props) {
	let condition = decodeURIComponent(props.searchParams.w)
	let location = decodeURIComponent(props.params.location)

	let back = "/" + location

	const [data, setData] = useState(null)

	async function getMovies(condition) {
		try {
			const response = await fetch("/api/movies?weather=" + condition)

			const json = await response.json()
			setData(json.results)
		} catch (error) {
			console.error("Error fetching location")
		}
	}

	console.log(data)

	useEffect(() => {
		getMovies(condition)
	}, [condition])

	return (
		<>
			{data ? (
				<div className="mt-20">
					<div className="grid grid-cols-2 font-bold text-lg">
						<a href={back} className="flex gap-2 items-center">
							<IoMdArrowRoundBack />
							Back to {location} Weather
						</a>
						<a href="/" className="flex gap-2 items-center justify-end">
							<FaSearch /> Make a New Search
						</a>
					</div>
					<h2 className="text-center orange_gradient text-2xl font-extrabold">Movies for {condition} weather</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
						{data &&
							data.map((movie, index) => (
								<div key={index} className="bg-white rounded-lg shadow-md">
									<Image
										src={
											movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : imagePlaceholder
										}
										alt={movie.title || "No image available"}
										width={500}
										height={750}
										onError={({currentTarget}) => {
											currentTarget.onerror = null
											currentTarget.src = {imagePlaceholder}
										}}
									/>
									<div className="p-5">
										<h3 className="text-xl font-semibold">{movie.title}</h3>
										<p className="text-sm text-gray-500">{movie.release_date}</p>
									</div>
								</div>
							))}
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	)
}
