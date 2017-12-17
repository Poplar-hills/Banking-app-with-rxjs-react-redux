import React, { Component } from 'react'
import { Panel, FormGroup, InputGroup, FormControl, Col, Button, ButtonToolbar, Radio } from 'react-bootstrap'
import { setAccount, setAmount, transact } from '../actions'

export default class AccountActions extends Component {
  render () {
    const { dispatch } = this.props
    return (
      <Panel header='Account Actions'>
        <FormGroup className='action-form'>
          <Col xs={ 3 }>
            <Radio
              name='account'
              inline={ true }
              onChange={ () => dispatch(setAccount('checking')) }>
              Checking
            </Radio>
            <Radio
              name='account'
              inline={ true }
              onChange={ () => dispatch(setAccount('savings')) }>
              Savings
            </Radio>
          </Col>
          <Col xs={ 4 }>
            <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
              <FormControl
                type='number'
                onChange={ e => dispatch(setAmount(e.target.value)) }
              />
            </InputGroup>
          </Col>
          <Col xs={ 4 }>
            <ButtonToolbar>
              <Button
                bsStyle='primary'
                onClick={ () => dispatch(transact('WITHDRAW')) }>
                Withdraw
              </Button>
              <Button
                bsStyle='primary'
                onClick={ () => dispatch(transact('DEPOSIT')) }>
                Deposit
              </Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Panel>
    )
  }
}
