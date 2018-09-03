import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './modules/core/ui/Root'
import { configureStore, history } from './store/configureStore'
import context from './modules/context'
import {kAppStore} from './modules/context/constants'
import './app.global.css'

const store = configureStore()

context.set(kAppStore, store)

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./modules/core/ui/Root', () => {
    const NextRoot = require('./modules/core/ui/Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
