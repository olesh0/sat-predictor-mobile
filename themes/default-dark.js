import { THEME_DARK } from './types'

export default {
  name: 'Default dark',
  slug: 'default-dark',
  type: THEME_DARK,
  colors: {
    colorBgDark: '#17191A', // main bg
    colorBgLight: '#242729',

    colorFontDark: '#5F6D77',
    colorFontLight: '#848F97',
    colorFontMain: '#EEE',

    colorAccentGreen: '#22d5a4',
    colorAccentRed: '#d52222',
    colorAccentPurple: '#8E22D5',

    colorBgUserCoordsInput: 'rgba(255, 255, 255, .04)',
    coordsButtonFontColor: '#000',

    colorHighlightGreen: 'rgba(34, 213, 164, .6)',
    colorHighlightRed: 'rgba(213, 34, 34, .6)',
    colorHighlightPurple: 'rgba(142, 34, 213, .6)',

    colorHighlightGreen: 'rgba(34, 213, 164, .6)',
    colorHighlightRed: 'rgba(213, 34, 34, .6)',
    colorHighlightPurple: 'rgba(142, 34, 213, .6)',

    // Not in use yet (no idea if they're gonna be)
    mapBorderColor: '#454545',
    mapFillColor: '#191A1A',
  },
}
