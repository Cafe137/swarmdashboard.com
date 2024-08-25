import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const desktopEnabled = Boolean(process.env.REACT_APP_BEE_DESKTOP_ENABLED)
const desktopUrl = process.env.REACT_APP_BEE_DESKTOP_URL
const beeApiUrl = process.env.REACT_APP_BEE_HOST
const defaultRpcUrl = process.env.REACT_APP_DEFAULT_RPC_URL

ReactDOM.render(
    <React.StrictMode>
        <App isDesktop={desktopEnabled} desktopUrl={desktopUrl} beeApiUrl={beeApiUrl} defaultRpcUrl={defaultRpcUrl} />
    </React.StrictMode>,
    document.getElementById('root')
)
