import React from 'react'

import { MarginDiv } from 'components/StyledHome'
import Countdown from 'components/Countdown'
import Button from 'components/Button'

import SidePanelSeparator from './components/SidePanelSeparator'
import TotalAmount from './components/TotalAmount'
import SidePanel from './components/SidePanel'
import SideText from './components/SideText'

import { TransactionsContext } from './index'

export default class Challenge extends React.Component {
  state = {
    data: '',
  }
  handleChangeData = e => this.setState({ data: e.target.value })
  render() {
    return (
      <TransactionsContext.Consumer>
        {({
          needToApproveRegistry,
          closeTxPanel,
          handleApprove,
          onSendTx,
          selectedOne,
          parameters,
          opened,
          tcr,
        }) => (
          <SidePanel
            title="Desafiar uma notícia aceita"
            opened={opened === 'challenge'}
            onClose={closeTxPanel}
          >
            {needToApproveRegistry && <div>You need to approve the registry</div>}
            <SidePanelSeparator />

            <SideText size="xlarge" text={selectedOne && selectedOne.listingID} />
            <SideText text={selectedOne && selectedOne.data} />

            <MarginDiv>
              <Countdown
                end={selectedOne && selectedOne.appExpiry ? selectedOne.appExpiry.date : false}
              />
            </MarginDiv>

            <SidePanelSeparator />

            <TotalAmount
              copy={'Total de tokens'}
              deposit={selectedOne ? parseInt(selectedOne.unstakedDeposit) : parameters.minDeposit}
              tokenSymbol={tcr.tokenSymbol}
            />

            <SidePanelSeparator />

            <MarginDiv>
              {needToApproveRegistry ? (
                <Button onClick={() => onSendTx('approveRegistry', this.state)} mode="strong">
                  {'Aprovar tokens para o Registro'}
                </Button>
              ) : (
                <Button
                  methodName="challenge"
                  onClick={() => onSendTx('challenge', this.state)}
                  mode="strong"
                  wide
                >
                  {'DESAFIAR'}
                </Button>
              )}
            </MarginDiv>
          </SidePanel>
        )}
      </TransactionsContext.Consumer>
    )
  }
}
