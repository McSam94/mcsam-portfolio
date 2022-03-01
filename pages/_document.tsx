import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		const { locale } = this.props.__NEXT_DATA__
		return (
			<Html>
				<Head />
				<body
					lang={locale}
					className="bg-white text-black dark:bg-gray-700 dark:text-white"
				>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
