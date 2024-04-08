import Image from "next/image"
import {FaSearch} from "react-icons/fa"
import {IoMdArrowRoundBack} from "react-icons/io"
import Link from "next/link"

export default async function FoodPage({params, searchParams}) {
	let response = await fetch(`${process.env.ROOT_URL}/api/food?weather=${searchParams.w}`)

	if (response.status === 404) {
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
					No recipes found for {searchParams.w} weather in {decodeURIComponent(params.location)}
				</p>
			</>
		)
	} else if (response.status === 500) {
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
		console.log(data.hits)

		return (
			<>
				<div className="mt-20 mb-20">
					<div className="grid grid-cols-2 font-bold text-lg">
						<Link href={`/${params.location}`} className="flex gap-2 items-center">
							<IoMdArrowRoundBack />
							Back
						</Link>
						<Link href="/" className="flex gap-2 items-center justify-end">
							<FaSearch />
							Search
						</Link>
					</div>
					<h2 className="text-center orange_gradient text-2xl font-extrabold mt-10">
						Recipes for {decodeURIComponent(params.location)} weather
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
						{data
							? data.hits.map((recipe, index) => (
									<Link
										key={index}
										className="bg-white rounded-lg shadow-md cursor-pointer"
										target="_blank"
										href={recipe.recipe.url}>
										{/* <Image
											src={recipe.recipe.image ? recipe.recipe.image : "https://via.placeholder.com/750x500"}
											alt={recipe.recipe.label || "No image available"}
											width={500}
											height={750}
											className="rounded-t-lg w-full h-48 object-cover"
											unoptimized={true}
										/> */}
										{recipe.recipe.image ? (
											<Image
												src={recipe.recipe.image}
												alt={recipe.recipe.label || "No image available"}
												width={500}
												height={750}
												className="rounded-t-lg w-full h-48 object-cover"
												unoptimized={true}
											/>
										) : (
											<img
												src="https://via.placeholder.com/750x500"
												alt="Placeholder"
												className="rounded-t-lg w-full h-48 object-cover"
											/>
										)}
										<div className="p-5">
											<p className="text-md font-semibold">{recipe.recipe.label}</p>
											<div className="flex items-center gap-3">
												<p className="text-sm">Meal Type:</p>
												<p className="text-sm text-gray-500">{recipe.recipe.mealType}</p>
											</div>
										</div>
									</Link>
							  ))
							: Array.from({length: 6}).map((_, index) => (
									<div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
										<div className="skeleton h-48 w-full rounded-t-lg" />
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
