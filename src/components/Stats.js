import React from 'react'
import styled from 'styled-components'

const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4.5em;
  background-color: white;
  font-family: 'Avenir Next';
  padding: 1em 4em;
`
const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2em;
`
const Stat = styled.div`
  font-size: 1.1em;
  font-weight: 600;
`
const StatLabel = styled.div`
  font-size: 0.75em;
  font-weight: 500;
`

export default ({ stats, balances, tcr }) => (
  <StatsWrapper>
    <StatContainer>
      <Stat>{stats.sizes.applications}</Stat>
      <StatLabel>TOTAL DE CANDIDATOS</StatLabel>
    </StatContainer>
    <StatContainer>
      <Stat>{balances.totalStake}</Stat>
      <StatLabel>{`${tcr.tokenSymbol} TOKENS COMPROMETIDOS`}</StatLabel>
    </StatContainer>
    <StatContainer>
      <Stat>{stats.sizes.whitelist}</Stat>
      <StatLabel>NOTÍCIAS FALSAS ACEITAS</StatLabel>
    </StatContainer>
  </StatsWrapper>
)
