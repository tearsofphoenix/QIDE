/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router'
import App from './containers/App'
import CoreUI from './modules/core/ui/App'

export default () => (
  <App>
    <Switch>
      <Route path="/" component={CoreUI} />
    </Switch>
  </App>
)
