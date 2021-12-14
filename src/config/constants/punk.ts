import { Nft } from './types'

export const NftFarm = '0xC93fDC11d90412FFAC40047B000c52eaA16a9D9a'
export const NFT = '0xA86dbBBE83EBFd82e6a0e0f288FD0BbE0dfb9Ea2'
export const AMOUNT_TO_CLAIM = '10'

const Nfts: Nft[] = [
  {
    name: 'Pink Spider',
    metadata: 'tier-NFT-base-dark-chocolate.json',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    previewImage: 'pink-spider-min.png',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmZRVNLGYbjh2DaPuqcaQi51wXSjaxzGjAg24WviM5N8Tj',
    fileType: 'png',
    blurImage: '',
    sortOrder: 0,
    nftId: 1,
    tokenAmount: 10,
    tokenSupply: 2222,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Base',
  },
  {
    name: 'Pink Fox',
    metadata: 'tier-NFT-base-main-nopaint.json',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget vehicula massa. Donec fringilla a nibh sed euismod. Nam vitae erat vitae nisl pulvinar lacinia. Ut vitae ultrices diam.',
    previewImage: 'pink-fox-min.png',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmeDaRUcV3bp5oa6juNYYrV9G7o2zcKFcrRBJmPJxe6BQL',
    fileType: 'png',
    blurImage: '',
    sortOrder: 1,
    nftId: 2,
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
    nftId: 3,
    tokenAmount: 10,
    tokenSupply: 2222,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Rare',
  },
]

export default Nfts
