import PropTypes from "prop-types"
import Image from "next/image"

const WeatherCard = ({data}) => {
	const weather = data.weather[0].description
	const conditions = weather.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

	return (
		data && (
			<div className="flex items-center justify-center">
				<div className="rounded-lg bg-cyan-200 text-black pr-12 pl-12 pt-6 pb-6 text-center cursor-pointer  w-fit">
					<h2 className="font-bold">{conditions}</h2>
					<div className="flex items-center justify-center">
						<Image
							width={48}
							height={48}
							src={"https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}
							alt="weather icon"
						/>
					</div>
					<div>
						<p>{data.weather[0].main}</p>
						<p>The temperature is {data.main.temp} °C</p>
						<p>Wind speed is {data.wind.speed} Km/h</p>
					</div>
				</div>
			</div>
		)
	)
}

export default WeatherCard

WeatherCard.propTypes = {
	data: PropTypes.object
}
