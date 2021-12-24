import { MenuEntry } from '@pancakeswap-libs/uikit'
import CHAIN_IDS from 'config/constants/chainIds'

interface CustomMenuENtry extends MenuEntry {
  supportedChain?: number[]
}
const config: CustomMenuENtry[] = [
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET,CHAIN_IDS.FTM_MAINNET,CHAIN_IDS.FTM_TESTNET],
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET],

    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Trade $VLAD',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
      },
      {
        label: 'Trade $LIFE',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
      },
      {
        label: 'Buy $ALIFE',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x42bA7BbDDEcb471c1e1Fe08636918952b6C19019',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/pool',
      },
    ],
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET],

    label: 'Farm Alife',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET],

    label: 'Mint NFTs (Genesis)',
    icon: 'NftIcon',
    href: '/nft',
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET],

    label: 'Mint NFTs (Shibari)',
    icon: 'NftIcon',
    href: '/shibari-nft',
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET, CHAIN_IDS.FTM_TESTNET, CHAIN_IDS.FTM_MAINNET],

    label: 'Gift NFTs',
    icon: 'NftIcon',
    href: '/gift-nft',
  },

  // {
  //   label: 'NFT by Artist',
  //   icon: 'NftIcon',
  //   href: '/nft-artist',
  // },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET],

    label: 'My NFT Collection',
    icon: 'NftIcon',
    href: '/my-collection',
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET],

    label: 'Past Farms',
    icon: 'PoolIcon',
    href: 'https://life.vlad.finance',
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET,CHAIN_IDS.FTM_MAINNET,CHAIN_IDS.FTM_TESTNET],

    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Voting',
      //   href: 'https://voting.pancakeswap.finance',
      // },
      {
        label: 'Github',
        href: 'https://github.com/vladprotocol',
      },
      {
        label: 'Token Facts',
        href: 'https://vlad.finance/token-facts',
      },
      {
        label: 'Announcements',
        href: 'https://twitter.com/VladFinance',
      },
      {
        label: 'What is Vlad.Finance',
        href: 'https://vlad-finance.medium.com/introducing-vlad-token-and-the-path-to-immortality-ce96990fdf66/',
      },
      // {
      //   label: 'Roadmap',
      //   href: 'https://vlad-finance.medium.com/roadmap/',
      // },
    ],
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET,CHAIN_IDS.FTM_MAINNET,CHAIN_IDS.FTM_TESTNET],

    label: 'Gordian Audit Passed',
    icon: 'NftIcon',
    href: 'https://gordian.agency',
  },
  {
    supportedChain: [CHAIN_IDS.BNB_MAINNET, CHAIN_IDS.BNB_TESTNET,CHAIN_IDS.FTM_MAINNET,CHAIN_IDS.FTM_TESTNET],

    label: 'SOLIDITY Audit Coming Soon',
    icon: 'NftIcon',
    href: '#',
  },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
]

export default config
