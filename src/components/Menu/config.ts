import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farm ALIFE',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Mint NFTs',
    icon: 'NftIcon',
    href: '/nft',
  },
  {
    label: 'My NFT Collection',
    icon: 'NftIcon',
    href: '/my-collection',
  },
  {
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
        label: 'Overview',
        href: 'https://vlad-finance.medium.com/introducing-vlad-token-and-the-path-to-immortality-ce96990fdf66/',
      },
      // {
      //   label: 'Roadmap',
      //   href: 'https://vlad-finance.medium.com/roadmap/',
      // },
    ],
  },
  {
    label: 'DefiYield Audit Coming Soon',
    icon: 'NftIcon',
    href: '#',
  },
  {
    label: 'CERTIK Audit Coming Soon',
    icon: 'NftIcon',
    href: '#',
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
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
