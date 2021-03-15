import { THEME_DARK } from '../types'

export default {
  name: 'Absolute dark',
  slug: 'absolute-dark',
  type: THEME_DARK,
  colors: {
    colorBgDark: '#070808', // main bg
    colorBgLight: '#121414',

    colorFontDark: '#455058',
    colorFontLight: '#68747c',
    colorFontMain: '#eee',

    colorAccentGreen: '#22d5a4',
    colorAccentRed: '#d52222',
    colorAccentPurple: '#6c19a3',

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
