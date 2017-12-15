import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import AccountBalance from './AccountBalance'
import RecentActivity from './RecentActivity'

export default class Banking extends Component {
  render () {
    return (
      <Grid>
        <AccountBalance { ...this.props } />
        <RecentActivity { ...this.props } />
      </Grid>
    )
  }
}
