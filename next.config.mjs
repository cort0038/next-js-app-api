/** @type {import('next').NextConfig} */

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
			}
		]
	}
}

export default nextConfig
