import "./globals.css"
import Masthead from "@Components/Masthead"

export const metadata = {
	title: "Perfect Food & Movie",
	description:
		"Get recommendations for movies to watch and delicious recipes to cook according to today's weather!"
}

export default function RootLayout({children}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="./favicon.ico" sizes="any" />
			</head>

			<body>
				<main className="main">
					<div className="gradient" />
					<div className="app">
						<Masthead />
						{children}
					</div>
				</main>
			</body>
		</html>
	)
}
