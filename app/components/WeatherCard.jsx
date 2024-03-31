import PropTypes from "prop-types"

const WeatherCard = ({data}) => {
	return (
		data && (
			<div className="flex items-center justify-center">
				<div className="rounded-lg bg-cyan-200 text-black pr-12 pl-12 pt-6 pb-6 text-center cursor-pointer  w-fit">
					<h2>{data.name}</h2>
					<p>{data.sys.country}</p>
					<p>{data.weather[0].main}</p>
					<p>{data.main.temp}</p>
					<p>{data.wind.speed}</p>
				</div>
			</div>
		)
	)
}

export default WeatherCard

WeatherCard.propTypes = {
	data: PropTypes.object
}
