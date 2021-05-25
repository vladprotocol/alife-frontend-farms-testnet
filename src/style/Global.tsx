import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  audio::-webkit-media-controls-panel {
    background-color:#fff!important;
    color: #000!important;
  }
  audio::-webkit-media-controls-play-button, audio::-webkit-media-controls-current-time-display, audio::-webkit-media-controls-timeline, audio::-webkit-media-controls-time-remaining-display, audio::-webkit-media-controls-fullscreen-button, audio::-webkit-media-controls-volume-slider, audio::-webkit-media-controls-toggle-closed-captions-button, audio::-webkit-media-controls-mute-button
  {
    background-color: #fff!important;
    color:#000!important;
  }
  audio:focus{
    outline: none;
  }
  audio{
    height: 18px;
    margin: 2px 12px;
  }
`

export default GlobalStyle
