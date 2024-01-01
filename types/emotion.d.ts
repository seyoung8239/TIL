import '@emotion/react';
import { type CustomTheme } from '@styles/theme';

declare module '@emotion/react' {
	export interface Theme extends CustomTheme {}
}
