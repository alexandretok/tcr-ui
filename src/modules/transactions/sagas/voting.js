import { select, call } from 'redux-saga/effects'

import { selectTCR, selectAccount, selectVoting } from 'modules/home/selectors'

import { convertedToBaseUnit } from 'libs/units'
import { getVoteSaltHash } from 'libs/values'

import { sendTransactionSaga } from './index'

export default function* voteSaga() {
  yield 'voteSaga'
}

export function* requestVotingRightsSaga(action) {
  try {
    const voting = yield select(selectVoting)
    const tcr = yield select(selectTCR)
    const tokens = yield call(
      convertedToBaseUnit,
      action.payload.args[0],
      tcr.get('tokenDecimals')
    )
    const args = [tokens]
    yield call(sendTransactionSaga, voting, 'requestVotingRights', args)
  } catch (error) {
    console.log('request voting rights error:', error)
  }
}

export function* commitVoteSaga(action) {
  try {
    const account = yield select(selectAccount)
    const voting = yield select(selectVoting)
    const tcr = yield select(selectTCR)

    const { args } = action.payload
    const pollID = args[0]
    const voteOption = args[1]
    const numTokens = yield call(convertedToBaseUnit, args[2], tcr.get('tokenDecimals'))
    const salt = args[3]

    // format args
    const secretHash = yield call(getVoteSaltHash, voteOption, salt.toString(10))
    const prevPollID = yield call(
      voting.getInsertPointForNumTokens,
      account,
      numTokens,
      pollID
    )
    const finalArgs = [pollID, secretHash, numTokens, prevPollID['0'].toString(10)]

    yield call(sendTransactionSaga, voting, 'commitVote', finalArgs)
  } catch (error) {
    console.log('commit vote saga error', error)
  }
}

export function* revealVoteSaga(action) {
  try {
    const voting = yield select(selectVoting)
    const { args, methodName } = action.payload
    console.log('reveal args', args)
    yield call(sendTransactionSaga, voting, methodName, args)
  } catch (error) {
    console.log('reveal vote saga error', error)
  }
}
