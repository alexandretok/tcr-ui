import React, { Component } from 'react'

import { MarginDiv } from 'components/StyledHome'
import { fromTokenBase } from 'libs/units'
import Button from 'components/Button'

import { SideSplit, SideText } from 'containers/Transactions/components'
import SidePanelSeparator from './components/SidePanelSeparator'
import SidePanel from './components/SidePanel'
import { TransactionsContext } from './index'

export default class UpdateStatus extends Component {
  state = {
    didCommit: false,
    didReveal: false,
    numTokens: '',
    votesFor: '',
    votesAgainst: '',
  }

  render() {
    return (
      <TransactionsContext.Consumer>
        {({ selectedOne, closeTxPanel, onSendTx, opened, tcr }) => (
          <SidePanel
            title="Atualizar o status de um registro"
            opened={opened === 'updateStatus'}
            onClose={closeTxPanel}
          >
            {selectedOne && (
              <div>
                <SideSplit
                  leftTitle={'Votos a Favor'}
                  leftItem={fromTokenBase(selectedOne.votesFor, tcr.tokenDecimals)}
                  rightTitle={'Votos Contra'}
                  rightItem={fromTokenBase(selectedOne.votesAgainst, tcr.tokenDecimals)}
                />
                <SideSplit
                  leftTitle={'Quantidade de Tokens que você votou'}
                  leftItem={selectedOne && fromTokenBase(selectedOne.userVotes, tcr.tokenDecimals)}
                  rightTitle={'Total de Votos'}
                  rightItem={
                    selectedOne && fromTokenBase(selectedOne.totalVotes, tcr.tokenDecimals)
                  }
                />
                <SideText text={selectedOne && selectedOne.listingID} />
              </div>
            )}

            <SidePanelSeparator />

            <MarginDiv>
              {selectedOne && (
                <Button
                  onClick={e => onSendTx('updateStatus', {})}
                  mode="strong"
                  wide
                  methodName="updateStatus"
                >
                  {'ATUALIZAR STATUS'}
                </Button>
              )}
            </MarginDiv>
          </SidePanel>
        )}
      </TransactionsContext.Consumer>
    )
  }
}
