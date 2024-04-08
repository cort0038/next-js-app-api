"use client"
import {useParams, useRouter} from "next/navigation"
import PropTypes from "prop-types"
import Image from "next/image"
import myImage from "@Public/movie.png"

export default function MovieCard({data}) {
	const router = useRouter()
	const {location} = useParams()

	function handleClick() {
		if (!data) {
			return null
		}

		let conditions = data.weather[0].main
		let url = `/${location}/movie?w=${conditions}`
		router.push(url)
	}

	return (
		<>
			{data ? (
				<div
					className="rounded-lg text-black bg-slate-300 text-center p-6 cursor-pointer h-20 w-72 flex items-center justify-center"
					onClick={handleClick}>
					<div className="flex gap-2">
						<Image src={myImage} width={28} height={28} alt="food icon" />
						<p className="flex gap-2 items-center">Today&apos;s Perfect Movie</p>
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

MovieCard.propTypes = {
	data: PropTypes.object
}
