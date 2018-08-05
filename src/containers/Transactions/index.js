import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectBalances, selectTCR, selectParameters } from 'modules/home/selectors'
import { selectMiningStatus, selectLatestTxn } from 'modules/transactions/selectors'
import { selectSidePanelListing, selectSidePanelMethod } from 'modules/listings/selectors'
import * as actions from 'modules/transactions/actions'

import { BN, baseToConvertedUnit } from 'libs/units'

import toJS from 'components/toJS'
import Apply from 'containers/Transactions/Apply'
import Transfer from 'containers/Transactions/Transfer'
// import NoBalance from 'containers/Transactions/NoBalance'
import Challenge from 'containers/Transactions/Challenge'
import CommitVote from 'containers/Transactions/CommitVote'
import RevealVote from 'containers/Transactions/RevealVote'
import UpdateStatus from 'containers/Transactions/UpdateStatus'
import ClaimReward from 'containers/Transactions/ClaimReward'

export const TransactionsContext = React.createContext()

class TransactionsProvider extends Component {
  state = {
    fileInput: false,
    visibleApprove: true,
  }
  closeSidePanel = () => {
    this.props.onOpenSidePanel({}, '')
  }
  showApprove = () => {
    this.setState({ visibleApprove: true })
  }
  handleFileInput = e => {
    const file = e.target.files[0]
    const fr = new window.FileReader()

    fr.onload = () => {
      const contents = fr.result
      const json = JSON.parse(contents)

      try {
        this.setState({
          fileInput: json,
        })
      } catch (error) {
        throw new Error('Invalid Commit JSON file')
      }
    }
    fr.readAsText(file)
  }

  handleSendTx = (methodName, txInput) => {
    this.props.onSendTransaction({ methodName, txInput })
  }

  render() {
    const {
      tcr,
      children,
      balances,
      parameters,
      sidePanelListing,
      sidePanelMethod,
    } = this.props

    const needToApproveRegistry = BN(balances.registryAllowance).lt(
      BN(baseToConvertedUnit(parameters.minDeposit, tcr.tokenDecimals))
    )
    const needToApproveVoting = balances.votingAllowance === '0.0'

    return (
      <TransactionsContext.Provider
        value={{
          visibleApprove: this.state.visibleApprove,
          handleFileInput: this.handleFileInput,
          closeSidePanel: this.closeSidePanel,
          showApprove: this.showApprove,
          selectedOne: sidePanelListing,
          onSendTx: this.handleSendTx,
          opened: sidePanelMethod,
          needToApproveRegistry,
          needToApproveVoting,
          parameters,
          balances,
          tcr,
        }}
      >
        {/* {children} */}

        <Transfer />
        <Apply />
        <Challenge />

        {sidePanelMethod === 'updateStatus' && <UpdateStatus />}
        {sidePanelMethod === 'commitVote' && <CommitVote />}
        {sidePanelMethod === 'revealVote' && (
          <RevealVote selectedOne={sidePanelListing} />
        )}
        {sidePanelMethod === 'claimReward' && <ClaimReward />}
      </TransactionsContext.Provider>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  tcr: selectTCR,
  balances: selectBalances,
  parameters: selectParameters,
  latestTxn: selectLatestTxn,
  miningStatus: selectMiningStatus,
  sidePanelMethod: selectSidePanelMethod,
  sidePanelListing: selectSidePanelListing,
})

const withConnect = connect(
  mapStateToProps,
  {
    onSendTransaction: actions.sendTransactionStart,
    onOpenSidePanel: actions.openSidePanel,
  }
)
export default compose(withConnect)(toJS(TransactionsProvider))
