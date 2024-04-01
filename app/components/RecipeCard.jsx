import PropTypes from "prop-types"
import {useRouter} from "next/navigation"
import Image from "next/image"
import myImage from "@Public/food.svg"
export default function RecipeCard({data, input}) {
	const router = useRouter()

	function handleSubmit(ev) {
		if (!data) {
			return null
		}

		let conditions = data.weather[0].main
		let url = "/" + encodeURIComponent(input) + "/food?w=" + conditions

		ev.preventDefault()
		router.push(url)
	}

	return (
		<div className="rounded-lg text-black bg-slate-300 text-center cursor-pointer p-3" onClick={handleSubmit}>
			<div className="flex">
				<Image src={myImage} width={48} height={48} alt="recipe icon" />
				<p className="flex gap-2 items-center">Today&apos;s Perfect Recipe</p>
			</div>
		</div>
	)
}

RecipeCard.propTypes = {
	data: PropTypes.object,
	input: PropTypes.string
}
