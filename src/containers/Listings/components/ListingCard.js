import React from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

import Button from 'components/Button'
import Img from 'components/Img'
import Countdown from 'components/Countdown'

import { tsToMonthDate } from 'utils/datetime'

const CardContent = styled.div`
  padding: 1em;
`
const PadDiv = styled.div`
  padding-top: 0.5em;
`
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
`

const styles = {
  card: {
    width: '100%',
    height: 'auto',
    margin: 15,
    padding: '.5em',
    overflow: 'hidden',
    borderRadius: 5,
    position: 'relative',
  },
  media: {
    height: 40,
    margin: 15,
  },
  content: {},
  buttContainer: {
    'margin-bottom': 55,
  },
  buttonContainer: {
    'margin-top': 20,
    'margin-bottom': 20,
  },
  inline: {
    display: 'inline',
  },
}

function ListingCard(props) {
  const {
    one,
    classes,
    listingType,
    updateTrigger,
    revealTrigger,
    openTxPanel,
    claimRewardTrigger,
  } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div>
            <a href={one.listingID} target="_blank">
              {one.listingID}
            </a>
          </div>
          <PadDiv className={classes.buttContainer}>
            <Typography component="p">
              Adicionado em&nbsp;
              {tsToMonthDate(
                one.whitelistBlockTimestamp
                  ? one.whitelistBlockTimestamp
                  : one.latestBlockTxn.blockTimestamp
              )}
            </Typography>
          </PadDiv>
        </CardContent>

        <ButtonContainer className={classes.buttonContainer}>
          {listingType === 'faceoffs' ? (
            <div>
              {!revealTrigger && !updateTrigger ? (
                <div className={classes.inline}>
                  <Countdown end={one.commitExpiry.date} />
                  <Button
                    methodName="commitVote"
                    onClick={e => openTxPanel(one, 'commitVote')}
                    color="primary"
                  >
                    {'Enviar Voto'}
                  </Button>
                </div>
              ) : (
                revealTrigger &&
                !updateTrigger && (
                  <div className={classes.inline}>
                    <Countdown end={one.revealExpiry.date} />
                    <Button
                      onClick={e => openTxPanel(one, 'revealVote')}
                      color="primary"
                      methodName="revealVote"
                    >
                      {'Revelar Voto'}
                    </Button>
                  </div>
                )
              )}
            </div>
          ) : listingType !== 'removed' ? (
            <div className={classes.inline}>
              <Countdown end={one.appExpiry.date} />
              <Button
                wide
                onClick={e => openTxPanel(one, 'challenge')}
                color="secondary"
                methodName="challenge"
              >
                {'Desafiar'}
              </Button>
            </div>
          ) : null}
          {claimRewardTrigger && (
            <Button
              methodName="claimReward"
              onClick={e => openTxPanel(one, 'claimReward')}
              color="primary"
            >
              {'Solicitar Recompensa'}
            </Button>
          )}
          {updateTrigger && (
            <Button
              methodName="updateStatus"
              onClick={e => openTxPanel(one, 'updateStatus')}
              color="primary"
              wide
            >
              {'Atualizar'}
            </Button>
          )}
        </ButtonContainer>
      </Card>
    </div>
  )
}

export default withStyles(styles)(ListingCard)
