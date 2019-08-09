import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'

import '@ibm/plex/css/ibm-plex.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #FBFCFF!important;
  }

  * {
    font-family: 'IBM Plex Thai';
    box-sizing: border-box;
  }

  pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
`

ReactDOM.render(
  <HashRouter>
    <GlobalStyle />
    <App />
  </HashRouter>,
  document.getElementById('root')
)
