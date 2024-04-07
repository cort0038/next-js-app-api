import imagePlaceholder from "@Public/image-placeholder.png"
import Image from "next/image"
import {FaSearch} from "react-icons/fa"
import {IoMdArrowRoundBack} from "react-icons/io"
import Link from "next/link"

export default async function MoviePage({params, searchParams}) {
	let response = await fetch(`${process.env.ROOT_URL}/api/movies?weather=${searchParams.w}`)

	if (response.status === 404) {
		console.log("Response:", response.status)
		return (
			<>
				<div className="grid grid-cols-2 font-bold text-lg pt-10">
					<Link href={`/${params.location}`} className="flex gap-2 items-center">
						<IoMdArrowRoundBack />
						Back
					</Link>
					<Link href="/" className="flex gap-2 items-center justify-end">
						<FaSearch /> Search
					</Link>
				</div>
				<p className="text-center mt-10 text-red-600 font-bold pt-10">
					No movies found for {searchParams.w} weather in {decodeURIComponent(params.location)}
				</p>
			</>
		)
	} else if (response.status === 500) {
		console.log("Response:", response.status)
		return (
			<>
				<div className="grid grid-cols-2 font-bold text-lg pt-10">
					<Link href={`/${params.location}`} className="flex gap-2 items-center">
						<IoMdArrowRoundBack />
						Back
					</Link>
					<Link href="/" className="flex gap-2 items-center justify-end">
						<FaSearch />
						Search
					</Link>
				</div>
				<p className="text-center mt-10 text-red-600 font-bold pt-10">Something went wrong. Please, try again.</p>
			</>
		)
	} else {
		let data = await response.json()
		console.log("Response:", data)
		return (
			<>
				<div className="mt-20 mb-20">
					<div className="grid grid-cols-2 font-bold text-lg">
						<Link href={`/${params.location}`} className="flex gap-2 items-center">
							<IoMdArrowRoundBack />
							Back
						</Link>
						<Link href="/" className="flex gap-2 items-center justify-end">
							<FaSearch /> Search
						</Link>
					</div>
					<h2 className="text-center orange_gradient text-2xl font-extrabold mt-10">
						Movies for {decodeURIComponent(params.location)} weather
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
						{data
							? data.results.map((movie, index) => (
									<div key={index} className="bg-white rounded-lg shadow-md">
										<Image
											src={
												movie.poster_path
													? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
													: imagePlaceholder
											}
											alt={movie.title || "Title no available"}
											className="rounded-t-lg w-full h-96"
											width={500}
											height={450}
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
}
