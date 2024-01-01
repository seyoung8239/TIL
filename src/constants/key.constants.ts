export const BASIC_KEY = {
	K: 'k',
} as const;
export const SPECIAL_KEY = {
	CTRL: 'ctrl',
	COMMAND: 'command',
} as const;
export type SpecialKey = (typeof SPECIAL_KEY)[keyof typeof SPECIAL_KEY];

export const KEY = { ...BASIC_KEY, ...SPECIAL_KEY } as const;
export type Key = (typeof KEY)[keyof typeof KEY];
