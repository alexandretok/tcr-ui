// ipfs multihash to retrieve ABIs
export const ipfsABIsHash = 'QmdvnGG7NCLsH5u4kxe2pcVcDGvxNtfouccRHBT64jvPGr'
export const ipfsTokensHash = 'QmRH8e8ssnj1CWVepGvAdwaADKNkEpgDU5bffTbeS6JuG9'
// hardcoded FORCED registry address
export const hardcodedRegistryAddress = '0x67bf3dd0c9c61236c0a9c7f6f8770b6a9e632f53'
export const defaultRegistryAddress = '0x67bf3dd0c9c61236c0a9c7f6f8770b6a9e632f53'

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
      name: 'Registro de Notícias Falsas',
      tokenAddress: '0x2d679f05300bb47f4d8730d96d146a23392b9794',
      votingAddress: '0xfde1389438b91d6b3b8a34cb69135306d6a4cc98',
      parameterizerAddress: '0xc1ee1f2c799640bcca90311832d53a2e1d663e74',
      registryAddress: '0x67bf3dd0c9c61236c0a9c7f6f8770b6a9e632f53',
      tokenSymbol: 'TRU',
      tokenName: 'TrueToken',
      multihash: 'QmexuvuQxRxx43g53Y1QR22Wo1w6YgqmHc7nbRyKghzz1o',
    },
  ],
}
