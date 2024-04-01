"use client"
import imagePlaceholder from "@Public/image-placeholder.svg"
import Image from "next/image"
import React, {useEffect, useState} from "react"
import {IoMdArrowRoundBack} from "react-icons/io"
import {FaSearch} from "react-icons/fa"

export default function MoviePage(props) {
	const [data, setData] = useState(null)

	let condition = decodeURIComponent(props.searchParams.w)
	let location = decodeURIComponent(props.params.location)

	let back = "/" + location

	async function getMovies(condition) {
		try {
			const response = await fetch("/api/movies?weather=" + condition, {
				method: "GET"
			})

			const json = await response.json()
			setData(json.results)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getMovies(condition)
	}, [condition])

	return (
		<>
			<div className="mt-20 mb-20">
				<div className="grid grid-cols-2 font-bold text-lg">
					<a href={back} className="flex gap-2 items-center">
						<IoMdArrowRoundBack />
						Back to Weather
					</a>
					<a href="/" className="flex gap-2 items-center justify-end">
						<FaSearch /> New Search
					</a>
				</div>
				<h2 className="text-center orange_gradient text-2xl font-extrabold mt-10">
					Movies for {location} weather
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
					{data
						? data.map((movie, index) => (
								<div key={index} className="bg-white rounded-lg shadow-md">
									<Image
										src={
											movie.poster_path
												? `https://image.tmdb.org/t/p/original${movie.poster_path}`
												: imagePlaceholder
										}
										alt={movie.title || "Title no available"}
										blurDataURL={`data:https://image.tmdb.org/t/p/300${movie.poster_path}`}
										width={500}
										height={450}
									/>

									<div className="p-5">
										<h3 className="text-xl font-semibold ">{movie.title}</h3>
										<p className="text-sm text-gray-500  ">{movie.release_date}</p>
									</div>
								</div>
						  ))
						: Array.from({length: 12}).map((_, index) => (
								<div key={index} className="bg-white rounded-lg shadow-md animate-pulse w-80">
									<div className="skeleton h-96 w-80" />
									<div className="p-5">
										<div className="skeleton h-8 w-full mb-2" />
										<div className="skeleton h-4 w-full" />
									</div>
								</div>
						  ))}
				</div>
			</div>
		</>
	)
}
