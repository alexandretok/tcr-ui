// ipfs multihash to retrieve ABIs
export const ipfsABIsHash = 'QmdvnGG7NCLsH5u4kxe2pcVcDGvxNtfouccRHBT64jvPGr'
export const ipfsTokensHash = 'QmRH8e8ssnj1CWVepGvAdwaADKNkEpgDU5bffTbeS6JuG9'
// hardcoded FORCED registry address
export const hardcodedRegistryAddress = '0x7c33a05d45c3bbc48765add4e2233cef73dd2a9e'
export const defaultRegistryAddress = '0x7c33a05d45c3bbc48765add4e2233cef73dd2a9e'

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
      tokenAddress: '0x2b7b6b36030c275fd01834afeb12bb35ec8bf68d',
      votingAddress: '0x909ab7c423ae3803bbf0ef5d014f58a70e92e182',
      parameterizerAddress: '0x41818e0476a4ecb99a2087e77fc714ee9565d6b7',
      registryAddress: '0x7c33a05d45c3bbc48765add4e2233cef73dd2a9e',
      tokenSymbol: 'TRU',
      tokenName: 'TrueToken',
      multihash: 'QmeadmrVMZsSt4UZt3LzTWAdjf8RS2JE4i21eaVeCwZjGJ',
    },
  ],
}
