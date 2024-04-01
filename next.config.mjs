/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next"

const nextConfig = {
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				port: "",
				pathname: "/**"
			},

			{
				protocol: "https",
				hostname: "img.spoonacular.com",
				port: "",
				pathname: "/**"
			},

			{
				protocol: "https",
				hostname: "openweathermap.org",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "via.placeholder.com",
				port: "",
				pathname: "/**"
			}
		]
	}
}

export default withPlaiceholder(nextConfig)
