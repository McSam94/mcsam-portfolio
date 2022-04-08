import { Option } from '@/components/dropdown'

export const LANG: Array<Option> = [
	{ icon: '🇺🇸', label: 'English', value: 'en' },
	{
		icon: '🇨🇳',
		label: 'Chinese',
		value: 'zh',
	},
	{
		icon: '🇲🇾',
		label: 'Malay',
		value: 'my',
	},
]

interface Profile {
	name: string
	url: string
}

export const PROFILE_URL: Array<Profile> = [
	{ name: 'linkedin', url: 'https://www.linkedin.com/in/yong-sam-87561a159/' },
	{ name: 'github', url: 'https://github.com/McSam94' },
	{ name: 'gitlab', url: 'https://gitlab.com/mcsam1216' },
]

interface project {
	name: string
	logo: string
	stacks: Array<string>
	gitLink?: string
	productionLink: string
}

export const PROJECTS: Array<project> = [
	{
		name: 'Checkin',
		logo: 'checkin',
		stacks: ['flutter'],
		gitLink: 'https://gitlab.com/mcsam1216/checkin',
		productionLink:
			'https://play.google.com/store/apps/details?id=com.mcsam.checkin',
	},
	{
		name: 'Email Butcher',
		logo: 'emailButcher',
		stacks: ['next', 'materialUI', 'nest', 'typescript'],
		gitLink: 'https://github.com/McSam94/email-butcher',
		productionLink: 'https://www.emailbutcher.com/',
	},
	{
		name: 'TiTi Official Website',
		logo: 'titi',
		stacks: ['gatsby', 'sass'],
		productionLink: 'https://www.titi.asia/',
	},
	{
		name: 'CryptoConvert',
		logo: 'cryptoConvert',
		stacks: ['chromeExtension'],
		productionLink:
			'https://chrome.google.com/webstore/detail/cryptoconvert/aaebjaemmlkjalibfidhjomnpagoglej?hl=en-GB',
	},
]
