import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'VLAD-BNB LP',
    lpAddresses: {
      97: '0xb7419aC5Ff93Ac91047585A28CB37f765B1090B6',
      56: '0x3512D9a9d3F369e3258D4a75D3B471CA9F37CC86',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xa800D23CCc013d2cFF18665cCc4709d45D969841',
      56: '0x279d41f3f78fe5C1f0BA41aE963d6E545113C973',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'VLAD-BUSD LP',
    lpAddresses: {
      97: '0x8B7635d524d1eD9518F3Dc32980E13584BB175d8',
      56: '0x99ffD623a46362d61D5E0F9ABf9728A2A429acf5',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xa800D23CCc013d2cFF18665cCc4709d45D969841',
      56: '0x279d41f3f78fe5C1f0BA41aE963d6E545113C973',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'ALIFE-BNB LP',
    lpAddresses: {
      97: '0x47C72F3C4069A2cA4B9E50B07F9eA5A750b69c72',
      56: '0x5eE167b75118125e7d46add5cE61F749BB977A00',
    },
    tokenSymbol: 'ALIFE',
    tokenAddresses: {
      97: '0xaBBe32A526093159361f52500fC576c8150f9446',
      56: '0x943ABB19055FBA3d3f7bc3e46F6510720DdA548c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'ALIFE-BUSD LP',
    lpAddresses: {
      97: '0xaBBe32A526093159361f52500fC576c8150f9446',
      56: '0x45b2eF2ECe32b34D20F6C6caD49043740B05f2A5',
    },
    tokenSymbol: 'ALIFE',
    tokenAddresses: {
      97: '0x943ABB19055FBA3d3f7bc3e46F6510720DdA548c',
      56: '0x943ABB19055FBA3d3f7bc3e46F6510720DdA548c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 4,
    risk: 5,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xa75c80e7Ca70505AAB6062cF15A2cFC71b6138C0',
      56: '0x5eE167b75118125e7d46add5cE61F749BB977A00',
    },
    tokenSymbol: 'ALIFE',
    tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0x943ABB19055FBA3d3f7bc3e46F6510720DdA548c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

]

export default farms
