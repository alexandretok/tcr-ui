import React from 'react'

import { colors } from 'global-styles'

import { MarginDiv } from 'components/StyledHome'
import Button from 'components/Button'

import SidePanelSeparator from './components/SidePanelSeparator'
import { SideText, SideTextInput } from './components'
import SidePanel from './components/SidePanel'

import { TransactionsContext } from './index'

export default class Transfer extends React.Component {
  state = {
    transferTo: '',
    numTokens: '',
  }
  handleChangeTransferTo = e => this.setState({ transferTo: e.target.value })
  handleChangeNumTokens = e => this.setState({ numTokens: e.target.value })
  render() {
    return (
      <TransactionsContext.Consumer>
        {({ closeTxPanel, opened, onSendTx }) => (
          <SidePanel
            title="Transferir Tokens"
            opened={opened === 'transfer'}
            onClose={closeTxPanel}
          >
            <SidePanelSeparator />
            <SideText
              small
              color="grey"
              text={
                'Essa operação irá transferir tokens de sua carteira para um endereço específicado.'
              }
            />
            <SideTextInput
              title="Endereço"
              type="string"
              handleInputChange={this.handleChangeTransferTo}
              value={this.state.transferTo}
            />
            <SideTextInput
              title="Número de tokens"
              type="number"
              handleInputChange={this.handleChangeNumTokens}
              value={this.state.numTokens}
            />

            <SidePanelSeparator />

            <SidePanelSeparator />
            <MarginDiv>
              <Button
                methodName="transfer"
                bgColor={colors.brightBlue}
                onClick={e => onSendTx('transfer', this.state)}
                wide
                color={'white'}
                mode="strong"
              >
                {'Transferir Tokens'}
              </Button>
            </MarginDiv>
          </SidePanel>
        )}
      </TransactionsContext.Consumer>
    )
  }
}
