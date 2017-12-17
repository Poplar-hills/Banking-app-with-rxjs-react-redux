import React, { Component } from 'react'
import { Panel, Col } from 'react-bootstrap'

const Balance = props => (
  <Col xs={ 6 }>
    <h3>{ `${props.name}:` }</h3>
    <h1>{ `$${props.balance.toFixed(2)}` }</h1>
  </Col>
)

export default class AccountBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checking: 0,
      savings: 0
    }
  }
  componentDidMount () {
    this.props.appState$
      .distinctUntilKeyChanged('accounts')  // only care about the "accounts" changes in the store
      .pluck('accounts')
      .subscribe(({ checking, savings }) => {
        this.setState({ checking, savings })
      })
  }
  render () {
    return (
      <Panel header='Account Balance'>
        <Balance name='Checking Account' balance={ this.state.checking } />
        <Balance name='Saving Account' balance={ this.state.savings } />
      </Panel>
    )
  }
}
