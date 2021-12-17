import { GiftNFT, Nft } from './types'

export const NftFarm = '0x556087eFC63E690c1963C26402Fe8EBaA66D11Db'
export const NFT = '0xa81ab2d03b9e3a62bdbb837d417a5e221f754e14'
export const AMOUNT_TO_CLAIM = '10'

const Nfts: GiftNFT[] = [
  {
    name: 'Pink Spider gift',
    previewImage: 'pink-spider-min.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmZRVNLGYbjh2DaPuqcaQi51wXSjaxzGjAg24WviM5N8Tj',
    nftId: 100,

  },
  {
    name: 'Pink Fox gift',
    previewImage: 'pink-fox-min.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmeDaRUcV3bp5oa6juNYYrV9G7o2zcKFcrRBJmPJxe6BQL',
    nftId: 101,
 
  },
  {
    name: 'Pink Bunny gift',
    previewImage: 'pink-bunny-min.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmWh9xNZvyhzQWFp4xFEjbBBXPBuZhYnQufL2HwRBae9Gn',
    nftId: 102,
  },
  {
    name: 'Pink Dragon gift',
    previewImage: 'pink-dragon-min.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmUBgkzR5rSLiWH9pgDACayjAQLcCfB8Csn81PVbTdB86t',

    nftId: 103,
  },
  {
    name: 'Pink B&B gift',
    previewImage: 'bull-and-bear-min.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmQ8MkJZzAQYNnUmzVXFmBQAZTXSjjvdvGVF3f16HP7LLW',
    nftId: 104,

  },
]

export default Nfts
