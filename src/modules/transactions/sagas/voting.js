import { put, select, call } from 'redux-saga/effects'

import { selectTCR, selectAccount, selectVoting } from 'modules/home/selectors'

import { toTokenBase } from 'libs/units'
import { getVoteSaltHash } from 'libs/values'

import { getEndDateString } from 'utils/datetime'
import { removeLocalForage, getLocalForage, saveLocalForage } from 'libs/localStorage'

import { sendTransactionSaga } from './index'
import * as actions from '../actions'

export default function* voteSaga() {
  yield 'voteSaga'
}

export function* requestVotingRightsSaga(action) {
  try {
    const voting = yield select(selectVoting)
    const tcr = yield select(selectTCR)
    const tokens = yield call(
      toTokenBase,
      action.payload.args[0],
      tcr.get('tokenDecimals')
    )
    const args = [tokens]
    yield call(sendTransactionSaga, voting, 'requestVotingRights', args)
  } catch (error) {
    console.log('request voting rights error:', error)
  }
}

export function* commitVoteSaga(pollID, voteOption, salt, numTokens, listing) {
  try {
    const account = yield select(selectAccount)
    const voting = yield select(selectVoting)

    // format args
    const secretHash = yield call(getVoteSaltHash, voteOption, salt.toString(10))
    const prevPollID = yield call(
      voting.getInsertPointForNumTokens,
      account,
      numTokens,
      pollID
    )
    const finalArgs = [pollID, secretHash, numTokens, prevPollID['0'].toString(10)]

    // record expiry dates
    const commitEnd = yield call(getEndDateString, listing.commitExpiry.timestamp)
    const revealEnd = yield call(getEndDateString, listing.revealExpiry.timestamp)

    const ticket = {
      secretHash,
      voteOption,
      numTokens,
      listingID: listing.listingID,
      account,
      pollID,
      salt,
      commitEnd,
      revealEnd,
      timestamp: Date.now(),
    }
    const json = {
      votingAddress: voting.address,
      account,
      ticket,
    }

    let key = `${pollID}-${listing.listingID}`
    const local = yield call(getLocalForage, key)

    if (!local) {
      const savedFile = yield call(saveLocalForage, key, json)
      console.log('savedFile:', savedFile)
    }

    // at this point, the user is committed to committing
    if (local && local.votingAddress === voting.address && local.account === account) {
      console.log('removeLocalForage:', key, local.ticket)
      yield call(removeLocalForage, key)
      // key = `${key}(1)` // amend ticket
      const savedFile = yield call(saveLocalForage, key, json)
      console.log('savedFile:', savedFile)
    }

    // TODO: handle errors

    yield call(sendTransactionSaga, voting, 'commitVote', finalArgs)
  } catch (error) {
    console.log('commit vote saga error', error)
    yield put(actions.sendTransactionFailed({ error }))
  }
}
