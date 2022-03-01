import * as React from 'react'

const useMounted = (): boolean => {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	return isMounted
}

export default useMounted
