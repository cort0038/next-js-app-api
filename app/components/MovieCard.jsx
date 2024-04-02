import {useRouter} from "next/navigation"
import PropTypes from "prop-types"
import myImage from "@Public/movie.png"
import Image from "next/image"

export default function MovieCard({data, input, error}) {
	const router = useRouter()

	function handleSubmit(ev) {
		if (!data) {
			return null
		}

		let conditions = data.weather[0].main
		let url = "/" + encodeURIComponent(input) + "/movie?w=" + conditions

		ev.preventDefault()
		router.push(url)
	}

	return (
		<>
			{data ? (
				<div
					className="rounded-lg text-black bg-slate-300 text-center p-6 cursor-pointer h-20 w-72 flex items-center justify-center"
					onClick={handleSubmit}>
					<div className="flex gap-2">
						<Image src={myImage} width={28} height={28} alt="food icon" />
						<p className="flex gap-2 items-center">Today&apos;s Perfect Movie</p>
					</div>
				</div>
			) : (
				<div
					className="rounded-lg text-black bg-slate-300 text-center p-6 cursor-pointer animate-pulse w-72 h-20 flex items-center justify-center"
					style={{display: error && "none"}}>
					<div className="skeleton w-56 h-6"></div>
				</div>
			)}
		</>
	)
}

MovieCard.propTypes = {
	data: PropTypes.object,
	input: PropTypes.string,
	error: PropTypes.string,
}