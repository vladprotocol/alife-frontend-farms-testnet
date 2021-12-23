import { GiftNFT, Nft } from './types'

export const NftFarm = '0x556087eFC63E690c1963C26402Fe8EBaA66D11Db'
export const NFT = '0xa81ab2d03b9e3a62bdbb837d417a5e221f754e14'
export const AMOUNT_TO_CLAIM = '10'

const Nfts: GiftNFT[] = [
  {
    name: 'Christmas Bear',
    previewImage: 'bear-nft.png',
    description: "Hoping this will be the only bear that visits you this Christmas. Don't wreck the halls. Merry Christmas!",
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmXwMmZbShdue93zfba4X8PcWkkbrW8e4Yg89kbm7p8Ghz/Bear-NFT.png',
    nftId: 100,

  },
  {
    name: 'Christmas Nutcracker',
    previewImage: 'nutcracker-nft.png',
    description: 'Nothing stops a HACKER like your very own NUTCRACKER Happy Holidays!',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmXwMmZbShdue93zfba4X8PcWkkbrW8e4Yg89kbm7p8Ghz/NutCracker-NFT.png',
    nftId: 101,
 
  },

  {
    name: 'Christmas Santa',
    previewImage: 'santa-nft.png',
    description: "HO HO HODL all the way - If you've been nice Santa has a moon bag just for you! Happy holidays!",
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmXwMmZbShdue93zfba4X8PcWkkbrW8e4Yg89kbm7p8Ghz/Santa-NFT.png',

    nftId: 102,
  },
  {
    name: 'Christmas Snowman',
    previewImage: 'snowman-nft.png',
    description:"Frosty knows a thing or two about Diamond hands - it's really ice. Merry Christmas!",
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmXwMmZbShdue93zfba4X8PcWkkbrW8e4Yg89kbm7p8Ghz/Snowman-NFT.png',
    nftId: 103,

  },
  {
    name: 'Christmas Stocking',
    previewImage: 'stocking-nft.png',
    description:'May the stocking that hangs by the fire be filled with gains.Merry Christmas!',
    originalImage:
      'https://gateway.pinata.cloud/ipfs/QmXwMmZbShdue93zfba4X8PcWkkbrW8e4Yg89kbm7p8Ghz/Stocking-NFT.png',
    nftId: 104,

  },
  {
    name: 'Christmas Tree',
    previewImage: 'tree-nft.png',
    description:"If you've been stackin' you won't be lackin' Merry Christmas!",
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmXwMmZbShdue93zfba4X8PcWkkbrW8e4Yg89kbm7p8Ghz/Tree-NFT.png',
    nftId: 105,
  },
]

export default Nfts
