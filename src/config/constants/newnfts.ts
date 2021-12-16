import { Nft } from './types'

export const NftFarm = '0x556087eFC63E690c1963C26402Fe8EBaA66D11Db'
export const NFT = '0xa81ab2d03b9e3a62bdbb837d417a5e221f754e14'
export const NftWithToken = '0xf7c9058451fDaC12cCf5FA2ce3489381232E7989'


export const AMOUNT_TO_CLAIM = '10'

const Nfts: Nft[] = [
  {
    name: 'Pink_dragon',
    metadata: 'tier-NFT-base-dark-chocolate.json',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    previewImage: 'pink-spider-min.png',
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmZRVNLGYbjh2DaPuqcaQi51wXSjaxzGjAg24WviM5N8Tj',
    fileType: 'png',
    blurImage: '',
    sortOrder: 0,
    nftId: 5,
    tokenAmount: 10,
    tokenSupply: 2222,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Base',
  },
  {
    name: 'Pink Fox',
    metadata: 'tier-NFT-base-main-nopaint.json',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    previewImage: 'pink-fox-min.png',
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmeDaRUcV3bp5oa6juNYYrV9G7o2zcKFcrRBJmPJxe6BQL',

    fileType: 'png',
    blurImage: '',
    sortOrder: 1,
    nftId: 101,
    tokenAmount: 10,
    tokenSupply: 2222,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Base',
  },
  {
    name: 'Pink Bunny',
    metadata: 'tier-NFT-base-marble.json',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    previewImage: 'pink-bunny-min.png',
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmWh9xNZvyhzQWFp4xFEjbBBXPBuZhYnQufL2HwRBae9Gn',
    fileType: 'png',
    blurImage: '',
    sortOrder: 2,
    nftId: 102,
    tokenAmount: 10,
    tokenSupply: 2222,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Base',
  },
  {
    name: 'Pink Dragon',
    metadata: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    previewImage: 'pink-dragon-min.png',
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmUBgkzR5rSLiWH9pgDACayjAQLcCfB8Csn81PVbTdB86t',

    fileType: 'png',
    blurImage: '',
    sortOrder: 3,
    nftId: 103,
    tokenAmount: 100,
    tokenSupply: 666,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Base',
  },
  {
    name: 'Pink B&B',
    metadata: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    previewImage: 'bull-and-bear-min.png',
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmQ8MkJZzAQYNnUmzVXFmBQAZTXSjjvdvGVF3f16HP7LLW',

    fileType: 'png',
    blurImage: '',
    sortOrder: 4,
    nftId: 104,
    tokenAmount: 100,
    tokenSupply: 666,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Base',
  },
]

export default Nfts
