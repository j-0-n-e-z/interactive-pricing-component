/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'hsl(230 100% 99%)',
				darkBlue: 'hsl(227 35% 25%)',
				grayBlue: 'hsl(225 20% 60%)',
				lightGrayBlue: 'hsl(223 50% 87%)',
				darkRed: 'hsl(15 100% 70%)',
				lightRed: 'hsl(14 92% 95%)',
				paleBlue: 'hsl(226 100% 87%)',
				lightGray: 'hsl(224 65% 95%)',
				strongCyan: 'hsl(174 86% 45%)',
				lightCyan: 'hsl(174 77% 80%)'
			},
			backgroundImage: {
				pattern: 'url(/assets/images/bg-pattern.svg)'
			},
			fontFamily: {
				Manrope: ['Manrope', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
}
