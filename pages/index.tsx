import * as React from 'react'
import Header from '@/components/pages/header'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import useMounted from '@/hooks/useMounted'

const Introduction = dynamic(() => import('@/components/pages/introduction'))
const Experiences = dynamic(() => import('@/components/pages/experiences'))
const Skills = dynamic(() => import('@/components/pages/skills'))
const Projects = dynamic(() => import('@/components/pages/projects'))
const Contact = dynamic(() => import('@/components/pages/contact'))

const Home: NextPage = () => {
	const isMounted = useMounted()

	if (!isMounted) return null

	return (
		<>
			<Head>
				<title>McSam | Portfolio</title>
				<meta name="description" content="McSam's Portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="min-h-screen">
				<Introduction />
				<Experiences />
				<Skills />
				<Projects />
				<Contact />
			</main>
		</>
	)
}

export default Home
