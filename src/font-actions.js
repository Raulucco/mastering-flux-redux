export const FONT_SIZE_PREF_UPDATE = 'FONT_SIZE_PREF_UPDATE';

export function fontSizePrefUpdate(size) {
    return {
        type: FONT_SIZE_PREF_UPDATE,
        value: size ? 'small' : 'large'
    };
}