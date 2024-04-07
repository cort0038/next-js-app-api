"use client"
import PropTypes from "prop-types"
import {useRouter, useParams} from "next/navigation"
import Image from "next/image"
import myImage from "@Public/food.svg"

export default function RecipeCard({data}) {
	const router = useRouter()
	const {location} = useParams()

	function handleClick() {
		if (!data) {
			return null
		}

		let conditions = data.weather[0].main.toLowerCase()
		let url = `/${location}/food?w=${conditions}`
		router.push(url)
	}

	return (
		<>
			{data ? (
				<div
					className="rounded-lg text-black bg-slate-300 text-center cursor-pointer p-6 h-20 w-72 flex items-center justify-center"
					onClick={handleClick}>
					<div className="flex">
						<Image src={myImage} width={48} height={48} alt="recipe icon" />
						<p className="flex gap-2 items-center">Today&apos;s Perfect Recipe</p>
					</div>
				</div>
			) : (
				<div className="rounded-lg text-black bg-slate-300 text-center p-6 cursor-pointer animate-pulse w-72 h-20 flex items-center justify-center">
					<div className="skeleton w-56 h-6"></div>
				</div>
			)}
		</>
	)
}

RecipeCard.propTypes = {
	data: PropTypes.object
}
