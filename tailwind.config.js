module.exports = {
	mode: 'jit',
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'white-50': '#ebebeb',
			},
			boxShadow: {
				'neumorphism-slate-100-xs':
					'4px 4px 20px #cdd0d4, -4px -4px 20px #ffffff;',
				'neumorphism-white-50-md':
					'20px 20px 60px #c8c8c8, -20px -20px 60px #ffffff;',
				'neumorphism-slate-800-xs':
					'4px 4px 12px #0c1018, -4px -4px 12px #30425e;',
				'neumorphism-gray-700-md':
					'20px 20px 60px #161a20, -20px -20px 60px #586882;',
			},
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('even-child', '& > *:nth-child(even)')
			addVariant('odd-child', '& > *:nth-child(odd)')
		},
	],
}
