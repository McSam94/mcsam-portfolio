import useMobile from '@/hooks/useMobile'
import useTranslation from 'next-translate/useTranslation'
import * as React from 'react'
import { Chrono } from 'react-chrono'

const Experiences: React.FC = () => {
	const { isReady, isMobile } = useMobile()
	const { t } = useTranslation('experiences')

	const experiencesTimeline = React.useMemo(
		() => [
			{
				title: '2017',
				cardTitle: t('title1'),
				cardSubtitle: t('description1'),
			},
			{
				title: '2018',
				cardTitle: t('title2'),
				cardSubtitle: t('description2'),
			},
			{
				title: '2019',
				cardTitle: t('title3'),
				cardSubtitle: t('description3'),
			},
			{
				title: '2020',
				cardTitle: t('title4'),
				cardSubtitle: t('description4'),
			},
			{
				title: 'Present',
				cardTitle: t('title5'),
				cardSubtitle: t('description5'),
			},
		],
		[t]
	)

	return (
		<div
			id="experiences"
			className="w-full h-auto bg-gray-100/50 dark:bg-gray-500/50 flex justify-center py-20"
		>
			<div className="w-full md:w-[85vw] max-w-[100rem] flex flex-col items-center h-full">
				<div className="text-5xl font-bold text-slate-500 dark:text-white text-center pb-20">
					{t('title')}
				</div>
				{isReady ? (
					<Chrono
						items={experiencesTimeline}
						mode={isMobile ? 'HORIZONTAL' : 'VERTICAL_ALTERNATING'}
						theme={{
							primary: 'gray',
							secondary: '#FCD34D',
							cardForeColor: 'black',
							titleColor: 'white',
						}}
						activeItemIndex={isMobile ? 0 : -1}
						disableAutoScrollOnClick
						disableClickOnCircle
						disableNavOnKey
						hideControls={!isMobile}
					/>
				) : null}
			</div>
		</div>
	)
}

export default Experiences
