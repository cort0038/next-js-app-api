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
		let recipes = data.results

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
						{/* {Render image for all recipes from data} */}
						{recipes.map((recipe, index) => (
							<div key={index} className="bg-white rounded-lg shadow-md">
								<Image src={recipe.image} alt={recipe.title} width={300} height={200} className="rounded-t-lg" />
								<div className="p-4">
									<h2 className="text-xl font-bold">{recipe.title}</h2>
								</div>
							</div>
						))}
					</div>
				</div>
			</>
		)
	}
}
