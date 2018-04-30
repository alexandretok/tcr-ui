import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Card from 'material-ui/Card'

import Button from 'views/components/Button'
import Img from 'views/components/Img'
import Countdown from 'views/components/Countdown'

import imgSrc from 'views/assets/icons/eth.png'
import styled from 'styled-components'

const CardContent = styled.div`
  padding: 1em;
`
const PadDiv = styled.div`
  padding-top: 1em;
`

const styles = {
  card: {
    width: 160,
    margin: 10,
    padding: '.1em',
  },
  media: {
    height: 50,
    margin: 4,
  },
}

function ListingCard(props) {
  const {
    one,
    classes,
    tokenData,
    listingType,
    updateTrigger,
    revealTrigger,
    openSidePanel,
  } = props

  return (
    <div>
      <Card className={classes.card}>
        <Img
          src={tokenData && tokenData.get('imgSrc') ? tokenData.get('imgSrc') : imgSrc}
          alt=""
        />

        <CardContent>
          <Typography variant="title" component="h3">
            {tokenData && tokenData.get('name')
              ? tokenData.get('name')
              : one.get('listingID') && one.get('listingID')}
          </Typography>

          <PadDiv>
            <Typography component="p">
              <a
                target="_blank"
                href={`https://gateway.ipfs.io/ipfs/${one.get('data')}`}
              >{`More info`}</a>
            </Typography>
            <Typography component="p">
              {`Block: ${one.get('blockNumber').toString()}`}
            </Typography>
          </PadDiv>
        </CardContent>

        <div>
          {listingType === 'faceoffs' ? (
            <div>
              {!revealTrigger && !updateTrigger ? (
                <div>
                  <Button onClick={e => openSidePanel(one, 'commitVote')} color="primary">
                    {'Commit Vote'}
                  </Button>
                  <Countdown end={one.getIn(['commitExpiry', 'date'])} />
                </div>
              ) : (
                revealTrigger &&
                !updateTrigger && (
                  <div>
                    <Button
                      onClick={e => openSidePanel(one, 'revealVote')}
                      color="primary"
                    >
                      {'Reveal Vote'}
                    </Button>
                    <Countdown end={one.getIn(['revealExpiry', 'date'])} />
                  </div>
                )
              )}
            </div>
          ) : (
            <div>
              <Button onClick={e => openSidePanel(one, 'challenge')} color="secondary">
                {'Challenge'}
              </Button>
              <Countdown end={one.getIn(['appExpiry', 'date'])} />
            </div>
          )}
          {updateTrigger && (
            <Button onClick={e => openSidePanel(one, 'commitVote')} color="primary">
              {'Update Status'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default withStyles(styles)(ListingCard)