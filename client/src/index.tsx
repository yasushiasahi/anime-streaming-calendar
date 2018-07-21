import * as React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import App from './components/App'

const link = document.createElement('link')
link.setAttribute('href', 'https://fonts.googleapis.com/earlyaccess/notosansjp.css')
link.setAttribute('rel', 'stylesheet')
document.head.appendChild(link)

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
     text-rendering: geometricPrecision;
     overflow: hidden;
     height: 100%;
     background-color: #fff;
  }

  div {
    box-sizing: border-box;
  }
`
