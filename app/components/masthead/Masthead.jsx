import React from "react"

const Masthead = () => {
	return (
		<div className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Discover
				<br />
				<span className="blue_gradient text-center"> The Perfect Food & Movie for Today</span>
			</h1>
			<p className="desc text-center">
				Get recommendations for movies to watch and delicious recipes to cook according to today's weather!
			</p>
		</div>
	)
}

export default Masthead
