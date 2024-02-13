import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-poppins)', ...fontFamily.sans],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontSize: {
				headerOne: '3.052rem',
				headerTwo: '2.441rem',
				headerThree: '1.953rem',
				headerFour: '1.563rem',
				headerFive: '1.25rem',
				paragraph: '1rem',
				small: '0.8rem',
				smallest: '0.64rem',
			},
			colors: {
				ct: {
					deepPink: '#DB0C63',
					yellow: '#c7a159',
					red: '#ff0000',
					lightRed: '#F7505B',
					darkGrey: '#505050',
					grey: '#595959',
					ash: '#9D9D9D',
					darkBackground: '#2C2C2C',
					lightGrey: '#d6d6d6',
					lightestGrey: 'rgba(222, 222, 222, .3)',
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
};
export default config;
