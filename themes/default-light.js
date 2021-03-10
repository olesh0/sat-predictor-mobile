import { THEME_LIGHT } from './types'

export default {
  name: 'Default light',
  slug: 'default-light',
  type: THEME_LIGHT,
  colors: {
    colorBgDark: '#bdbbbb', // main bg
    colorBgLight: '#dddddd',

    colorFontDark: '#7b8a94',
    colorFontLight: '#646e75',
    colorFontMain: '#4e4e50',

    colorAccentGreen: '#1cb68d',
    colorAccentRed: '#a81a1a',
    colorAccentPurple: '#6c19a3',

    colorBgUserCoordsInput: 'rgba(255, 255, 255, .3)',
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
