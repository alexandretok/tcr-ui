import React from 'react'

import { colors } from 'global-styles'

import { MarginDiv } from 'components/StyledHome'
import Button from 'components/Button'
import Text from 'components/Text'

import SidePanelSeparator from './components/SidePanelSeparator'
import SideTextInput from './components/SideTextInput'
import TotalAmount from './components/TotalAmount'
import SidePanel from './components/SidePanel'
import SideText from './components/SideText'

import { TransactionsContext } from './index'

export default class Apply extends React.Component {
  state = {
    listingID: '',
    data: '',
    numTokens: '',
  }
  handleChangeListingID = e => this.setState({ listingID: e.target.value })
  handleChangeData = e => this.setState({ data: e.target.value, listingID: e.target.value })
  handleChangeNumTokens = e => this.setState({ numTokens: e.target.value })
  render() {
    return (
      <TransactionsContext.Consumer>
        {({
          closeTxPanel,
          needToApproveRegistry,
          visibleApprove,
          showApprove,
          parameters,
          balances,
          opened,
          onSendTx,
          tcr,
        }) => (
          <SidePanel
            title="Iniciar uma candidatura"
            opened={opened === 'apply'}
            onClose={closeTxPanel}
          >
            <SidePanelSeparator />

            {needToApproveRegistry ? (
              <div>Você precisa permitir que o sistema utilize seus tokens</div>
            ) : (
              <div>
                <SideTextInput
                  title="URL da notícia falsa"
                  type="text"
                  handleInputChange={this.handleChangeData}
                  value={this.state.data}
                />

                <TotalAmount
                  copy={'Tokens a depositar'}
                  deposit={balances.registryAllowance}
                  tokenSymbol={tcr.tokenSymbol}
                />
              </div>
            )}

            <SidePanelSeparator />

            <MarginDiv>
              {needToApproveRegistry ? (
                <div>
                  <SideTextInput
                    title="Quantidade de tokens"
                    type="number"
                    handleInputChange={this.handleChangeNumTokens}
                    value={this.state.numTokens}
                  />
                  <Button
                    methodName="approve"
                    onClick={() => onSendTx('approveRegistry', this.state)}
                    mode="strong"
                  >
                    {'Permitir'}
                  </Button>
                </div>
              ) : (
                <Button
                  methodName="apply"
                  bgColor={colors.brightBlue}
                  wide
                  color={'white'}
                  onClick={() => onSendTx('apply', this.state)}
                >
                  {'Enviar candidatura'}
                </Button>
              )}
            </MarginDiv>

            <MarginDiv>
              {
                <div>
                  {needToApproveRegistry && (
                    <Text
                      size="xlarge"
                      color="red"
                      children={`Você precisa permitir que o contrato do sistema utilize seus tokens antes de enviar uma candidatura. O valor atualmente permitido é de ${
                        balances.registryAllowance
                      }. O depósito mínimo para uma candidatura é de ${parameters.minDeposit} ${
                        tcr.tokenSymbol
                      }`}
                    />
                  )}
                </div>
              }
            </MarginDiv>
          </SidePanel>
        )}
      </TransactionsContext.Consumer>
    )
  }
}
