import * as React from "react";
import { render } from 'react-dom';

import styles from './style.module.scss'
import './config/configureMobX'
import ReactDOM from 'react-dom/client'

import './index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

if (module.hot) {
    module.hot.accept();
}
