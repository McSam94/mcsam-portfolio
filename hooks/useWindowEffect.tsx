import * as React from 'react'

const useWindowEffect = (fn: () => void, deps: Array<any>): void => {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		if (window) setIsMounted(true)
	}, [])

	React.useEffect(() => {
		if (isMounted) fn?.()
	}, [isMounted, ...deps])
}

export default useWindowEffect
