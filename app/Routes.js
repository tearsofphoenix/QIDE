/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import App from './modules/core/ui/App'
import CoreUI from './modules/core/ui/Main'

export default () => (
  <App>
    <Switch>
      <Route path="/" component={CoreUI} />
    </Switch>
  </App>
)
