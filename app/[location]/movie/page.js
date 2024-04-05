"use client"
import imagePlaceholder from "@Public/image-placeholder.png"
import Image from "next/image"
import React, {useEffect, useState} from "react"
import {IoMdArrowRoundBack} from "react-icons/io"
import {FaSearch} from "react-icons/fa"
import Link from "next/link"

export default function MoviePage(props) {
	const [data, setData] = useState(null)

	let condition = decodeURIComponent(props.searchParams.w)
	let location = decodeURIComponent(props.params.location)

	console.log(props)

	let back = "/" + location

	async function getMovies(condition) {
		try {
			const response = await fetch("/api/movies?weather=" + condition)

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
					<Link href={back} className="flex gap-2 items-center">
						<IoMdArrowRoundBack />
						Back to Weather
					</Link>
					<Link href="/" className="flex gap-2 items-center justify-end">
						<FaSearch /> New Search
					</Link>
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
										className="rounded-t-lg w-full h-96 object-cover"
									/>

									<div className="p-5">
										<p className="text-md font-semibold ">{movie.title}</p>
										<div className="flex items-center gap-1">
											<p className="text-sm">Release Date:</p>
											<p className="text-sm text-gray-500">{movie.release_date || "No date available"}</p>
										</div>
										<div className="flex items-center gap-1">
											<p className="text-sm">Rating:</p>
											<p className="text-sm text-gray-500">{movie.vote_average || "No rating available"}</p>
										</div>
									</div>
								</div>
						  ))
						: Array.from({length: 12}).map((_, index) => (
								<div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
									<div className="skeleton h-96 w-full rounded-t-lg" />
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
