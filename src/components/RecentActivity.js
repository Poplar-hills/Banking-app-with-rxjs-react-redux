import React, { Component } from 'react'
import moment from 'moment'
import { Panel, Table } from 'react-bootstrap'

export default class RecentActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: []
    }
  }
  componentDidMount () {
    this.sub = this.props.appState$
      .distinctUntilKeyChanged('transactions')  // only care about the "transactions" changes in the store
      .map(_ => _.transactions.slice(_.skip, _.skip + _.limit))  // determine the number of transcations to display
      .subscribe(transactions => this.setState({ transactions }))
  }
  componentDidUnMount () {
    this.sub.unsubscribe()
  }
  renderHeaders () {
    const headers = ['Date', 'Type', 'Account', 'Amount', 'Balance']
      .map((title, i) => <th key={ i }>{ title }</th>)
    return <tr>{ headers }</tr>
  }
  renderItems () {
    return this.state.transactions.map((t, key) => (
      <tr key={ key }>
        <td>{ moment(t.timestamp).format('MM / DD / YYYY') }</td>
        <td>{ t.amount < 0 ? 'withdraw' : 'deposit' }</td>
        <td>{ t.name }</td>
        <td>{ `$${t.amount.toFixed(2)}` }</td>
        <td>{ `$${t.balance.toFixed(2)}` }</td>
      </tr>
    ))
  }
  render() {
    return (
      <Panel header='Recent Transactions'>
        <Table hover={ true } bordered={ true }>
          <tbody>
            { this.renderHeaders() }
            { this.renderItems() }
          </tbody>
        </Table>
      </Panel>
    )
  }
}
