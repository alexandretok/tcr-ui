import React from 'react'

import { MarginDiv } from 'components/StyledHome'

import { SideText } from './components'
import SidePanelSeparator from './components/SidePanelSeparator'
import SidePanel from './components/SidePanel'

export default ({ opened, closeTxPanel, tcr, handleInputChange }) => (
  <div>
    <SidePanel title="Iniciar uma candidatura" opened={opened} onClose={closeTxPanel}>
      <SidePanelSeparator />

      <MarginDiv>
        <SideText
          color="red"
          text={`Você precisa ter ${tcr.tokenName} para participar desse TCR`}
        />
      </MarginDiv>

      <SidePanelSeparator />
    </SidePanel>
  </div>
)
