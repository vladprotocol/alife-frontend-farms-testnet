import { Nft } from './types'

export const NftFarm = '0xE9582C3d1aaAb7b7E3061575d4B956f5d13e789F'
export const NFT = '0xa81ab2d03b9e3a62bdbb837d417a5e221f754e14'
export const AMOUNT_TO_CLAIM = '10'

const Nfts: Nft[] = [
  {
    name: 'Pink Spider',
    metadata: 'tier-NFT-base-dark-chocolate.json',
    description: 'Dipped in chocolate and ready for a bite. Part of the base tier of Vlad NFTs.',
    previewImage: 'preview-base-dark-chocolate.jpg',
    originalImage:
      'https://ipfs.io/ipfs/QmX9UuF41nfhnESX3DnVHhC4XwuYAcLEReGyN4CtE8P7Bg?filename=NFT-base-dark-chocolate.mp4',
    fileType: 'png',
    blurImage: '',
    sortOrder: 0,
    nftId: 100,
    tokenAmount: 10,
    tokenSupply: 2222,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
    rarity: 'Base',
  },
  {
    name: 'Pink Fox',
    metadata: 'tier-NFT-base-main-nopaint.json',
    description: 'The legend behind the meme in all his original glory. Part of the base tier of Vlad NFTs',
    previewImage: 'preview-base-main-nopaint.jpg',
    originalImage:
      'https://ipfs.io/ipfs/QmWckPrzbjvf8jqUpdQ7jKLzdaSBTyPSV6x6obSUHHipqc?filename=NFT-base-main-nopaint.mp4',
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
      'The count has turned into a marble statue ready for display in the halls of Vladhalla. Part of the base tier of Vlad NFTs.',
    previewImage: 'preview-base-marble.jpg',
    originalImage: 'https://ipfs.io/ipfs/QmSnz85drLjCD4qNgaMwHFC6PFEkGrmYhM1LpHwZWpEWaQ?filename=NFT-base-marble.mp4',
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
    description: 'All who seek to find the path to Vladhalla must have strong hands along the way to immortality.',
    previewImage: 'preview-path-to-vladhalla.jpg',
    originalImage:
      'https://ipfs.io/ipfs/QmQWAeV3aAWD2Kbvxmtt4H874AEf7M7N5FcBos4iZbkRcj?filename=NFT-rare-path-to-vladhalla.mp4',
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
      'As an homage to the original Vlad Pepes Drakul this retains his painted face hang him in your gallery for eternal viewing.',
    previewImage: 'preview-painted-pepes.jpg',
    originalImage:
      'https://ipfs.io/ipfs/QmRqe92vpppkNS2aihmdvswHstAiHAF4jC2KUAiec5LKKk?filename=NFT-rare-painted-pepes.mp4',
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
