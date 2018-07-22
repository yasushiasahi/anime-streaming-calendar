import * as React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import App from './components/App'
import styles from './helpers/styles'

const notoLink = document.createElement('link')
notoLink.setAttribute('href', 'https://fonts.googleapis.com/earlyaccess/notosansjp.css')
notoLink.setAttribute('rel', 'stylesheet')
document.head.appendChild(notoLink)

const robotoLink = document.createElement('link')
notoLink.setAttribute('href', 'https://fonts.googleapis.com/css?family=Roboto')
notoLink.setAttribute('rel', 'stylesheet')
document.head.appendChild(robotoLink)

const root = document.createElement('div')
document.body.insertBefore(root, document.body.firstChild)

render(<App />, root)

injectGlobal`
  html {
    font-family: Roboto,"Noto Sans JP",Helvetica,Arial,sans-serif;
  }

  body {
     margin: 0;
     font-size: 14px;
     color: ${styles.Colors.FontNormal};
     text-rendering: geometricPrecision;
     overflow: hidden;
     height: 100%;
     background-color: #fff;
  }

  div {
    box-sizing: border-box;
  }
`
