import React, { Component } from 'react'

import { MarginDiv, FileInput } from 'components/StyledHome'
import Button from 'components/Button'

import SidePanel from './components/SidePanel'
import { TransactionsContext } from './index'

class ClaimReward extends Component {
  render() {
    return (
      <TransactionsContext.Consumer>
        {({ opened, selectedOne, closeTxPanel, onSendTx }) => (
          <SidePanel
            title="Solicitar Recompensa"
            opened={opened === 'claimReward'}
            onClose={closeTxPanel}
          >
            <MarginDiv>
              <Button
                onClick={() => onSendTx('claimReward', { pollID: selectedOne.challengeID })}
                mode="strong"
                wide
              >
                {'Solicitar Recompensa'}
              </Button>
            </MarginDiv>
          </SidePanel>
        )}
      </TransactionsContext.Consumer>
    )
  }
}

export default ClaimReward
