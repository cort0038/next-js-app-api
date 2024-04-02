import PropTypes from "prop-types"
import Image from "next/image"

export default function WeatherCard({data, error}) {
	let conditions

	function capitalization() {
		if (!data) {
			return null
		}
		const weather = data.weather[0].description
		conditions = weather.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
	}

	capitalization()

	return (
		<>
			{data ? (
				<div className="rounded-lg bg-cyan-200 text-black  text-center cursor-pointer flex flex-col justify-center w-72 h-48">
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
			) : (
				<div
					className="rounded-lg shadow-md animate-pulse h-48 w-72 bg-cyan-200"
					style={{display: error && "none"}}>
					<div className="flex flex-col gap-2 p-10">
						<div className="skeleton h-3"></div>
						<div className="skeleton h-3"></div>
						<br />
						<div className="skeleton h-3"></div>
						<div className="skeleton h-3"></div>
						<div className="skeleton h-3"></div>
					</div>
				</div>
			)}
		</>
	)
}

WeatherCard.propTypes = {
	data: PropTypes.object,
	error: PropTypes.string
}
