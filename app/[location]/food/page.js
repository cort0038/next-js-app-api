"use client"
import React, {useEffect, useState} from "react"
import Image from "next/image"
import {FaSearch} from "react-icons/fa"
import {IoMdArrowRoundBack} from "react-icons/io"

export default function FoodPage(props) {
	const [data, setData] = useState(null)

	let condition = decodeURIComponent(props.searchParams.w)
	let location = decodeURIComponent(props.params.location).split(",")[0]

	let back = "/" + location

	async function getRecipes(condition) {
		try {
			const response = await fetch("/api/food?weather=" + condition, {
				method: "GET"
			})

			const json = await response.json()
			setData(json.results)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getRecipes(condition)
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
					Recipes for {location} weather
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
					{data
						? data.map((recipe, index) => (
								<div key={index} className="bg-white rounded-lg shadow-md w-72 h-80">
									<Image
										src={
											recipe.image
												? `https://img.spoonacular.com/recipes/${recipe.id}-636x393.jpg`
												: "https://via.placeholder.com/750x500"
										}
										alt={recipe.title || "No image available"}
										width={500}
										height={750}
									/>
									<div className="p-5">
										<h3 className="text-xl font-semibold">{recipe.title}</h3>
										<p className="text-sm text-gray-500">15 minutes</p>
									</div>
								</div>
						  ))
						: Array.from({length: 6}).map((_, index) => (
								<div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
									<div className="skeleton h-56 w-72" />
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
