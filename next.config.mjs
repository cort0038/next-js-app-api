/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost", "image.tmdb.org", "img.spoonacular.com", "openweathermap.org"]
	}
}

export default nextConfig
