// ipfs multihash to retrieve ABIs
export const ipfsABIsHash = 'QmdvnGG7NCLsH5u4kxe2pcVcDGvxNtfouccRHBT64jvPGr'
export const ipfsTokensHash = 'QmRH8e8ssnj1CWVepGvAdwaADKNkEpgDU5bffTbeS6JuG9'
// hardcoded FORCED registry address
export const hardcodedRegistryAddress = '0x5a5e3f00cd4e0a5e34cd2f0093e66828a23fdd86'
export const defaultRegistryAddress = '0x5a5e3f00cd4e0a5e34cd2f0093e66828a23fdd86'

export function getIpfsABIsHash(tokenAddress) {
  if (tokenAddress === '0xd0d6d6c5fe4a677d343cc433536bb717bae167dd') {
    return 'QmRnEq62FYcEbjsCpQjx8MwGfBfo35tE6UobxHtyhExLNu'
  } else {
    return ipfsABIsHash
  }
}

export const registries = {
  ganache: [
    {
      name: 'Fake News Registry',
      tokenAddress: '0x637c4802711847c39e73c286a81409a162d93385',
      votingAddress: '0xc7404ba954d6fa72144c5d45295f84a8307d1687',
      parameterizerAddress: '0xb78e7ee2bbd98e5edc6d427826dbb8450ca692df',
      registryAddress: '0x5a5e3f00cd4e0a5e34cd2f0093e66828a23fdd86',
      tokenSymbol: 'TRU',
      tokenName: 'TrueToken',
      multihash: 'QmRtHAT4Ex5t9QzM9xxBqkBD9BfTP96zdHAAPQuwPUxxzd',
    },
  ],
}
