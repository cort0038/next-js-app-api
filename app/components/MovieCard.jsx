import {useRouter} from "next/navigation"
import PropTypes from "prop-types"

export default function MovieCard({data, input}) {
	const router = useRouter()

	if (!data) {
		return null
	}
	let conditions = data.weather[0].main
	let url = "/" + encodeURIComponent(input) + "/movie?w=" + conditions

	const handleSubmit = async ev => {
		ev.preventDefault()
		router.push(url)
	}

	return (
		<div
			className="rounded-lg text-black bg-slate-300 pr-12 pl-12 pt-6 pb-6 text-center cursor-pointer w-fit"
			onClick={handleSubmit}>
			<h3>Today&apos;s Perfect Movie</h3>
		</div>
	)
}

MovieCard.propTypes = {
	data: PropTypes.object,
	input: PropTypes.string
}
