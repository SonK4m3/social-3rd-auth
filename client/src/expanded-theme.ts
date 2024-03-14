// import { Palette, PaletteColor, TypeBackground } from '@mui/material/styles/createPalette';

import { TypeBackground } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
	interface PaletteColor {
		[key: number]: string;
	}

	interface Palette {
		tertiary: PaletteColor;
	}

	interface TypeBackground {
		light: string;
	}
}
