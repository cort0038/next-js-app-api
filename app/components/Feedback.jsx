"use client"

import {useEffect} from "react"
import PropTypes from "prop-types"
import {BiErrorAlt} from "react-icons/bi"

export default function Feedback({error, clear}) {
	useEffect(() => {
		let timer
		if (error) {
			timer = setTimeout(() => {
				clear()
			}, 3000)
		}
		return () => clearTimeout(timer)
	}, [error, clear])

	return (
		<>
			<div
				style={{display: error ? "flex" : "none"}}
				className="gap-3 border-r-2 m-0 items-center justify-center text-red-800 font-bold text-md">
				<BiErrorAlt /> {error}
			</div>
		</>
	)
}

Feedback.propTypes = {
	error: PropTypes.string,
	clear: PropTypes.func,
}
