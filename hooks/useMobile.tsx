import * as React from 'react'

interface useMobileResult {
	isMobile: boolean
	isReady: boolean
}

const useMobile = (): useMobileResult => {
	const [isReady, setIsReady] = React.useState<boolean>(false)
	const [isMobile, setIsMobile] = React.useState<boolean>(false)

	React.useEffect(() => {
		if (window) setIsReady(true)
	}, [])

	React.useEffect(() => {
		if (window?.innerWidth <= 768) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}, [])

	return { isMobile, isReady }
}

export default useMobile
