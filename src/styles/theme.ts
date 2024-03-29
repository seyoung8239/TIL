export const theme = {
	colors: {
		GRAY800: '#1f2937',

		GREEN50: '#f7fee7',
		GREEN100: '#dcfce7',
		GREEN200: '#bbf7d0',
		GREEN300: '#86efac',
	},
	screen: {
		sm: '576px',
		md: '768px',
		lg: '992px',
	},
} as const;

export type CustomTheme = typeof theme;
