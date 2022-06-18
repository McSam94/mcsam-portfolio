import * as React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import useMobile from '@/hooks/useMobile'
import Dropdown, { Option } from '@/components/dropdown'
import { LANG } from '@/config/constants'

interface OptionProps {
	option: Option
}

const SelectedLang: React.FC<OptionProps> = ({ option }) => {
	return (
		<div className="flex flex-row">
			<span className="mr-2">{option.icon}</span>
		</div>
	)
}

const LangOption: React.FC<OptionProps> = ({ option }) => {
	return (
		<div className="text-lg flex flex-row">
			<span>{option.icon}</span>
			<span className="ml-2">{option.label}</span>
		</div>
	)
}

interface MenuItemProps {
	menu: string
}

const MenuItem: React.FC<MenuItemProps> = ({ menu }) => {
	const { t } = useTranslation('header')

	return (
		<Link href={`#${menu}`} passHref>
			<span className="text-lg cursor-pointer hover:text-orange-300">
				{t(menu)}
			</span>
		</Link>
	)
}

const Header: React.FC = () => {
	const { push } = useRouter()
	const { isMobile } = useMobile()
	const { theme, setTheme } = useTheme()
	const { lang } = useTranslation()

	const isLightMode = React.useMemo(() => theme === 'light', [theme])

	const onThemeToggle = React.useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}, [setTheme, theme])

	const onTranslate = React.useCallback(
		selectedLang => push('/', '', { locale: selectedLang }),
		[push]
	)

	return (
		<div className="w-full sticky top-0 flex flex-row justify-between px-8 py-6 bg-slate-100 dark:bg-slate-800 dark:text-white z-10 shadow-sm">
			<div className="basis-1/3">
				<Link href="/">
					<>
						{isMobile ? (
							<Image src="/logo.svg" width="45" height="45" alt="logo" />
						) : (
							<Image
								src="/logo.svg"
								className="hover:transition-transform hover:rotate-[360deg] cursor-pointer"
								width="55"
								height="55"
								alt="logo"
							/>
						)}
					</>
				</Link>
			</div>
			<div className="flex-row items-center basis-1/3 justify-between hidden lg:flex">
				<MenuItem menu="experiences" />
				<MenuItem menu="skills" />
				<MenuItem menu="projects" />
				<MenuItem menu="contact" />
			</div>
			<div className="flex flex-row items-center space-x-10 basis-1/3 justify-end">
				<div
					role="button"
					tabIndex={0}
					className="flex cursor-pointer bg-slate-200/50 dark:bg-slate-500 rounded-full p-2 w-10 h-10"
					onClick={onThemeToggle}
					onKeyDown={onThemeToggle}
				>
					{!isLightMode ? (
						<span className="material-icons text-gray-100 text-md">
							dark_mode
						</span>
					) : null}
					{isLightMode ? (
						<span className="material-icons text-yellow-500 text-md">
							light_mode
						</span>
					) : null}
				</div>
				<Dropdown
					className="w-[82px]"
					options={LANG}
					onSelect={onTranslate}
					renderSelected={option => <SelectedLang option={option} />}
					renderOption={option => <LangOption option={option} />}
					defaultValue={lang}
				/>
			</div>
		</div>
	)
}

export default Header
