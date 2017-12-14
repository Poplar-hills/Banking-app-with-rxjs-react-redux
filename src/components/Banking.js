import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import RecentActivity from './RecentActivity'

export default class Banking extends Component {
  render () {
    return (
      <Panel header='Recent Transactions'>
        <RecentActivity { ...this.props } />
      </Panel>
    )
  }
}
