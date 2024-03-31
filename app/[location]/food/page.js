"use client"
import React, {useEffect, useState} from "react"
import Image from "next/image"
import {FaSearch} from "react-icons/fa"
import {IoArrowBackCircleSharp} from "react-icons/io5"

export default function FoodPage(props) {
	let condition = decodeURIComponent(props.searchParams.w)
	let location = decodeURIComponent(props.params.location).split(",")[0]

	let back = "/" + location

	const [data, setData] = useState(null)

	async function getRecipes(condition) {
		try {
			const response = await fetch("/api/food?weather=" + condition)

			const json = await response.json()
			setData(json.results)
		} catch (error) {
			console.error("Error fetching location")
		}
	}

	useEffect(() => {
		getRecipes(condition)
	}, [condition])

	return (
		<div className="mt-20">
			<div className="grid grid-cols-2 font-bold text-lg">
				<a href={back} className="flex gap-2 items-center">
					<IoArrowBackCircleSharp />
					Back to {location} Weather
				</a>
				<a href="/" className="flex gap-2 items-center justify-end">
					<FaSearch /> Make a New Search
				</a>
			</div>
			<h2 className="text-center orange_gradient text-2xl font-extrabold">Recipes for {condition} weather</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
				{data &&
					data.map((recipe, index) => (
						<div key={index} className="bg-white rounded-lg shadow-md">
							<Image
								src={recipe.image}
								alt={recipe.title || "No image available"}
								width={500}
								height={750}
								onError={({currentTarget}) => {
									currentTarget.onerror = null
									currentTarget.src = {imagePlaceholder}
								}}
							/>
							<div className="p-5">
								<h3 className="text-xl font-semibold">{recipe.title}</h3>
								<p className="text-sm text-gray-500">15 minutes</p>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
