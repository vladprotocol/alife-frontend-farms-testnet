import { Nft } from './types'

export const LegendaryNftFarm = '0x6a63AF63675D3c9D498DF43Aa163F9243E7b4646'
export const NFT = '0x3F7C7C24fFA2ceFfaACE11B39D5b8a575A4B0674'
export const AMOUNT_TO_CLAIM = '10'

const Nfts: Nft[] = [
  {
    name: 'Golden Pepes',
    metadata: '',
    description:
      'For a brief period in time Pepe Drakul led a very powerful unit known as the 7 golden Vampires. He commissioned a bust made of the purest gold to commemorate his time with them.',
    previewImage: 'preview-golden-pepes.jpg',
    originalImage:
      'https://ipfs.io/ipfs/Qmdv1t4kUa8YSP8rpZTXLKvpycnijWJdCSpjsN8sjArGx8?filename=NFT-legendary-pepes-gold.mp4',
    fileType: 'mp4',
    blurImage: '',
    sortOrder: 3,
    nftId: 3,
    tokenAmount: 1200,
    tokenSupply: 6,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
  },
  {
    name: 'Immortality',
    metadata: '',
    description:
      'Those who have ever held the Chalice of LIFE are granted Immortality. Do not fear eternal sleep/slumber, for it will not come for you.',
    previewImage: 'preview-immortality.jpg',
    originalImage:
      'https://ipfs.io/ipfs/QmaHeTsV6AnhqWDAeBUvwmQbo7RC6bM1jQzVQUCQSLg9Bp?filename=NFT-legendary-immortality.png',
    fileType: 'png',
    blurImage: '',
    sortOrder: 4,
    nftId: 4,
    tokenAmount: 1200,
    tokenSupply: 6,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
  },
  {
    name: 'The VladFather',
    metadata: '',
    description:
      'His sceptre slammed into the marble floor with a crack, prompting the artist to begin. How many final breaths has that hand taken from his enemies? His eyes, wildly electric and filled with menace, and a stance that dares you to make your move. I don’t envy the one tasked with creating this portrait. Pepe Drakul has only ever posed for one drawing and this is it.',
    previewImage: 'preview-the-vladfather.jpg',
    originalImage:
      'https://ipfs.io/ipfs/QmVEdevPc1nFLJrFQK4GsJtcS5486uaQE73mo7aKjw13ph?filename=NFT-legendary-vlad-father.png',
    fileType: 'png',
    blurImage: '',
    sortOrder: 5,
    nftId: 5,
    tokenAmount: 1200,
    tokenSupply: 6,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
  },
]

export default Nfts
