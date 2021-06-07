import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    mustHaveNft: 1,
    risk: 5,
    lpSymbol: 'VLAD-BUSD LP',
    lpAddresses: {
      97: '0xE6cfdE6BA3dEA95898a7d021F37662c5F188986e',
      56: '0x60D5e86c0074b56E52a7540b3bf36c399E9f3038',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
      56: '0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    mustHaveNft: 2,
    risk: 5,
    lpSymbol: 'VLAD-BUSD LP',
    lpAddresses: {
      97: '0xE6cfdE6BA3dEA95898a7d021F37662c5F188986e',
      56: '0x60D5e86c0074b56E52a7540b3bf36c399E9f3038',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
      56: '0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    mustHaveNft: 3,
    risk: 5,
    lpSymbol: 'VLAD-BUSD LP',
    lpAddresses: {
      97: '0xE6cfdE6BA3dEA95898a7d021F37662c5F188986e',
      56: '0x60D5e86c0074b56E52a7540b3bf36c399E9f3038',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
      56: '0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    mustHaveNft: 1,
    risk: 5,
    lpSymbol: 'VLAD-ALIFE LP',
    lpAddresses: {
      97: '0xddBfb33796A705D8C0CB33973937a18a4858cCd2',
      56: '0xEd069710F0BEaf15243043840Ec6267ac047b525',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
      56: '0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
    },
    quoteTokenSymbol: QuoteToken.ALIFE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 4,
    mustHaveNft: 2,
    risk: 5,
    lpSymbol: 'VLAD-ALIFE LP',
    lpAddresses: {
      97: '0xddBfb33796A705D8C0CB33973937a18a4858cCd2',
      56: '0xEd069710F0BEaf15243043840Ec6267ac047b525',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
      56: '0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
    },
    quoteTokenSymbol: QuoteToken.ALIFE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 5,
    mustHaveNft: 3,
    risk: 5,
    lpSymbol: 'VLAD-ALIFE LP',
    lpAddresses: {
      97: '0xddBfb33796A705D8C0CB33973937a18a4858cCd2',
      56: '0xEd069710F0BEaf15243043840Ec6267ac047b525',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
      56: '0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
    },
    quoteTokenSymbol: QuoteToken.ALIFE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 6,
    mustHaveNft: 1,
    risk: 3,
    lpSymbol: 'Life',
    lpAddresses: {
      97: '0xb7419aC5Ff93Ac91047585A28CB37f765B1090B6',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    tokenSymbol: 'LIFE',
    tokenAddresses: {
      97: '0xa800D23CCc013d2cFF18665cCc4709d45D969841',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    quoteTokenSymbol: QuoteToken.LIFE,
    quoteTokenAdresses: contracts.life,
    isTokenOnly: true,
  },
  {
    pid: 7,
    mustHaveNft: 2,
    risk: 3,
    lpSymbol: 'Life',
    lpAddresses: {
      97: '0x8B7635d524d1eD9518F3Dc32980E13584BB175d8',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    tokenSymbol: 'LIFE',
    tokenAddresses: {
      97: '0xa800D23CCc013d2cFF18665cCc4709d45D969841',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    quoteTokenSymbol: QuoteToken.LIFE,
    quoteTokenAdresses: contracts.life,
    isTokenOnly: true,
  },
  {
    pid: 8,
    mustHaveNft: 3,
    risk: 5,
    lpSymbol: 'Life',
    lpAddresses: {
      97: '0xa75c80e7Ca70505AAB6062cF15A2cFC71b6138C0',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    tokenSymbol: 'LIFE',
    tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    quoteTokenSymbol: QuoteToken.LIFE,
    quoteTokenAdresses: contracts.life,
    isTokenOnly: true,
  },
  {
    pid: 9,
    mustHaveNft: 0,
    risk: 5,
    lpSymbol: 'BUSD-ALIFE LP',
    lpAddresses: {
      97: '0xa75c80e7Ca70505AAB6062cF15A2cFC71b6138C0',
      56: '0xc140a87031617d4fcb7d51e428cd6876664e8348',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
      56: '0x42bA7BbDDEcb471c1e1Fe08636918952b6C19019',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
