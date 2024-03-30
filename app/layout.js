import "./globals.css"

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
				<div className="main">
					<div className="gradient" />
				</div>
				<main className="app">{children}</main>
			</body>
		</html>
	)
}
