import contracts from './contracts'
import {FarmConfig, QuoteToken} from './types'

const farms: FarmConfig[] = [
    {
        pid: 0,
        mustHaveNft: 1,
        risk: 5,
        lpSymbol: 'ALIFE-BUSD LP',
        lpAddresses: {
            97: '0xE6cfdE6BA3dEA95898a7d021F37662c5F188986e',
            56: '0x0',
        },
        tokenSymbol: 'ALIFE',
        tokenAddresses: {
            97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
            56: '0x0',
        },
        quoteTokenSymbol: QuoteToken.BUSD,
        quoteTokenAdresses: contracts.busd,
    },
    {
        pid: 1,
        mustHaveNft: 2,
        risk: 5,
        lpSymbol: 'ALIFE-BNB LP',
        lpAddresses: {
            97: '0xddBfb33796A705D8C0CB33973937a18a4858cCd2',
            56: '0x0',
        },
        tokenSymbol: 'ALIFE',
        tokenAddresses: {
            97: '0xFecBE190631196e73A879b317D8A51CC4fE6cB0B',
            56: '0x0',
        },
        quoteTokenSymbol: QuoteToken.BNB,
        quoteTokenAdresses: contracts.wbnb,
    },
    {
        pid: 2,
        mustHaveNft: 3,
        risk: 3,
        lpSymbol: 'VLAD-BNB LP',
        lpAddresses: {
            97: '0xb7419aC5Ff93Ac91047585A28CB37f765B1090B6',
            56: '0x0',
        },
        tokenSymbol: 'VLAD',
        tokenAddresses: {
            97: '0xa800D23CCc013d2cFF18665cCc4709d45D969841',
            56: '0x0',
        },
        quoteTokenSymbol: QuoteToken.BNB,
        quoteTokenAdresses: contracts.wbnb,
    },
    {
        pid: 3,
        mustHaveNft: 0,
        risk: 3,
        lpSymbol: 'VLAD-BUSD LP',
        lpAddresses: {
            97: '0x8B7635d524d1eD9518F3Dc32980E13584BB175d8',
            56: '0x0',
        },
        tokenSymbol: 'VLAD',
        tokenAddresses: {
            97: '0xa800D23CCc013d2cFF18665cCc4709d45D969841',
            56: '0x0',
        },
        quoteTokenSymbol: QuoteToken.BUSD,
        quoteTokenAdresses: contracts.busd,
    },
    {
        pid: 4,
        mustHaveNft: 0,
        risk: 5,
        lpSymbol: 'BUSD-BNB LP',
        lpAddresses: {
            97: '0xa75c80e7Ca70505AAB6062cF15A2cFC71b6138C0',
            56: '0x0',
        },
        tokenSymbol: 'ALIFE',
        tokenAddresses: {
            97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
            56: '0x0',
        },
        quoteTokenSymbol: QuoteToken.BUSD,
        quoteTokenAdresses: contracts.busd,
    },

]

export default farms
