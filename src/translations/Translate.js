import React from 'react'
import Markdown from 'react-markdown'

import { translateRaw } from './index'

export default ({ translationKey }) => {
  const source = translateRaw(translationKey)
  return (
    <Markdown
      containerTagName="span"
      containerProps={{ 'data-I10n-key': translationKey }}
      escapeHtml={true}
      unwrapDisallowed={true}
      // allowedTypes={['text', 'link', 'strong', 'code']}
      allowedTypes={['code', 'link']}
      source={source}
    />
  )
}
