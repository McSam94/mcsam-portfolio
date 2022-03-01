import * as React from 'react'
import debounce from 'lodash.debounce'

interface Dimension {
	height: number
	width: number
}

interface useMobileResult {
	isMobile: boolean
	dimensions: Dimension | null
}

const useMobile = (): useMobileResult => {
	const [isMobile, setIsMobile] = React.useState<boolean>(false)
	const [dimensions, setDimensions] = React.useState<Dimension | null>(null)

	React.useEffect(() => {
		if (window?.innerWidth <= 1024) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}, [dimensions])

	React.useEffect(() => {
		const debouncedHandleResize = debounce(function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			})
		}, 1000)

		window.addEventListener('resize', debouncedHandleResize)

		return () => window.removeEventListener('resize', debouncedHandleResize)
	}, [])

	React.useEffect(() => {
		setDimensions({
			height: window.innerHeight,
			width: window.innerWidth,
		})
	}, [])

	return { isMobile, dimensions }
}

export default useMobile
