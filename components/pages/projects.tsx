import * as React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip'
import startCase from 'lodash.startcase'
import { PROJECTS } from '@/config/constants'

const Projects: React.FC = () => {
	const { t } = useTranslation('projects')

	return (
		<>
			<div
				id="projects"
				className="w-full flex justify-center bg-gray-100/50 dark:bg-gray-500/50"
			>
				<div className="w-full lg:w-[85vw] max-w-[100rem] flex flex-col items-center h-full py-20">
					<div className="text-5xl font-bold text-slate-500 dark:text-white text-center pb-10">
						{t('title')}
					</div>
					<div className="flex flex-row max-w-[100vw] overflow-x-auto h-full">
						{PROJECTS.map(project => (
							<div
								key={project.name}
								className="basis-2/3 ml-4 flex justify-center h-fit mb-2 dark:bg-black/30 rounded-lg"
							>
								<div className="ml-4 shadow-lg rounded-lg cursor-pointer w-[20rem]">
									<Image
										src={`/projects/${project.logo}.svg`}
										width="318"
										height="280"
										objectFit="contain"
										alt={project.name}
									/>
									<div className="flex flex-col p-4">
										<div className="text-2xl font-semibold">{project.name}</div>
										<div className="flex flex-row space-x-4 my-2">
											{project.stacks.map(stack => (
												<div
													key={stack}
													className="flex"
													data-tip={startCase(stack)}
												>
													<Image
														src={`/skills/${stack}.svg`}
														width="30"
														height="30"
														alt={stack}
													/>
												</div>
											))}
										</div>
										<div className="flex flex-row justify-between mt-4">
											{project.gitLink ? (
												<Link href={project.gitLink} passHref>
													<div className="flex flex-row text-gray-700 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
														<span className="material-icons">source</span>
														<span className="text-base ml-2">
															{t('sourceCode')}
														</span>
													</div>
												</Link>
											) : null}
											<Link href={project.productionLink} passHref>
												<div className="flex flex-row text-orange-700 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
													<span className="text-base">{t('visitSite')}</span>
													<span className="material-icons ml-2">
														arrow_forward
													</span>
												</div>
											</Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<ReactTooltip />
		</>
	)
}

export default Projects
