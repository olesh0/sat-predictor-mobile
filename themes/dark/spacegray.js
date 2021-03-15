import { THEME_DARK } from '../types'

export default {
  name: 'Spacegray',
  slug: 'spacegray',
  type: THEME_DARK,
  colors: {
    colorBgDark: '#343d46', // main bg
    colorBgLight: '#4e5c68',

    colorFontDark: '#9ba9b6',
    colorFontLight: '#848F97',
    colorFontMain: '#eee',

    colorAccentGreen: '#22d5a4',
    colorAccentRed: '#ff0000',
    colorAccentPurple: '#8E22D5',

    colorBgUserCoordsInput: 'rgba(255, 255, 255, .05)',
    coordsButtonFontColor: '#000',

    colorHighlightGreen: 'rgba(34, 213, 164, .4)',
    colorHighlightRed: 'rgba(213, 34, 34, .4)',
    colorHighlightPurple: 'rgba(142, 34, 213, .4)',

    colorUltraHighlightGreen: 'rgba(34, 213, 164, .6)',
    colorUltraHighlightRed: 'rgba(213, 34, 34, .6)',
    colorUltraHighlightPurple: 'rgba(142, 34, 213, .6)',

    // Not in use yet (no idea if they're gonna be)
    mapBorderColor: '#454545',
    mapFillColor: '#191A1A',
  },
}
