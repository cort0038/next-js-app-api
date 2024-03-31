import PropTypes from "prop-types"

export default function RecipeCard({weather}) {
	if (weather) {
		console.log(weather.conditions)
		console.log(weather)
	}

	return (
		<div className="rounded-lg text-black bg-slate-300 pr-12 pl-12 pt-6 pb-6 text-center cursor-pointer w-fit">
			<h3>Today&apos;s Perfect Recipe</h3>
		</div>
	)
}

RecipeCard.propTypes = {
	weather: PropTypes.object,
}
