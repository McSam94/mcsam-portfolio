import * as React from 'react'
import Header from '@/components/pages/header'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Introduction = dynamic(() => import('@/components/pages/introduction'))
const Experiences = dynamic(() => import('@/components/pages/experiences'))
const Skills = dynamic(() => import('@/components/pages/skills'))
const Projects = dynamic(() => import('@/components/pages/projects'))
const Contact = dynamic(() => import('@/components/pages/contact'))

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>McSam | Portfolio</title>
				<meta name="description" content="McSam's Portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="min-h-screen overflow-x-hidden [&>*]:min-h-screen odd-child:bg-white-50 odd-child:dark:bg-gray-700 even-child:bg-stone-100 even-child:dark:bg-gray-500">
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
