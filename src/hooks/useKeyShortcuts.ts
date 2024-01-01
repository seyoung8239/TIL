import { KEY, Key, SPECIAL_KEY, SpecialKey } from '@constants/key.constants';
import { useCallback, useEffect } from 'react';

export const useKeyShortcuts = (keys: Key[], callback: () => void) => {
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		const specialKeyCodeMap = {
			[KEY.CTRL]: e.ctrlKey,
			[KEY.COMMAND]: e.metaKey,
		};
		const isSpecialKey = (key: Key): key is SpecialKey =>
			Object.values(SPECIAL_KEY).some(specialKey => specialKey === key);
		const isKeyPress = (key: Key) =>
			isSpecialKey(key) ? specialKeyCodeMap[key] : e.key === key;
		const shouldEvokeCallback = keys.reduce(
			(prev, cur) => prev && isKeyPress(cur),
			true,
		);

		if (shouldEvokeCallback) callback();
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);
};
