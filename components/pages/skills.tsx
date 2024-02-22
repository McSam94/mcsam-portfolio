import * as React from 'react'
import Image from 'next/image'
import startCase from 'lodash.startcase'
import useTranslation from 'next-translate/useTranslation'
import { SKILLS } from '@/config/constants'

interface SkillBoxProps {
	skill: typeof SKILLS[number]
}

const SkillBox: React.FC<SkillBoxProps> = ({ skill }) => {
	return (
		<div className="flex flex-row items-center space-x-4 p-4 rounded-lg bg-white-50 dark:bg-gray-700 shadow-neumorphism-white-50-md dark:shadow-neumorphism-gray-700-md hover:shadow-none dark:hover:shadow-none cursor-pointer w-[12rem]">
			<Image src={`/skills/${skill}.svg`} alt={skill} width="30" height="30" />
			<div
				data-tip={startCase(skill)}
				className="text-lg flex-1 whitespace-nowrap truncate"
			>
				{startCase(skill)}
			</div>
		</div>
	)
}

const Skills: React.FC = () => {
	const { t } = useTranslation('skills')
	return (
		<div id="skills" className="w-full h-auto flex justify-center pt-20">
			<div className="w-full lg:w-[85vw] max-w-[100rem] flex flex-col items-center h-full">
				<div className="text-5xl font-bold text-slate-500 dark:text-white text-center py-10">
					{t('title')}
				</div>
				<div className="flex flex-row lg:flex-wrap max-w-[100vw] overflow-x-auto py-20">
					{SKILLS.map(skill => (
						<div
							key={skill}
							className="basis-2/3 ml-4 lg:ml-0 lg:basis-1/4 lg:mb-12 flex justify-center"
						>
							<SkillBox skill={skill} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Skills
