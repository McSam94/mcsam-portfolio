import * as React from 'react'
import cn from 'classnames'
import { useInterval } from 'usehooks-ts'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Image from 'next/image'
import startCase from 'lodash.startcase'
import { PROFILE_URL } from '@/config/constants'
import useMobile from '@/hooks/useMobile'
import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProgrammerSvg: React.ComponentType<any> = dynamic(
	() => import('@/assets/illustrations/programmer.svg')
)

interface ProfilePicProps {
	image: string
	alt: string
}

const ProfilePic = React.forwardRef<HTMLImageElement, ProfilePicProps>(
	({ image, alt }, ref) => (
		<div ref={ref}>
			<Image src={image} width="25" height="25" alt={alt} />
		</div>
	)
)

ProfilePic.displayName = 'ProfilePic'

const Introduction: React.FC = () => {
	const { dimensions, isMobile } = useMobile()
	const { t } = useTranslation('introduction')
	const [shouldAnimate, setShouldAnimate] = React.useState(false)

	useInterval(
		() => {
			setShouldAnimate(true)

			setTimeout(() => setShouldAnimate(false), 4500)
		},
		isMobile ? null : 5000
	)

	React.useEffect(() => {
		setShouldAnimate(!isMobile)
	}, [isMobile])

	return (
		<div className="h-screen w-full flex justify-center px-10 lg:px-20">
			<div className="w-[100vw] lg:w-[85vw] max-w-[100rem] flex flex-col lg:flex-row items-center h-full">
				<div className={cn({ introduction: shouldAnimate })}>
					{isMobile ? (
						<ProgrammerSvg
							width="300"
							height="300"
							key={`${dimensions?.height}_${dimensions?.width}`}
						/>
					) : (
						<ProgrammerSvg
							width="500"
							height="500"
							key={`${dimensions?.height}_${dimensions?.width}`}
						/>
					)}
				</div>
				<div className="flex flex-col mt-10 lg:mt-0 lg:ml-20">
					<div className="text-3xl font-semibold">{t('short')}</div>
					<div className="text-xl text-gray-500 dark:text-gray-200 leading-10 mt-6">
						{t('caption')}
					</div>
					<div className="flex flex-row space-x-4 mt-4">
						{PROFILE_URL.map(profile => (
							<div
								key={profile.name}
								data-tip={startCase(profile.name)}
								className="cursor-pointer"
							>
								<Link href={profile.url} passHref>
									<ProfilePic
										image={`/profile/${profile.name}.svg`}
										alt={profile.name}
									/>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Introduction
