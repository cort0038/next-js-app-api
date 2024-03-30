import PropTypes from "prop-types"

const WeatherCard = ({data}) => {
	return (
		<div className="flex items-center justify-center">
			<div className="rounded-lg bg-cyan-200 text-black pr-12 pl-12 pt-6 pb-6 text-center cursor-pointer  w-fit">
				<h2>{data.city}</h2>
				<p>{data.country}</p>
				<p>{data.temperature}</p>
				<p>{data.weather}</p>
				<p>{data.windspeed}</p>
			</div>
		</div>
	)
}

export default WeatherCard

WeatherCard.propTypes = {
	data: PropTypes.object
}
